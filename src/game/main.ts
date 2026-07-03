import { Boot } from './scenes/Boot';
// import { GameOver } from './scenes/GameOver';
// import { Game as MainGame } from './scenes/Game';
// import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game, Scale } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { World } from './scenes/World';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 640,
    height: 480,
    parent: 'game-container',
    backgroundColor: '#028af8',
    url: import.meta.env.URL || '',
    version: import.meta.env.VERSION || '0.0.1',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    pixelArt: true,
    scene: [
        Boot,
        Preloader,
        World
        // MainMenu,
        // MainGame,
        // GameOver
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
