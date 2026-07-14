import { Math, Scene, Sound } from "phaser";
import { Entity } from "./entity";

export class Glitch extends Entity {
  private hiro: Entity;
  textureKey: string;
  glitch_sound: Sound.NoAudioSound | Sound.HTML5AudioSound | Sound.WebAudioSound;
  constructor(scene: Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.setSize(23, 23);
    this.setScale(1);

    const anims = this.scene.anims;
    this.textureKey = texture;

    // speed anims
    const animsFrameRate = 7;

    // adding glitch sound
    this.glitch_sound = this.scene.sound.add("glitch_sound", { loop: false });

    anims.create({
      key: "exist",
      frames: anims.generateFrameNumbers(this.textureKey, {
        frames: [2, 0, 1, 0, 2, 1, 2, 0],
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });

    this.play("exist", true);
  }

  // getting our player from various scenes
  setHiro(hiro: Entity) {
    this.hiro = hiro;
  }

  runGlitch() {
    this.glitch_sound.play();
    // console.log("glitch");
  }

  update() {
    const hiro = this.hiro;
    const distanceToHiro = Math.Distance.Between(
      this.x,
      this.y,
      hiro.x,
      hiro.y,
    );
  }
}
