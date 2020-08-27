/* eslint-disable camelcase */
/* eslint-disable no-restricted-globals */
import Phaser from 'phaser';
import Player from '../Classes/Player';
import API from '../Objects/API';
import blue_button02 from '../assets/ui/blue_button02.png';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  init() {
    this.model = this.sys.game.globals.model;
    this.gameScene = this.scene.get('Main');
    this.gameScene.registry.destroy(); // destroy registry
    this.gameScene.events.off(); // disable all active events
  }

  preload() {
    this.load.image('gameOverTitle', 'src/assets/ui/blue_button02.png');
  }

  create() {
    this.sys.game.globals.bgMusic.stop();
    const user = this.sys.game.globals.model.userName;

    const score = localStorage.getItem('score');
    localStorage.clear();
    API.postScores(user, score);

    this.scoreText = this.add.text(
      200,
      250,
      `Hello ${user}, your score is: ${score}`,
      {
        fontFamily: 'monospace',
        fontSize: 20,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      },
    );
    this.player = new Player({
      scene: this,
      x: 380,
      y: 200,
      texture: 'princess',
      frame: 'princess_idle_1',
    });
    this.player.setTexture('items', 0);
    this.player.setScale(2);

    // this.submitButton = new Button(
    //   this,
    //   300,
    //   config.height / 2 + 100,
    //   'blueButton1',
    //   'blueButton2',
    //   'Scores',
    //   'LeaderBoard',
    // );

    const style = `background: url(${blue_button02}); cursor:pointer; color: #fff;`;
    const leaderBoard = this.add.dom(270, 400, 'button', style, 'Scores');
    leaderBoard.scaleX = 3.5;
    leaderBoard.scaleY = 2;
    leaderBoard.addListener('click');

    leaderBoard.on('click', () => {
      this.scene.start('LeaderBoard');
    });

    const menu = this.add.dom(520, 400, 'button', style, 'Menu');
    menu.scaleX = 4;
    menu.scaleY = 2;
    menu.addListener('click');

    menu.on('click', () => {
      history.go();
    });
  }
}
