import { GameObjects, Math, Scene } from "phaser";
import { Entity } from "./entity";
import { SPRITES } from "../utils/constants";

type Side = 'up' | 'down' | 'left' | 'right';

export class Hiro extends Entity {
  textureKey: string;
  private moveSpeed: number;
  zones: any[];
  private parentFunc: () => void;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    side: Side,
    parentFunc: () => void,
  ) {
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
    this.setScale(0.65);

    this.textureKey = texture;

    // adding parent function
    this.parentFunc = parentFunc;

    // calling function of key listening
    this.setupKeysListeners();
    
    // frame animations
    if (!scene.anims.exists("down")) {
      anims.create({
        key: "down",
        frames: anims.generateFrameNumbers(this.textureKey, {
          frames: [0, 5, 0, 6],
        }),
        frameRate: animsFrameRate,
        repeat: -1,
      });
    }

    if (!scene.anims.exists("left")) {
      anims.create({
        key: "left",
        frames: anims.generateFrameNumbers(this.textureKey, {
          frames: [1, 2],
        }),
        frameRate: animsFrameRate,
        repeat: -1,
      });
    }

    if (!scene.anims.exists("right")) {
      anims.create({
        key: "right",
        frames: anims.generateFrameNumbers(this.textureKey, {
          frames: [3, 4],
        }),
        frameRate: animsFrameRate,
        repeat: -1,
      });
    }

    if (!scene.anims.exists("up")) {
      anims.create({
        key: "up",
        frames: anims.generateFrameNumbers(this.textureKey, {
          frames: [8, 7, 8, 9],
        }),
        frameRate: animsFrameRate,
        repeat: -1,
      });
    }

    // changing player side depending on scene 
    this.play(`${side || 'down'}`, false);
  }
  
  // adding other zones in current scene
  setZones(zones: GameObjects.Zone[]) {
    this.zones = zones;
  }

  // function of finding our target (zone)
  private findTarget(zones: GameObjects.Zone[]) {
    let target = null;
    let minDistance = Infinity;

    for (const zone of zones) {
      const distance = Math.Distance.Between(this.x, this.y, zone.x, zone.y);

      if (distance < minDistance) {
        minDistance = distance;
        target = zone;
      }
    }
    return target;
  }

  // private function for action functions, like interact()
  private setupKeysListeners() {
    this.scene.input.keyboard.on("keydown-E", () => {
      const target = this.findTarget(this.zones);
      // console.log(target)
      this.interact(target);
    });
  }

  // function for player interaction with items
  interact(target: any) {
    const distance = Math.Distance.Between(this.x, this.y, target.x, target.y);

    if (distance < 10) {
      // use parent function
      this.parentFunc();
    }
  }

  update(time: number, delta: number) {
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

    // returning time for removing warning by TypeScript
    return time;
  }
}
