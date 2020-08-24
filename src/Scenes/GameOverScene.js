import Phaser from "phaser";
import Button from "../Objects/Button";
import config from "../Config/config";
import { postScore } from "../Objects/API";
import LocalStorage from "../Objects/localStorage";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init() {
    this.model = this.sys.game.globals.model;
    this.gameScene = this.scene.get("Game");
  }

  preload() {
    this.load.image("gameOverTitle", "assets/ui/blue_button02.png");
  }

  create() {
    const user = this.sys.game.globals.model.userName;

    const score = localStorage.getItem("store");
    localStorage.clear();

    this.score = this.add.text(
      230,
      30,
      `Hello ${user}, your score is: ${score}`,
      {
        fontFamily: "monospace",
        fontSize: 20,
        fontStyle: "bold",
        color: "#ffffff",
        align: "center",
      }
    );

    // postScore(this.model.userName, this.model.score);

    this.gameButton = new Button(
      this,
      400,
      config.height / 2 + 170,
      "blueButton1",
      "blueButton2",
      "Submit",
      "LeaderBoard"
    );
  }
}
