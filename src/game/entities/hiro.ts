import { Scene } from "phaser";
import { Entity } from "./entity";
import { SPRITES } from "../utils/constants";

export class Hiro extends Entity {
  textureKey: string;
  private moveSpeed: number;

  constructor(scene: Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture, SPRITES.HIRO);

    const anims = this.scene.anims;
    // speed anims
    const animsFrameRate = 4;
    // player speed
    this.moveSpeed = 8;

    // hitbox size and position
    this.setSize(30, 10);
    this.setOffset(10, 45);

    // player sprite size
    this.setScale(0.8);

    this.textureKey = texture;

    // frame animations
    anims.create({
      key: "down",
      frames: anims.generateFrameNumbers(this.textureKey, {
        frames: [0, 5, 0, 6],
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });

    anims.create({
      key: "left",
      frames: anims.generateFrameNumbers(this.textureKey, {
        frames: [1, 2],
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });

    anims.create({
      key: "right",
      frames: anims.generateFrameNumbers(this.textureKey, {
        frames: [3, 4],
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });

    anims.create({
      key: "up",
      frames: anims.generateFrameNumbers(this.textureKey, {
        frames: [7, 8, 9, 8],
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });
  }

  update(delta: number) {
    // moving controls
    const keys = this.scene.input.keyboard.createCursorKeys();

    if (keys.up.isDown) {
      this.play("up", true);
      this.setVelocity(0, -delta * this.moveSpeed);
    } else if (keys.down.isDown) {
      this.setVelocity(0, delta * this.moveSpeed);
      this.play("down", true);
    } else if (keys.left.isDown) {
      this.setVelocity(-delta * this.moveSpeed, 0);
      this.play("left", true);
    } else if (keys.right.isDown) {
      this.setVelocity(delta * this.moveSpeed, 0);
      this.play("right", true);
    } else {
      this.setVelocity(0);
      this.stop();
    }
  }
}
