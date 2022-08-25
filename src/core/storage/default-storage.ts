import ChunkRepository from '../../content/chunk/ChunkRepository';
import EntityRepository from '../../content/entity/EntityRepository';
import GameConfigRepository from '../../content/game-config/GameConfigRepository';
import InventoryRepository from '../../content/inventory/InventoryRepository';

export default [{
    name: ChunkRepository.STORE_NAME,
    keyPath: ChunkRepository.STORE_IDENTIFIER,
}, {
    name: EntityRepository.STORE_NAME,
    keyPath: EntityRepository.STORE_IDENTIFIER,
}, {
    name: GameConfigRepository.STORE_NAME,
    keyPath: GameConfigRepository.STORE_IDENTIFIER,
}, {
    name: InventoryRepository.STORE_NAME,
    keyPath: InventoryRepository.STORE_IDENTIFIER,
}]