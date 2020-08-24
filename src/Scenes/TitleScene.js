import Phaser from "phaser";
import config from "../Config/config";
import Button from "../Objects/Button";
import Player from "../Classes/Player";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  create() {
    this.textInstructions = this.add.text(200, 100, `Lily's Adventure`, {
      fontSize: 40,
    });

    this.player = new Player({
      scene: this,
      x: 380,
      y: 90,
      texture: "princess",
      frame: "princess_idle_1",
    });
    this.player.setScale(2);
    this.player.anims.play("princess_walk", true);
    // this.add.atlas(
    //   "princess",
    //   "assets/images/princess.png",
    //   "assets/images/princess_atlas.json"
    // );
    // this.add.animation("princess_anim", "assets/images/princess_anim.json");

    // Game
    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 100,
      "blueButton1",
      "blueButton2",
      "Play",
      "Welcome"
    );

    // Options
    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      "blueButton1",
      "blueButton2",
      "Options",
      "Options"
    );

    // Credits
    this.creditsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      "blueButton1",
      "blueButton2",
      "Credits",
      "Credits"
    );

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add("bgMusic", { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        config.width / 2,
        config.height / 2 - offset * 100,
        config.width,
        config.height
      )
    );
  }

  // eslint-disable-next-line class-methods-use-this
  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
  }
}
