import ChunkRepository from '../world/chunk/ChunkRepository';
import GameConfigRepository from '../game-config/GameConfigRepository';
// import EntityRepository from '../entity/EntityRepository';
// import InventoryRepository from '../../items/inventory/InventoryRepository';

export default [{
    name: GameConfigRepository.STORE_NAME,
    keyPath: GameConfigRepository.STORE_IDENTIFIER,
}, {
    name: ChunkRepository.STORE_NAME,
    keyPath: ChunkRepository.STORE_IDENTIFIER,
}]

// export default [
// {
//     name: ChunkRepository.STORE_NAME,
//     keyPath: ChunkRepository.STORE_IDENTIFIER,
// }, {
//     name: EntityRepository.STORE_NAME,
//     keyPath: EntityRepository.STORE_IDENTIFIER,
// }, {
//     name: GameConfigRepository.STORE_NAME,
//     keyPath: GameConfigRepository.STORE_IDENTIFIER,
// }, {
//     name: InventoryRepository.STORE_NAME,
//     keyPath: InventoryRepository.STORE_IDENTIFIER,
// }]