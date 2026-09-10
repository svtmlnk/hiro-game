import { Scene, Sound } from "phaser";
import basementJSON from "../../../src/game/assets/basement.json";
import { LAYERS, SIZES, SPRITES, TILES } from "../utils/constants";
import { Hiro } from "../entities/hiro";
import { DialogueAction } from "../utils/dialogueAction";

export class Basement extends Scene {
  private hiro?: Hiro;
  worldZone;
  laptopZone;
  door_sound: Sound.NoAudioSound | Sound.HTML5AudioSound | Sound.WebAudioSound;
  private dialogueAction?: DialogueAction;

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
      () => this.changeScene(),
      () => this.startDialogue(),
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
    this.worldZone = this.add.zone(48, 5, 30, 60);
    this.worldZone.name = "World";
    this.physics.add.existing(this.worldZone);
    this.worldZone.body.setAllowGravity(false);
    this.worldZone.body.setImmovable(true);

    // adding dialogue zone
    this.laptopZone = this.add.zone(210, 50, 30, 30);
    this.laptopZone.name = "laptop";
    this.laptopZone.type = "object";
    this.physics.add.existing(this.laptopZone);
    this.laptopZone.body.setAllowGravity(false);
    this.laptopZone.body.setImmovable(true);

    // adding targets for player interaction with interactive elements
    this.hiro.setTargets([this.worldZone, this.laptopZone]);

    this.dialogueAction = new DialogueAction(
      this,
      this.hiro,
      this.laptopZone.name
    );
  }

  // function of changing scene
  changeScene() {
    this.scene.stop();
    this.door_sound.play();

    setTimeout(() => {
      this.scene.start("World", { x: 544, y: 431 });
    }, 2000);
  }

  startDialogue() {
    this.dialogueAction.talkFunc();
  }

  update(time: number, delta: number): void {
    // update player position
    this.hiro.update(time, delta);
  }
}
