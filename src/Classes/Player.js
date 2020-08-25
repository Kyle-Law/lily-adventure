/* eslint-disable import/extensions */
import Phaser from 'phaser';
import MatterEntity from './MatterEntity.js';

export default class Player extends MatterEntity {
  constructor(data) {
    super({
      ...data,
      health: 2,
      drops: [],
      name: 'player',
    });
    this.touching = [];
    // Weapon
    this.spriteWeapon = new Phaser.GameObjects.Sprite(
      this.scene,
      0,
      0,
      'items',
      163,
    );
    this.spriteWeapon.setScale(0.8);
    this.spriteWeapon.setOrigin(0.25, 0.75);
    this.scene.add.existing(this.spriteWeapon);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;

    const playerCollider = Bodies.circle(this.x, this.y, 12, {
      isSensor: false,
      label: 'playerCollider',
    });
    const playerSensor = Bodies.circle(this.x, this.y, 24, {
      isSensor: true,
      label: 'playerSensor',
    });
    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
    this.CreateMiningCollisions(playerSensor);
    this.CreatePickupCollisions(playerCollider);
  }

  static preload(scene) {
    scene.load.atlas(
      'princess',
      'assets/images/princess.png',
      'assets/images/princess_atlas.json',
    );
    scene.load.animation('princess_anim', 'assets/images/princess_anim.json');
    scene.load.spritesheet('items', 'assets/images/weapons.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    scene.load.audio('player', 'assets/audio/player.mp3');
    scene.load.audio('die', 'assets/audio/die.mp3');
  }

  onDeath() {
    // this.sys.game.globals.bgMusic.stop();
    // this.model = this.sys.game.globals.model;
    const music = this.scene.sound.add('die');
    music.play();
    // this.destroy()
    // this.anims.stop();
    // this.setTexture("items", 0);
    // this.setOrigin(0.5);
    // this.spriteWeapon.destroy();
    // this.scene.scene.restart();

    this.scene.scene.start('GameOver');
  }

  update() {
    if (this.dead) return;
    const speed = 2.5;
    const playerVelocity = new Phaser.Math.Vector2();
    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
      this.setFlipX(true);
    } else if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
      this.setFlipX(false);
    }

    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
    }
    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);

    if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
      this.anims.play('princess_walk', true);
    } else {
      this.anims.play('princess_idle', true);
    }
    this.spriteWeapon.setPosition(this.x, this.y);
    this.weaponRotate();
  }

  weaponRotate() {
    const { space } = this.inputKeys;
    if (space.isDown) {
      this.weaponRotation += 6;
    } else {
      this.weaponRotation = 0;
    }
    if (this.weaponRotation > 100) {
      this.whackStuff();
      this.weaponRotation = 0;
    }

    if (this.flipX) {
      this.spriteWeapon.setAngle(-this.weaponRotation - 90);
    } else {
      this.spriteWeapon.setAngle(this.weaponRotation);
    }
  }

  CreateMiningCollisions(playerSensor) {
    this.scene.matterCollision.addOnCollideStart({
      objectA: [playerSensor],
      callback: (other) => {
        if (other.bodyB.isSensor) return;
        this.touching.push(other.gameObjectB);
      },
      context: this.scene,
    });

    this.scene.matterCollision.addOnCollideEnd({
      objectA: [playerSensor],
      callback: (other) => {
        this.touching = this.touching.filter(
          (gameObject) => gameObject !== other.gameObjectB,
        );
      },
      context: this.scene,
    });
  }

  CreatePickupCollisions(playerCollider) {
    this.scene.matterCollision.addOnCollideStart({
      objectA: [playerCollider],
      callback: (other) => {
        if (other.gameObjectB && other.gameObjectB.pickup) {
          other.gameObjectB.pickup();
        }
      },
      context: this.scene,
    });

    this.scene.matterCollision.addOnCollideActive({
      objectA: [playerCollider],
      callback: (other) => {
        if (other.gameObjectB && other.gameObjectB.pickup) {
          other.gameObjectB.pickup();
        }
      },
      context: this.scene,
    });
  }

  whackStuff() {
    this.touching = this.touching.filter(
      (gameObject) => gameObject.hit && !gameObject.dead,
    );
    this.touching.forEach((gameobject) => {
      gameobject.hit();
      if (gameobject.dead) gameobject.destroy();
    });
  }
}
