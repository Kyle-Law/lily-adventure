import Phaser from "phaser";
import config from "./Config/config";
import GameScene from "./Scenes/GameScene";
import BootScene from "./Scenes/BootScene";
import PreloaderScene from "./Scenes/PreloaderScene";
import WelcomeScene from "./Scenes/WelcomeScene";
import TitleScene from "./Scenes/TitleScene";
import OptionsScene from "./Scenes/OptionsScene";
import GameOverScene from "./Scenes/GameOverScene";
import CreditsScene from "./Scenes/CreditsScene";
import MainScene from "./Scenes/MainScene";
import Model from "./Classes/Model";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add("Boot", BootScene);
    this.scene.add("Preloader", PreloaderScene);
    this.scene.add("Welcome", WelcomeScene);
    this.scene.add("Title", TitleScene);
    this.scene.add("Options", OptionsScene);
    this.scene.add("GameOver", GameOverScene);
    this.scene.add("Credits", CreditsScene);
    this.scene.add("Game", GameScene);
    this.scene.add("Main", MainScene);
    this.scene.start("Boot");
  }
}

window.game = new Game();
