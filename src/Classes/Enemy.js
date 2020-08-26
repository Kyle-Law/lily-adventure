/* eslint-disable import/extensions */
/* eslint-disable no-lonely-if */
import Phaser from 'phaser';
import MatterEntity from './MatterEntity.js';
import enemyPng from '../assets/images/enemies.png';
import enemyAtlas from '../assets/images/enemies_atlas.json';
import enemyAnim from '../assets/images/enemies_anim.json';
import bearSound from '../assets/audio/bear.mp3';
import wolfSound from '../assets/audio/wolf.mp3';
import entSound from '../assets/audio/ent.mp3';

export default class Enemy extends MatterEntity {
  static preload(scene) {
    scene.load.atlas('enemies', enemyPng, enemyAtlas);
    scene.load.animation('enemies_anim', enemyAnim);
    scene.load.audio('bear', bearSound);
    scene.load.audio('wolf', wolfSound);
    scene.load.audio('ent', entSound);
  }

  constructor(data) {
    const { scene, enemy } = data;
    const drops = [270, 270];
    const health = enemy.properties.find((p) => p.name === 'health').value;
    super({
      scene,
      x: enemy.x,
      y: enemy.y,
      texture: 'enemies',
      frame: `${enemy.name}_idle_1`,
      drops,
      health,
      name: enemy.name,
    });

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const enemyCollider = Bodies.circle(this.x, this.y, 12, {
      isSensor: false,
      label: 'enemyCollider',
    });
    const enemySensor = Bodies.circle(this.x, this.y, 80, {
      isSensor: true,
      label: 'enemySensor',
    });
    const compoundBody = Body.create({
      parts: [enemyCollider, enemySensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
    this.scene.matterCollision.addOnCollideStart({
      objectA: [enemySensor],
      callback: (other) => {
        if (
          other.gameObjectB
          && other.gameObjectB.name === 'player'
          && !other.gameObjectB.dead
        ) this.attacking = other.gameObjectB;
      },
      context: this.scene,
    });
  }

  attack(target) {
    if (this.dead) {
      clearInterval(this.attackTimer);
      return;
    }

    if (target.dead) {
      clearInterval(this.attackTimer);
      this.attacking = false;
      return;
    }
    target.hit();
  }

  update() {
    if (this.dead) return;
    if (this.attacking) {
      if (this.attacking.dead) return;
      const direction = this.attacking.position.subtract(this.position);
      if (direction.length() > 24) {
        direction.normalize();
        this.setVelocityX(direction.x);
        this.setVelocityY(direction.y);
        // If player runs away
        if (this.attackTimer) {
          clearInterval(this.attackTimer);
          this.attackTimer = null;
        }
      } else {
        // If close enough to attack the player
        if (this.attackTimer == null) {
          this.attackTimer = setInterval(this.attack, 500, this.attacking);
        }
      }
      // Set enemy's direction
      this.setFlipX(this.velocity.x < 0);
      if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
        this.anims.play(`${this.name}_walk`, true);
      } else {
        this.anims.play(`${this.name}_idle`, true);
      }
    }
  }
}
