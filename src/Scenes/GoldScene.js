import Phaser from 'phaser';

export default class GoldScene extends Phaser.Scene {
  constructor() {
    super('Gold');
  }

  init() {
    this.gameScene = this.scene.get('Main');
    this.model = this.sys.game.globals.model;
  }

  create() {
    this.setupGoldElements();
    this.setupEvents();
  }

  setupGoldElements() {
    this.GoldIcon = this.add.image(15, 15, 'items', 272);
    this.scoreText = this.add.text(35, 8, 'Golds: 0', {
      fontSize: '16px',
      fill: '#fff',
    });
  }

  setupEvents() {
    this.gameScene.events.on('updateScore', (score) => {
      this.scoreText.setText(`Golds: ${score}`);
      this.sys.game.globals.model.score = score;
    });
  }
}
