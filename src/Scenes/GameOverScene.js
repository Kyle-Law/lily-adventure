import Phaser from "phaser";
import Button from "../Objects/Button";
import Player from "../Classes/Player";
import config from "../Config/config";
import API from '../Objects/API';
import LocalStorage from "../Objects/localStorage";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init() {
    this.model = this.sys.game.globals.model;
    this.gameScene = this.scene.get("Main");
    this.gameScene.registry.destroy(); // destroy registry
    this.gameScene.events.off();// disable all active events
    // this.gameScene.scene.restart();// restart current scene
  }

  preload() {
    this.load.image("gameOverTitle", "assets/ui/blue_button02.png");
    API
  }

  create() {
    this.sys.game.globals.bgMusic.stop();
    const user = this.sys.game.globals.model.userName;

    const score = localStorage.getItem("score");
    localStorage.clear();
    API.postScores(user, score);

    this.scoreText = this.add.text(
      200,
      250,
      `Hello ${user}, your score is: ${score}`,
      {
        fontFamily: "monospace",
        fontSize: 20,
        fontStyle: "bold",
        color: "#ffffff",
        align: "center",
      }
    );
    this.player = new Player({
      scene: this,
      x: 380,
      y: 200,
      texture: "princess",
      frame: "princess_idle_1",
    });
    this.player.setTexture("items", 0);
    this.player.setScale(2);

    this.submitButton = new Button(
      this,
      300,
      config.height / 2 + 100,
      "blueButton1",
      "blueButton2",
      "Scores",
      "LeaderBoard"
    );

    // this.replayButton = new Button(
    //   this,
    //   500,
    //   400,
    //   "blueButton1",
    //   "blueButton2",
    //   "Menu",
    //   "Title"
    // );

    const style =
      "background: url(assets/ui/blue_button02.png); cursor:pointer; color: #fff;";
    const menu = this.add.dom(500, 400, "button", style, "Menu");
    menu.scaleX =4;
    menu.scaleY = 2;
    menu.addListener("click");

    menu.on("click", () => {
      history.go()
    });
  }
}
