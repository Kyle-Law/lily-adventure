import Phaser from "phaser";
import Button from "../Objects/Button";
import config from "../Config/config";
import { postScores } from "../Objects/API";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver" });
  }

  init() {
    this.model = this.sys.game.globals.model;
    this.gameScene = this.scene.get("Main");
  }

  preload() {
    this.load.image("gameOverTitle", "assets/ui/blue_button02.png");
  }

  create() {
    const user = this.sys.game.globals.model.userName;

    this.score = this.add.text(
      230,
      30,
      `Hello ${user}, your score is: ${this.sys.game.globals.model.score}`,
      {
        fontFamily: "monospace",
        fontSize: 20,
        fontStyle: "bold",
        color: "#ffffff",
        align: "center",
      }
    );

    postScores(this.model.userName, this.model.score);

    this.gameButton = new Button(
      this,
      400,
      config.height / 2 + 170,
      "blueButton1",
      "blueButton2",
      "Submit",
      "Score"
    );
  }
}
