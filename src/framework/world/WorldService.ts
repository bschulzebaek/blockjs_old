import Container, { ServiceName } from '../Container';
import ServiceInterface from '../ServiceInterface';
import StorageAdapter from '../storage/StorageAdapter';
import createDebugWorld from '../world-generation/debug-world';
import ChunkRepository from './chunk/ChunkRepository';
import World from './World';
import Vector3 from '../../math/Vector3';

export default class WorldService implements ServiceInterface {

    private chunkRepository: ChunkRepository;
    private world: World;
    // @ts-ignore
    private seed: string = '';

    constructor(adapter: StorageAdapter) {
        this.chunkRepository = new ChunkRepository(adapter);
        this.world = new World();
    }

    public beforePlay() {
        this.world.createShader();
        this.world.getChunks().forEach((chunk) => chunk.buildModel());

        Container.getService(ServiceName.SCENE).addEntity(this.world);
    }

    public async discard() {
        await this.chunkRepository.writeList(Array.from(this.world.getChunks()));
    }

    public async create() {
        const gameConfig = Container.getService(ServiceName.GAME_CONFIG).getConfig();

        this.seed = gameConfig.getSeed();
        this.world = new World();

        createDebugWorld(this.world);

        const DEBUG_POSITION = new Vector3(-2, 7, -2);

        Container.getService(ServiceName.ENTITY).getPlayer()?.setPosition(DEBUG_POSITION);
    }

    public async load() {
        const gameConfig = Container.getService(ServiceName.GAME_CONFIG).getConfig();

        this.seed = gameConfig.getSeed();

        const chunks = await this.chunkRepository.readAll();
        this.world = new World(chunks);
    }

    public getWorld() {
        return this.world;
    }
}