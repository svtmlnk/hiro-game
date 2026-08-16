import { GameObjects, Scene } from "phaser";

export class Reality extends Scene {
  title: GameObjects.Text;
  info: GameObjects.Text;
  text: GameObjects.Text;

  constructor() {
    super("Reality");
  }

  create() {
    this.text = this.add
      .text(20, 20, "Reality is that which,\nwhen you stop believing in it,\ndoesn't go away.\n\nPress R to reboot the system.", {
        fontFamily: "PIXY",
        fontSize: 23,
        color: "#bfbfbf",
        stroke: "#000000",
        align: "left",
      })
      .setOrigin(0);

    this.input.keyboard.on("keydown-R", () => {
      this.scene.stop();
      setTimeout(() => {
        this.scene.start("World", { x: 400, y: 250 });
      }, 3000);
    });
  }
}
