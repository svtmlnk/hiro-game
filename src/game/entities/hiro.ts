import { GameObjects, Scene, Physics } from "phaser";
import { Entity } from "./entity";

type Side = "up" | "down" | "left" | "right";

export class Hiro extends Entity {
  textureKey: string;
  private moveSpeed: number;
  movePlayer: boolean;
  isDead: boolean;
  targets: GameObjects.Zone[] | Entity[];
  interactionZone: GameObjects.Zone;
  private currentSide: Side = "down";

  // for changing scenes to our nedded scene we are getting zone name from interact()
  private parentFunc_changeScene: (zoneName: string) => void;
  private parentFunc_entityInteract: () => void;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    side: Side,
    // for changing scenes to our nedded scene we are getting zone name from interact()
    parentFunc_changeScene: (zoneName: string) => void,
    parentFunc_entityInteract?: () => void,
  ) {
    super(scene, x, y, texture);

    const anims = this.scene.anims;
    // speed anims
    const animsFrameRate = 4;
    // player speed
    this.moveSpeed = 8;
    // boolean of moving player
    this.movePlayer = true;
    this.isDead = false;

    // hitbox size and position
    this.setSize(30, 10);
    this.setOffset(10, 45);

    // player sprite size
    this.setScale(0.65);

    this.textureKey = texture;

    // adding parent function
    this.parentFunc_changeScene = parentFunc_changeScene;
    this.parentFunc_entityInteract = parentFunc_entityInteract;

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

    if (!scene.anims.exists("dead")) {
      anims.create({
        key: "dead",
        frames: anims.generateFrameNumbers(this.textureKey, {
          frames: [10],
        }),
        frameRate: animsFrameRate,
        repeat: -1,
      });
    }

    // changing player side depending on scene
    this.play(`${side || "down"}`, false);

    // creating interaction zone for player
    this.interactionZone = this.scene.add.zone(this.x, this.y + 30, 10, 10);
    this.scene.physics.add.existing(this.interactionZone);
    (this.interactionZone.body as Physics.Arcade.Body).setAllowGravity(false);
  }

  deadFunc() {
    this.play("dead", false);
  }

  // adding other targets (zones and entities/sprites) in current scene
  setTargets(targets: GameObjects.Zone[] | Entity[]) {
    this.targets = targets;
  }

  // function of finding our target (zone or entitiy/sprite)
  private findTarget(targets: GameObjects.Zone[] | Entity[]) {
    for (const target of targets) {
      // we finding current target by overlapping with player's interaction zone
      if (this.scene.physics.overlap(this.interactionZone, target)) {
        return target;
      }
    }

    return null;
  }

  // private function for action functions, like interact()
  private setupKeysListeners() {
    this.scene.input.keyboard.on("keydown-E", () => {
      const target = this.findTarget(this.targets);

      if (target && !this.isDead) {
        this.interact(target);
      }
    });
  }

  // function for player interaction with items
  interact(target: any) {
    if (target.type == "Zone") {
      // we are getting zone name from target (zone target from World.ts or another parent scene file) for changing scenes to our nedded scene
      this.parentFunc_changeScene(target.name);
    } else {
      this.parentFunc_entityInteract();
    }
  }

  update(time: number, delta: number) {
    // moving controls
    const keys = this.scene.input.keyboard.createCursorKeys();

    if (this.movePlayer) {
      if (keys.up.isDown) {
        this.currentSide = "up";
        this.play("up", true);
        this.setVelocity(0, -delta * this.moveSpeed);
      } else if (keys.down.isDown) {
        this.currentSide = "down";
        this.setVelocity(0, delta * this.moveSpeed);
        this.play("down", true);
      } else if (keys.left.isDown) {
        this.currentSide = "left";
        this.setVelocity(-delta * this.moveSpeed, 0);
        this.play("left", true);
      } else if (keys.right.isDown) {
        this.currentSide = "right";
        this.setVelocity(delta * this.moveSpeed, 0);
        this.play("right", true);
      } else {
        this.setVelocity(0);
        this.stop();
      }
    }

    // switching positions for interaction zone
    switch (this.currentSide) {
      case "up":
        this.interactionZone.setPosition(this.x, this.y - 5);
        break;

      case "down":
        this.interactionZone.setPosition(this.x, this.y + 25);
        break;

      case "left":
        this.interactionZone.setPosition(this.x - 20, this.y);
        break;

      case "right":
        this.interactionZone.setPosition(this.x + 20, this.y);
        break;
    }

    // returning time for removing warning by TypeScript
    return time;
  }
}
