import { Scene, GameObjects } from "phaser";

export class Title extends Scene {
  title: GameObjects.Text;
  info: GameObjects.Text;
  text: GameObjects.Text;

  constructor() {
    super("Title");
  }

  create() {
    const template = [
      "█   █ ███ ████   ███ ",
      "█   █  █  █   █ █   █",
      "█████  █  ████  █   █",
      "█   █  █  █  █  █   █",
      "█   █ ███ █   █  ███ ",
    ];

    this.title = this.add
      .text(320, 130, template, {
        fontSize: 32,
        color: "#bfbfbf",
        stroke: "#000000",
        align: "center",
      })
      .setOrigin(0.5);

    this.info = this.add
      .text(
        320,
        300,
        "This program gives you the opportunity\nto inhabit and explore a virtual world\nI created, while controlling a creature\nthat calls itself «HIRO».",
        {
          fontFamily: "PIXY",
          fontSize: 23,
          color: "#bfbfbf",
          stroke: "#000000",
          align: "center",
        },
      )
      .setOrigin(0.5);

    this.text = this.add
      .text(320, 430, "[ Press ENTER to continue ]", {
        fontFamily: "PIXY",
        fontSize: 16,
        color: "#bfbfbfb9",
        stroke: "#000000",
        align: "center",
      })
      .setOrigin(0.5);

    this.input.keyboard.on("keydown-ENTER", () => {
      this.scene.start("MainMenu", { x: 400, y: 250 });
    });
  }
}
