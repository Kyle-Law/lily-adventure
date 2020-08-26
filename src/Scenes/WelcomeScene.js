import Phaser from 'phaser';
import Button from '../Objects/Button';

export default class WelcomeScene extends Phaser.Scene {
  constructor() {
    super('Welcome');
  }

  create() {
    this.textKeys = this.add.text(325, 100, 'Key Controls', { fontSize: 20 });

    this.upKey = new Button(this, 460, 160, 'upKey', 'upKey0');
    this.downKey = new Button(this, 460, 210, 'downKey', 'downKey');
    this.leftKey = new Button(this, 410, 185, 'leftKey', 'leftKey');
    this.rightKey = new Button(this, 510, 185, 'rightKey', 'rightKey');
    this.spaceKey = new Button(this, 310, 185, 'spaceKey', 'spaceKey');

    this.textInstructions = this.add.text(
      210,
      270,
      `Use the direction keys to navigate 
      & the space key to attack`,
      { fontSize: 20 },
    );

    this.menuButton = new Button(
      this,
      400,
      550,
      'blueButton1',
      'blueButton2',
      'Menu',
      'Title',
    );

    this.intro = this.add.text(215, 400, 'Enter your name: ', {
      fontSize: 20,
      fontFamily: 'monospace',
    });

    const input = this.add.dom(480, 410, 'input', {
      type: 'text',
      name: 'nameField',
      fontSize: '32px',
      backgroundColor: '#fff',
    });
    input.scaleX = 0.4;
    input.scaleY = 0.6;

    const style = 'background: url(src/assets/ui/blue_button02.png); cursor:pointer; color:#fff';
    const gameButton = this.add.dom(590, 412, 'button', style, 'Play');
    gameButton.scaleX = 1.5;
    gameButton.scaleY = 1.7;
    gameButton.addListener('click');

    gameButton.on('click', () => {
      // history.go()
      if (input.node.value) {
        this.model = this.sys.game.globals.model;
        this.model.userName = input.node.value;
        this.scene.stop('Main');
        this.scene.start('Main');
      }
    });
  }
}
