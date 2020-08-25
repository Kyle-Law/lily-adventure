import Phaser from "phaser";
import config from "../Config/config";
import Button from "../Objects/Button";
import Player from "../Classes/Player";
import Resource from "../Classes/Resource";
import Enemy from "../Classes/Enemy";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  preload() {
    // load assets needed in our game
    this.load.image("blueButton1", "src/assets/ui/blue_button02.png");
    this.load.image("blueButton2", "src/assets/ui/blue_button03.png");
    this.load.image("phaserLogo", "src/assets/logo.png");
    this.load.image("box", "src/assets/ui/grey_box.png");
    this.load.image("checkedBox", "src/assets/ui/blue_boxCheckmark.png");
    this.load.image("upKey", "src/assets/guide/KeyboardButtonsDir_up.png");
    this.load.image("downKey", "src/assets/guide/KeyboardButtonsDir_down.png");
    this.load.image("leftKey", "src/assets/guide/KeyboardButtonsDir_left.png");
    this.load.image(
      "rightKey",
      "src/assets/guide/KeyboardButtonsDir_right.png"
    );
    this.load.image(
      "spaceKey",
      "src/assets/guide/OnscreenKeyboardButtonsSpace.png"
    );
    this.load.audio("bgMusic", ["src/assets/TownTheme.mp3"]);
    Player.preload(this);
    Enemy.preload(this);
    Resource.preload(this);
    this.load.image("tiles", "src/assets/images/IceTileset-extruded.png");
    this.load.tilemapTiledJSON("map", "src/assets/images/map2.json");
  }

  create() {
    this.textInstructions = this.add.text(200, 100, "Lily's Adventure", {
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
    //   "src/assets/images/princess.png",
    //   "src/assets/images/princess_atlas.json"
    // );
    // this.add.animation("princess_anim", "src/assets/images/princess_anim.json");

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
