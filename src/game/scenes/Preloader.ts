import { Scene } from "phaser";
import { SIZES, SPRITES, TILES } from "../utils/constants";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(320 - 230, 400, 4, 6, 0xbfbfbf);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on("progress", (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });

    this.load.on("complete", () => {
      bar.destroy();
      this.scene.start("MainMenu");
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
    this.load.audio("pc_music", "assets/music/taste_of_blood.mp3");

    // preloading sounds
    this.load.audio("door_sound", "assets/sound/door.mp3");
    this.load.audio("glitch_sound", "assets/sound/glitch.mp3");

    this.load.video("bg", "assets/video/bg.mp4")
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
