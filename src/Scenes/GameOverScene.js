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
    // console.log(user);

    // console.log(this.sys.game.globals.model.score);
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

    this.menuButton = new Button(
      this,
      400,
      500,
      "blueButton1",
      "blueButton2",
      "Restart",
      "Welcome"
    );

    const style =
      "background: url(assets/ui/blue_button02.png); border: none; border-radius: 5px; color: #fff;";
    const gameButton = this.add.dom(590, 412, "button", style, "Play");
    gameButton.scaleX = 1.5;
    gameButton.scaleY = 1.7;
    gameButton.addListener("click");

    gameButton.on("click", () => {
      this.model = this.sys.game.globals.model;
      this.model.score = 0;
      const mainScene = this.scene.get("Main");
      mainScene.scene.restart();
    });
  }
}
