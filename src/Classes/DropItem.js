import Phaser from "phaser";
import LocalStorage from "../Objects/localStorage";

export default class DropItem extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    const { scene, x, y, frame } = data;
    super(scene.matter.world, x, y, "items", frame);
    this.scene.add.existing(this);
    const { Bodies } = Phaser.Physics.Matter.Matter;
    const circleCollider = Bodies.circle(this.x, this.y, 10, {
      isSensor: false,
      label: "collider",
    });
    this.setExistingBody(circleCollider);
    this.setFrictionAir(1);
    this.setScale(0.5);
    this.sound = this.scene.sound.add("pickup");
  }

  pickup() {
    let score = parseInt(localStorage.getItem("score")) || 0;
    console.log(this.frame.name);
    console.log(score);
    if ([270, 276, 275].includes(this.frame.name)) {
      score += 50;
    } else {
      score += 10;
    }
    console.log(score);
    localStorage.setItem("score", score);
    this.destroy();
    this.sound.play();
    // this.sys.game.globals.model.score += 1;
    return true;
  }
}
