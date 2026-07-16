import { Scene, Sound } from "phaser";
import { Hiro } from "../entities/hiro";

// this file is responsiblew for running game over effects and scene in various scenes, when player interacted with glitch entity
export class GameOverManager {
  static run(scene: Scene, hiro: Hiro, sound: Sound.BaseSound, music?: Sound.BaseSound) {
    hiro.deadFunc();
    hiro.disableBody(true, false);
    hiro.movePlayer = false;
    sound.play();

    music?.stop();

    scene.tweens.add({
      targets: scene.cameras.main,
      zoom: { from: 2, to: 10 },
      duration: 5000,
      ease: "Linear",
    });

    scene.cameras.main.shake();

    scene.cameras.main.on("camerashakecomplete", () => {
      scene.cameras.main.shake();
    });

    setTimeout(() => {
      scene.scene.start("GameOver");
    }, 3200);
  }
}