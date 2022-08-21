import Repository from '../../storage/Repository';
import StorageAdapter from '../../storage/StorageAdapter';
import Chunk from './Chunk';

export default class ChunkRepository extends Repository {
    static STORE_NAME = 'chunk';
    static STORE_IDENTIFIER = 'id';

    constructor(adapter: StorageAdapter) {
        super(adapter, ChunkRepository.STORE_NAME, Chunk);
    }

    public create(position: string, blocks: number[]): Chunk {
        return super.create(position, blocks) as Chunk;
    }

    public async read(position: string): Promise<Chunk> {
        return await super.read(position);
    }

    public async readAll(): Promise<Chunk[]> {
        return await super.readAll();
    }

    public async write(chunk: Chunk) {
        await super.write(chunk);
    }

    public async writeList(objs: Chunk[]) {
        await super.writeList(objs);
    }
}