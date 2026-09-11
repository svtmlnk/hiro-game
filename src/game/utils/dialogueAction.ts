import { Scene, GameObjects, Sound } from "phaser";
import dialogue from "./dialogue.json";
import { Hiro } from "../entities/hiro";

export class DialogueAction {
  scene: Scene;
  text: GameObjects.Text;
  box: GameObjects.Rectangle;
  sound: Sound.BaseSound;

  elemName: string;
  private hiro: Hiro;

  private currentDialogue: string[] = [];
  private currentIndex = 0;
  private isTalking = false;

  constructor(scene: Phaser.Scene, hiro: Hiro, elemName: string) {
    this.elemName = elemName;
    this.hiro = hiro;

    this.box = scene.add.rectangle(
      320, // x
      310, // y
      300, // width
      80, // height
      0x222222,
    );

    this.text = scene.add.text(180, 275, `Hello`, {
      fontSize: 14,
      fontFamily: "PIXY",
      color: "#bfbfbf",
      align: "left",
      wordWrap: { width: 260, useAdvancedWrap: true },
    });

    this.box.setDepth(1000);
    this.box.setScrollFactor(0);
    this.box.setVisible(false);

    this.text.setScrollFactor(0);
    this.text.setDepth(1001);
    this.text.setVisible(false);

    this.sound = scene.sound.add("dialogue_sound");
  }

  talkFunc() {
    const elem = dialogue.find((elem) => elem.elem === this.elemName);

    if (!elem) return;

    // если диалог уже открыт
    if (this.isTalking) {
      this.nextDialogue();
      return;
    }

    this.currentDialogue = elem.dialogues;
    this.currentIndex = 0;
    this.isTalking = true;

    this.box.setVisible(true);
    this.text.setVisible(true);

    this.showCurrentDialogue();
    this.sound.play();
    this.hiro.movePlayer = false;
  }
  
  private showCurrentDialogue() {
    this.text.setText(this.currentDialogue[this.currentIndex]);

  }

  private nextDialogue() {
    this.currentIndex++;

    if (this.currentIndex >= this.currentDialogue.length) {
      this.box.setVisible(false);
      this.text.setVisible(false);
      
      this.isTalking = false;
      this.currentIndex = 0;
      this.hiro.movePlayer = true;

      return;
    }

    this.showCurrentDialogue();
  }
}
