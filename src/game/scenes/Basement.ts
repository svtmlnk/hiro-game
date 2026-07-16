import { Scene, Sound } from "phaser";
import basementJSON from "../../../src/game/assets/basement.json";
import { LAYERS, SIZES, SPRITES, TILES } from "../utils/constants";
import { Hiro } from "../entities/hiro";

export class Basement extends Scene {
  private hiro?: Hiro;
  interactionZone;
  door_sound: Sound.NoAudioSound | Sound.HTML5AudioSound | Sound.WebAudioSound;

  constructor() {
    super("Basement");
  }

  // preloading assets (only map)
  preload() {
    this.load.tilemapTiledJSON("basement_map", basementJSON);
  }

  create() {
    // adding world map
    const map = this.make.tilemap({ key: "basement_map" });

    // random spawning glitch entity
    // const shouldSpawnGlitch = Math.random() < 0.5;

    // adding sprites for this world
    // floor:
    const tileset = map.addTilesetImage(
      basementJSON.tilesets[0].name,
      TILES.ROOM,
      SIZES.TILES,
      SIZES.TILES,
    );

    // adding world layers
    // floor layer:
    map.createLayer(LAYERS.FLOOR, tileset, 0, 0);

    // interior layer:
    const interiorLayer = map.createLayer(LAYERS.INTERIOR, tileset, 0, 0);

    // adding hiro (player) in this world: scene, position x y, texture name, side and callback function
    this.hiro = new Hiro(
      this,
      47,
      20,
      SPRITES.HIRO,
      "down",
      () => this.changeScene()
    );

    // items up layer (adding this code after creating player for correctrly working)
    map.createLayer(LAYERS.INTERIOR_UP, tileset, 0, 0);

    // adding camera for player
    this.cameras.main.startFollow(this.hiro);
    // camera zoom
    this.cameras.main.setZoom(2);
    // adding bounds for this camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // adding bounds for this world
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // adding collider world bounds for the player
    this.hiro.setCollideWorldBounds(true);

    this.physics.add.collider(this.hiro, interiorLayer);
    interiorLayer.setCollisionByExclusion([-1]);

    // adding door sound
    this.door_sound = this.sound.add("door_sound", { loop: false });

    // adding interaction zone
    this.interactionZone = this.add.zone(47, 1, 20, 20);
    this.physics.add.existing(this.interactionZone);
    this.interactionZone.body.setAllowGravity(false);
    this.interactionZone.body.setImmovable(true);

    // adding targets for player interaction with interactive elements
    this.hiro.setTargets([this.interactionZone]);
  }

  // function of changing scene
  changeScene() {
    this.scene.stop();
    this.door_sound.play();

    setTimeout(() => {
      this.scene.start("World", { x: 544, y: 431 });
    }, 2000);
  }

  update(time: number, delta: number): void {
    // update player position
    this.hiro.update(time, delta);
  }
}
