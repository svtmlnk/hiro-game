import { Scene, Sound } from "phaser";
import worldJSON from "../../../src/game/assets/world.json";
import { LAYERS, SIZES, SPRITES, TILES } from "../utils/constants";
import { Hiro } from "../entities/hiro";
import { Glitch } from "../entities/glitch";

export class World extends Scene {
  // File of the first game world
  private hiro?: Hiro;
  private spawnX = 400;
  private spawnY = 250;
  private glitch?: Glitch;
  interactionZone;
  music: Sound.NoAudioSound | Sound.HTML5AudioSound | Sound.WebAudioSound;
  door_sound: Sound.NoAudioSound | Sound.HTML5AudioSound | Sound.WebAudioSound;

  constructor() {
    super("World");
  }

  // preloading assets (only map)
  preload() {
    this.load.tilemapTiledJSON("world_map", worldJSON);
  }

  // getting positions from MainMenu.ts and Room.ts for changing player position
  init(data: { x?: number; y?: number }) {
    this.spawnX = data.x || 400;
    this.spawnY = data.y || 250;
  }

  create() {
    // adding world map
    const map = this.make.tilemap({ key: "world_map" });

    // adding sprites for this world
    // grass:
    const tileset = map.addTilesetImage(
      worldJSON.tilesets[0].name,
      TILES.WORLD,
      SIZES.TILES,
      SIZES.TILES,
    );

    // items:
    const tileItemset = map.addTilesetImage(
      worldJSON.tilesets[1].name,
      TILES.ITEMS,
      SIZES.TILES,
      SIZES.TILES,
    );

    // house:
    const tileHouseset = map.addTilesetImage(
      worldJSON.tilesets[2].name,
      TILES.HOUSE,
      SIZES.TILES,
      SIZES.TILES,
    );

    // adding world layers
    // ground layer:
    map.createLayer(LAYERS.GROUND, tileset, 0, 0);

    // items down layer:
    map.createLayer(LAYERS.ITEMS_DOWN, tileItemset, 0, 0);

    // items layer:
    const itemsLayer = map.createLayer(
      LAYERS.ITEMS,
      [tileItemset, tileHouseset],
      0,
      0,
    );

    // adding hiro (player) in this world: scene, position x y, texture name, side and callback function for changing scene
    this.hiro = new Hiro(
      this,
      this.spawnX,
      this.spawnY,
      SPRITES.HIRO,
      "down",
      () => this.changeScene(),
      () => this.glitch.runGlitch(),
    );

    // // adding enemy in this world
    // this.slime_enemy = new Enemy(this, 530, 350, SPRITES.SLIME_ENEMY.base);

    // items up layer (adding this code after creating player for correctrly working)
    map.createLayer(LAYERS.ITEMS_UP, [tileItemset, tileHouseset], 0, 0);

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

    this.physics.add.collider(this.hiro, itemsLayer);
    itemsLayer.setCollisionByExclusion([-1]);

    // adding music
    this.music = this.sound.add("world_music", { loop: true });
    this.music.play();

    // adding door sound
    this.door_sound = this.sound.add("door_sound", { loop: false });

    // adding interaction zone
    this.interactionZone = this.add.zone(544, 535, 20, 20);
    // console.log(typeof this.interactionZone)
    // console.log(this.interactionZone.x)
    this.physics.add.existing(this.interactionZone);
    this.interactionZone.body.setAllowGravity(false);
    this.interactionZone.body.setImmovable(true);

    // adding glitch in this world, getting player and music info for their changing
    this.glitch = new Glitch(this, 881, 862, SPRITES.GLITCH.base);
    this.glitch.setHiro(this.hiro);
    this.glitch.setMusicFromScene(this.music);

    // adding zones in this array for function setZone (hiro.ts)
    this.hiro.setTargets([this.interactionZone, this.glitch]);
  }

  // function of changing scene
  changeScene() {
    this.scene.stop();
    this.music.stop();
    this.door_sound.play();

    setTimeout(() => {
      this.scene.start("Room");
    }, 2000);
  }

  update(time: number, delta: number): void {
    // update player position
    this.hiro.update(time, delta);
  }
}
