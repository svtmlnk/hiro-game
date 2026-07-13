import { GameObjects, Scene, Sound } from "phaser";
import { SPRITES } from "../utils/constants";
import { Hiro } from "../entities/hiro";

export class GameOver extends Scene {
  private hiro?: Hiro;
  interactionZone;
  music: Sound.NoAudioSound | Sound.HTML5AudioSound | Sound.WebAudioSound;
  bg: Phaser.GameObjects.Video;
  text: GameObjects.Text;

  constructor() {
    super("GameOver");
  }

  // preloading assets
  preload() {
    // ...
  }

  create() {
    // adding video background
    this.bg = this.add.video(640, 480, "bg").setOrigin(1);
    this.bg.setScrollFactor(0);
    this.bg.play();

    // adding hiro (player) in this world: scene, position x y, texture name, side and callback function
    this.hiro = new Hiro(this, 304, 270, SPRITES.HIRO, "down", () => {});

    // adding camera for player
    this.cameras.main.startFollow(this.hiro);
    // camera zoom
    this.cameras.main.setZoom(2);
    this.cameras.main.setBounds(0, 0, 500, 500);
    this.physics.world.setBounds(0, 0, 500, 500);
    this.hiro.setCollideWorldBounds(true);

    // adding music
    this.music = this.sound.add("pc_music", { loop: true });
    this.music.play();

    this.text = this.add
      .text(320, 320, "Press F5 to restart", {
        fontFamily: "PIXY",
        fontSize: 16,
        color: "#c9c9c9",
        stroke: "#000000",
        align: "center",
      })
      .setOrigin(0.5);
    this.text.setAlpha(0);
    this.text.setScrollFactor(0);

    setTimeout(() => {
      this.tweens.add({
        targets: this.text,
        alpha: { from: 0, to: 1 },
        duration: 5000,
        ease: "Linear",
      });
    }, 10000);
  }

  update(time: number, delta: number): void {
    // update player position
    this.hiro.update(time, delta);
  }
}
