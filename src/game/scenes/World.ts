import { Scene } from "phaser";
import worldJSON from "../assets/world.json";
import { LAYERS, SIZES, SPRITES, TILES } from "../utils/constants";
import { Hiro } from "../entities/hiro";

export class World extends Scene {
  private hiro?: Hiro;

  // File of the first game world
  constructor() {
    super("World");
  }

  // preloading assets (grass, items and map)
  preload() {
    this.load.image(TILES.WORLD, "src/game/assets/grass.png");
    this.load.image(TILES.ITEMS, "src/game/assets/items.png");
    this.load.tilemapTiledJSON("map", "src/game/assets/world.json");
    this.load.spritesheet(SPRITES.HIRO, "src/game/assets/characters/hiro.png", {
      frameWidth: SIZES.HIRO.WIDTH,
      frameHeight: SIZES.HIRO.HEIGHT,
    });
  }

  create() {
    // adding world map
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage(
      worldJSON.tilesets[0].name,
      TILES.WORLD,
      SIZES.TILES,
      SIZES.TILES,
    );
    // adding items for world map
    const tileItemset = map.addTilesetImage(
      worldJSON.tilesets[1].name,
      TILES.ITEMS,
      SIZES.TILES,
      SIZES.TILES,
    );
    // adding items up position for world map
    // adding world layers
    const groundLayer = map.createLayer(LAYERS.GROUND, tileset, 0, 0);
    const itemsLayer = map.createLayer(LAYERS.ITEMS, tileItemset, 0, 0);

    // adding hiro (player) in this world: scene, position x y, texture name
    this.hiro = new Hiro(this, 400, 250, SPRITES.HIRO);

    // adding camera for player
    this.cameras.main.startFollow(this.hiro);
    this.cameras.main.setZoom(2);
    // adding bounds for this camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
    // adding bounds for this world
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // adding collider world bounds for the player
    this.hiro.setCollideWorldBounds(true);

    this.physics.add.collider(this.hiro, itemsLayer);
    itemsLayer.setCollisionByExclusion([-1]);
  }

  update(time: number, delta: number): void {
    // update player position
    this.hiro.update(delta);
  }
}
