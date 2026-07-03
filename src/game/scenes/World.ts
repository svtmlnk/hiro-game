import { Scene, GameObjects } from "phaser";
import worldJSON from "../assets/world.json";
import { LAYERS, SIZES, TILES } from "../utils/constants";

export class World extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;

  constructor() {
    super("World");
  }

  preload() {
    this.load.image(TILES.WORLD, "src/game/assets/grass.png");
    this.load.image(TILES.ITEMS, "src/game/assets/items.png");
    this.load.tilemapTiledJSON("map", "src/game/assets/world.json");
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
    const groundLayer = map.createLayer(LAYERS.GROUND, tileset, 0, 0);
    const itemsLayer = map.createLayer(LAYERS.ITEMS, tileItemset, 0, 0);
  }
}
