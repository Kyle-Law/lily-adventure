import Phaser from 'phaser';
import config from './Config/config';
import BootScene from './Scenes/BootScene';
import WelcomeScene from './Scenes/WelcomeScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import GameOverScene from './Scenes/GameOverScene';
import LeaderBoardScene from './Scenes/LeaderBoardScene';
import CreditsScene from './Scenes/CreditsScene';
import MainScene from './Scenes/MainScene';
import Model from './Classes/Model';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Welcome', WelcomeScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('LeaderBoard', LeaderBoardScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Main', MainScene);
    this.scene.start('Title');
  }
}

window.game = new Game();
