import { Scene, GameObjects } from "phaser";
import dialogue from './dialogue.json';
import { Hiro } from "../entities/hiro";

export class DialogueAction {
  scene: Scene;
  text: GameObjects.Text;
  box: GameObjects.Rectangle;

  elemName: string;
  private hiro: Hiro;

  constructor(scene: Phaser.Scene, hiro: Hiro, elemName: string) {
    this.elemName = elemName;
    this.hiro = hiro;
  }

  talkFunc() {
    console.log(this.elemName);
    console.log(this.hiro);
    const elem = dialogue.find(elem => elem.elem === this.elemName);

    // for(let i = 0; i < elem.dialogues.length; i++){
    for(let dialogue of elem.dialogues){
      alert(dialogue)
    }
  }
}
