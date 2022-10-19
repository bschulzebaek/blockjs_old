import ChunkRepository from '../../../components/chunk/ChunkRepository';
import WorldConfig from '../../../components/world-config/WorldConfig';
import RawRenderObjectInterface from '../../../framework/shader/RawRenderObjectInterface';
import WorldSubContainer from './WorldSubContainer';
import ChunkModel, { ChunkModelType } from '../../../components/chunk/model/ChunkModel';
import pushToScene from '../helper/push-to-scene';
import { WorldMessages } from '../../../shared/messages/ThreadMessages';
import pushToRenderPipeline from '../helper/push-to-render-pipeline';
import Chunk from '../../../components/chunk/Chunk';

export type ChunkModelMap = Map<string, {
    glass: RawRenderObjectInterface;
    solid: RawRenderObjectInterface;
}>

export default class WorldSubService {
    static IDLE_MS = 30000;

    private readonly repository: ChunkRepository;
    private readonly config: WorldConfig;

    private queue: string[] = [];
    private deleted: string[] = [];
    private modelRegistry: ChunkModelMap = new Map();

    private idleTimeout = 0;

    constructor(chunkRepository: ChunkRepository, config: WorldConfig) {
        this.repository = chunkRepository;
        this.config = config;

        this.refreshIdleTimeout();
    }

    private refreshIdleTimeout() {
        clearTimeout(this.idleTimeout);

        this.idleTimeout = self.setTimeout(this.onIdle, WorldSubService.IDLE_MS);
    }

    private onIdle() {
        postMessage({ action: WorldMessages.SUB_TERMINATED, detail: self.name });
        self.close();
    }

    public updateChunk = (id: string) => {
        this.refreshIdleTimeout();

        this.modelRegistry.delete(id);

        const has = this.deleted.indexOf(id);

        if (has >= 0) {
            this.deleted.splice(has, 1);
        }

        if (this.queue.indexOf(id) >= 0) {
            return;
        }

        this.queue.unshift(id);
        this.createNextChunk();
    }

    public discardChunks(ids: string[]) {
        this.refreshIdleTimeout();

        ids.forEach((id) => {
            const has = this.queue.indexOf(id);

            if (has >= 0) {
                this.queue.splice(has, 1);
            }

            if (this.deleted.indexOf(id) >= 0) {
                return;
            }

            this.deleted.push(id);
        });

        this.deleted = Array.from(new Set(this.deleted));
    }

    public createChunks(ids: string[]) {
        this.refreshIdleTimeout();

        ids.forEach((id) => {
            const has = this.deleted.indexOf(id);

            if (has >= 0) {
                this.deleted.splice(has, 1);
            }

            if (this.queue.indexOf(id) >= 0) {
                return;
            }

            this.queue.push(id);
        });

        this.queue = Array.from(new Set(this.queue));

        this.createNextChunk();
    }

    public updateChunks(ids: string[]) {
        ids.forEach(this.updateChunk);
    }

    private async createNextChunk() {
        if (this.queue.length === 0) {
            return;
        }

        const next = this.queue.shift();

        if (!next) {
            return;
        }

        await this.createChunkData(next);
        this.createNextChunk();
    }

    private createChunkData = async (id: string) => {
        if (this.deleted.includes(id)) {
            return;
        }

        let chunk = await this.repository.read(id);

        if (this.deleted.includes(id)) {
            return;
        }

        if (!chunk) {
            chunk = Chunk.generate(id, this.config.getSeed());
        }

        pushToScene(chunk, WorldSubContainer.getScenePort());

        let models = this.modelRegistry.get(id);

        if (!models) {
            models = {
                solid: ChunkModel.create(chunk, ChunkModelType.SOLID).toRawRenderObject(),
                glass: ChunkModel.create(chunk, ChunkModelType.GLASS).toRawRenderObject(),
            };

            this.modelRegistry.set(id, models);
        }

        pushToRenderPipeline(id, models);

        this.refreshIdleTimeout();
    }
}