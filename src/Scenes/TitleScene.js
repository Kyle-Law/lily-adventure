import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import Player from '../Classes/Player';
import Resource from '../Classes/Resource';
import Enemy from '../Classes/Enemy';
import blueButton1 from '../assets/ui/blue_button02.png';
import blueButton2 from '../assets/ui/blue_button03.png';
import phaserLogo from '../assets/logo.png';
import box from '../assets/ui/grey_box.png';
import checkedBox from '../assets/ui/blue_boxCheckmark.png';
import upKey from '../assets/guide/KeyboardButtonsDir_up.png';
import downKey from '../assets/guide/KeyboardButtonsDir_down.png';
import leftKey from '../assets/guide/KeyboardButtonsDir_left.png';
import rightKey from '../assets/guide/KeyboardButtonsDir_right.png';
import spaceKey from '../assets/guide/OnscreenKeyboardButtonsSpace.png';
import bgMusic from '../assets/Towntheme.mp3';
import tiles from '../assets/images/IceTileset-extruded.png';
import map from '../assets/images/map2.json';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
    // load assets needed in our game
    this.load.image('blueButton1', blueButton1);
    this.load.image('blueButton2', blueButton2);
    this.load.image('phaserLogo', phaserLogo);
    this.load.image('box', box);
    this.load.image('checkedBox', checkedBox);
    this.load.image('upKey', upKey);
    this.load.image('downKey', downKey);
    this.load.image('leftKey', leftKey);
    this.load.image('rightKey', rightKey);
    this.load.image('spaceKey', spaceKey);
    this.load.audio('bgMusic', [bgMusic]);
    Player.preload(this);
    Enemy.preload(this);
    Resource.preload(this);
    this.load.image('tiles', tiles);
    this.load.tilemapTiledJSON('map', map);
  }

  create() {
    this.textInstructions = this.add.text(200, 100, "Lily's Adventure", {
      fontSize: 40,
    });

    this.player = new Player({
      scene: this,
      x: 380,
      y: 90,
      texture: 'princess',
      frame: 'princess_idle_1',
    });
    this.player.setScale(2);
    this.player.anims.play('princess_walk', true);

    // Game
    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 100,
      'blueButton1',
      'blueButton2',
      'Play',
      'Welcome',
    );

    // Options
    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      'blueButton1',
      'blueButton2',
      'Options',
      'Options',
    );

    // Credits
    this.creditsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Credits',
      'Credits',
    );

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
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
        config.height,
      ),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
  }
}
