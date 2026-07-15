import { Scene, Sound } from "phaser";
import roomJSON from "../../../src/game/assets/room.json";
import { LAYERS, SIZES, SPRITES, TILES } from "../utils/constants";
import { Hiro } from "../entities/hiro";
import { Glitch } from "../entities/glitch";

export class Room extends Scene {
  // File of the first game world

  private hiro?: Hiro;
  private glitch?: Glitch;
  interactionZone;
  music: Sound.NoAudioSound | Sound.HTML5AudioSound | Sound.WebAudioSound;
  door_sound: Sound.NoAudioSound | Sound.HTML5AudioSound | Sound.WebAudioSound;

  constructor() {
    super("Room");
  }

  // preloading assets (only map)
  preload() {
    this.load.tilemapTiledJSON("room_map", roomJSON);
  }

  create() {
    // adding world map
    const map = this.make.tilemap({ key: "room_map" });

    // random spawning glitch entity
    const shouldSpawnGlitch = Math.random() < 0.5;

    // adding sprites for this world
    // floor:
    const tileset = map.addTilesetImage(
      roomJSON.tilesets[0].name,
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
      304,
      270,
      SPRITES.HIRO,
      "up",
      () => this.changeScene(),
      () => this.glitchFunc(),
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

    // adding music
    this.music = this.sound.add("room_music", { loop: true });
    this.music.play();

    // adding door sound
    this.door_sound = this.sound.add("door_sound", { loop: false });

    // adding interaction zone
    this.interactionZone = this.add.zone(305, 270, 20, 20);
    this.physics.add.existing(this.interactionZone);
    this.interactionZone.body.setAllowGravity(false);
    this.interactionZone.body.setImmovable(true);

    // adding randomly enemy (glitch) in this world
    if (shouldSpawnGlitch) {
      this.glitch = new Glitch(this, 197, 163, SPRITES.GLITCH.base);
      console.log("spawn");
      
      // adding zones in this array for function setZone (hiro.ts)
      this.hiro.setTargets([this.interactionZone, this.glitch]);
    }
    else{
      this.hiro.setTargets([this.interactionZone]);
    }

  }

  // function of changing scene
  changeScene() {
    this.scene.stop();
    this.music.stop();
    this.door_sound.play();

    setTimeout(() => {
      this.scene.start("World", { x: 545, y: 540 });
    }, 2000);
  }

  // This functionality should be in glitch.ts (runGlitch)
  glitchFunc() {
    this.hiro.deadFunc();
    this.hiro.disableBody(true, false);
    this.hiro.movePlayer = false;
    this.music.stop();
    this.glitch.runGlitch();

    this.tweens.add({
      targets: this.cameras.main,
      zoom: { from: 2, to: 5 },
      duration: 5000,
      ease: "Linear",
    });

    // camera shaking
    this.cameras.main.shake();

    // Listen for the complete event to cycle the shake
    this.cameras.main.on("camerashakecomplete", () => {
      // Wait briefly or instantly trigger the next shake
      this.cameras.main.shake();
    });

    setTimeout(() => {
      this.scene.start("GameOver", { x: 545, y: 540 });
    }, 3200);
  }

  update(time: number, delta: number): void {
    // update player position
    this.hiro.update(time, delta);
  }
}
