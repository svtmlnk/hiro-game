import { Scene, GameObjects } from "phaser";

export class MainMenu extends Scene {
  title: GameObjects.Text;
  info: GameObjects.Text;
  text: GameObjects.Text;

  constructor() {
    super("MainMenu");
  }

  create() {
    this.title = this.add
      .text(320, 50, "---Instruction---", {
        fontFamily: "PIXY",
        fontSize: 23,
        color: "#bfbfbf",
        stroke: "#000000",
        align: "center",
      })
      .setOrigin(0.5);

    this.info = this.add
      .text(320, 150, "[⬆] [⬇] [⬅] [➡] - moving\n[E] - interaction", {
        fontFamily: "PIXY",
        fontSize: 23,
        color: "#bfbfbf",
        stroke: "#000000",
        align: "center",
      })
      .setOrigin(0.5);

    this.text = this.add
      .text(320, 430, "Press ENTER to continue", {
        fontFamily: "PIXY",
        fontSize: 23,
        color: "#bfbfbf",
        stroke: "#000000",
        align: "center",
      })
      .setOrigin(0.5);

    this.input.keyboard.on("keydown-ENTER", () => {
      this.scene.stop();

      setTimeout(() => {
        this.scene.start("World");
      }, 1000);
    });
  }
}
