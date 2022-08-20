import ServiceInterface from '../ServiceInterface';
import ChunkRepository from './ChunkRepository';
import StorageAdapter from '../storage/StorageAdapter';
import World from './World';

export default class WorldService implements ServiceInterface {

    private chunkRepository: ChunkRepository;
    private world?: World;

    constructor(adapter: StorageAdapter) {
        this.chunkRepository = new ChunkRepository(adapter);
    }

    public async create(): Promise<void> {
        this.world = new World();
    }

    public async discard(): Promise<void> {

    }
}