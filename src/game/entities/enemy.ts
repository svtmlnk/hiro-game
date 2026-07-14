import { Math, Scene } from "phaser";
import { Entity } from "./entity";

export class Enemy extends Entity {
  private hiro: Entity;
  constructor(scene: Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.setSize(23, 23);
  }

  // getting our player from various scenes
  setHiro(hiro: Entity) {
    this.hiro = hiro;
  }

  runGlitch() {
    console.log("glitch");
  }

  update() {
    const hiro = this.hiro;
    const distanceToHiro = Math.Distance.Between(
      this.x,
      this.y,
      hiro.x,
      hiro.y,
    );
  }
}
