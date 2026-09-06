import { Scene, GameObjects } from "phaser";
import dialogue from './dialogue.json';

export class DialogueBox {
  scene: Scene;
  text: GameObjects.Text;
  box: GameObjects.Rectangle;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.box = scene.add.rectangle(
      320, // x
      310, // y
      300, // width
      80, // height
      0x222222,
    );

    this.text = scene.add
      .text(180, 275, `${dialogue[0].dialogues[0]}`, {
        fontSize: 12,
        color: "#bfbfbf",
        align: "left",
        wordWrap: { width: 260, useAdvancedWrap: true, },
      })

    this.box.setDepth(1000);
    this.box.setScrollFactor(0);

    this.text.setScrollFactor(0);
    this.text.setDepth(1001);
  }

  runTest() {
    console.log("Work");
  }
}
