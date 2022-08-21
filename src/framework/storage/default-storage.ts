import EntityRepository from '../entity/EntityRepository';
import GameConfigRepository from '../game-config/GameConfigRepository';
import ChunkRepository from '../world/chunk/ChunkRepository';

export default [{
    name: ChunkRepository.STORE_NAME,
    keyPath: ChunkRepository.STORE_IDENTIFIER,
}, {
    name: EntityRepository.STORE_NAME,
    keyPath: EntityRepository.STORE_IDENTIFIER,
}, {
    name: 'block',
    keyPath: 'position'
}, {
    name: GameConfigRepository.STORE_NAME,
    keyPath: GameConfigRepository.STORE_IDENTIFIER,
}, {
    name: 'inventory',
    keyPath: 'id'
}, {
    name: 'world'
}]