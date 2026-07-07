import { Scene } from "phaser";
import { Entity } from "./entity";

export class Enemy extends Entity {
    constructor(scene: Scene, x: number, y: number, texture: string){
        super(scene, x, y, texture);
    }

    cycleTween(){
        this.scene.tweens.add({
            targets: this,
            angle: 360,
            duration: 1000,
            ease: 'Linear',
            repeat: -1
        })
    }
}