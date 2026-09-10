import { Scene } from "phaser";
import { SIZES, SPRITES, TILES } from "../utils/constants";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    // text loader
    // creating text object
    const textObject = this.add
      .text(320, 240, "|", {
        fontSize: "32px",
        fontFamily: "PIXY",
        color: "#bfbfbf"
      })
      .setOrigin(0.5);

    // array of animation frames
    const frames = ["|", "/", "-", "\\"];
    let index = 0;

    // creating timer
    this.time.addEvent({
      delay: 200, // speed of changing frames
      callback: () => {
        index = (index + 1) % frames.length;
        textObject.setText(frames[index]);
      },
      loop: true,
    });

    this.load.on("complete", () => {
      textObject.destroy();
      this.scene.start("Title");
    });
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    // preloading assets (grass, items and player)
    this.load.image(TILES.WORLD, "assets/sprites/grass.png");
    this.load.image(TILES.ITEMS, "assets/sprites/items.png");
    this.load.image(TILES.HOUSE, "assets/sprites/house.png");
    this.load.image(TILES.ROOM, "assets/sprites/interior.png");
    this.load.spritesheet(SPRITES.HIRO, "assets/characters/hiro.png", {
      frameWidth: SIZES.HIRO.WIDTH,
      frameHeight: SIZES.HIRO.HEIGHT,
    });
    this.load.spritesheet(SPRITES.GLITCH.base, "assets/characters/glitch.png", {
      frameWidth: SIZES.GLITCH.WIDTH,
      frameHeight: SIZES.GLITCH.HEIGHT,
    });

    // preloading music
    this.load.audio("world_music", "assets/music/sleepless.mp3");
    this.load.audio("room_music", "assets/music/deldee.mp3");

    // preloading sounds
    this.load.audio("door_sound", "assets/sound/door.mp3");
    this.load.audio("glitch_sound", "assets/sound/glitch.mp3");

    // fonts
    this.load.font("PIXY", "assets/fonts/PIXY.ttf")
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.
    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    // this.scene.start('MainMenu');
    // this.input.once("pointerdown", () => {
    //   this.scene.start("MainMenu");
    // });
    // this.scene.start("World");
  }
}
