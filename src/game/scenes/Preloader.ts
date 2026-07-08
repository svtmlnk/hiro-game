import { Scene } from "phaser";
import { SIZES, SPRITES, TILES } from "../utils/constants";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(320, 400, 468, 32).setStrokeStyle(2, 0xbfbfbf);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(320 - 230, 400, 4, 28, 0xbfbfbf);

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
    this.load.spritesheet(SPRITES.HIRO, "assets/characters/hiro.png", {
      frameWidth: SIZES.HIRO.WIDTH,
      frameHeight: SIZES.HIRO.HEIGHT,
    });

    // preloading music
    this.load.audio("music", "assets/music/sleepless.mp3")
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
