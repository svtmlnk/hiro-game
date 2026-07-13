import { Boot } from './scenes/Boot';
import { AUTO, Game, Scale } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { World } from './scenes/World';
import { MainMenu } from './scenes/MainMenu';
import { Room } from './scenes/Room';
import { GameOver } from './scenes/GameOver';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 640,
    height: 480,
    parent: 'game-container',
    backgroundColor: '#000000',
    url: import.meta.env.URL || '',
    version: import.meta.env.VERSION || '0.0.1',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    pixelArt: true,
    scene: [
        Boot,
        Preloader,
        MainMenu,
        World,
        Room,
        GameOver
        // MainMenu,
        // MainGame,
        // GameOver
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
