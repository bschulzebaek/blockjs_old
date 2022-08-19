import './styles/index.css';
import GameManager from './framework/GameManager';

declare global {
    interface Window {
        gameManager: GameManager;
    }
}

window.gameManager = new GameManager(document.querySelector('canvas'));