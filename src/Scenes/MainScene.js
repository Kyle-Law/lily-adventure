import Phaser from 'phaser';
import Player from '../Classes/Player';
import Resource from '../Classes/Resource';
import Enemy from '../Classes/Enemy';
import LocalStorage from '../Objects/LocalStorage';
import tiles from '../assets/images/IceTileset-extruded.png';
import map from '../assets/images/map2.json';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('Main');
    this.enemies = [];
  }

  preload() {
    Player.preload(this);
    Enemy.preload(this);
    Resource.preload(this);
    this.load.image('tiles', tiles);
    this.load.tilemapTiledJSON('map', map);
  }

  create() {
    localStorage.setItem('score', 0);
    const map = this.make.tilemap({ key: 'map' });
    this.map = map;
    const tileset = map.addTilesetImage('IceTileset', 'tiles', 32, 32, 1, 2);
    const layer1 = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
    layer1.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer1);

    this.map
      .getObjectLayer('Resources')
      .objects.forEach((resource) => new Resource({ scene: this, resource }));
    this.map
      .getObjectLayer('Enemies')
      .objects.forEach((enemy) => this.enemies.push(new Enemy({ scene: this, enemy })));

    this.player = new Player({
      scene: this,
      x: 350,
      y: 220,
      texture: 'princess',
      frame: 'princess_idle_1',
    });
    // this.player.health = 2
    // this.player.dead = false

    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });
    const camera = this.cameras.main;
    camera.zoom = 2;
    camera.startFollow(this.player);
    camera.setLerp(0.1, 0.1);
    camera.setBounds(0, 0, this.game.config.width, this.game.config.height);

    this.scoreText = this.add
      .text(200, 150, `Score: ${LocalStorage.readLocalStorage()}`, {
        fontSize: '20px',
        fill: '#000',
      })
      .setScrollFactor(0)
      .setDepth(100);
  }

  update() {
    this.player.update();
    this.enemies.forEach((enemy) => enemy.update());
    this.scoreText.setText(`Score: ${LocalStorage.readLocalStorage()}`);
  }
}
