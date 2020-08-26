/* eslint-disable import/extensions */
import Phaser from 'phaser';
import MatterEntity from './MatterEntity.js';
import treeSound from '../assets/audio/tree.mp3';
import rockSound from '../assets/audio/rock.mp3';
import bushSound from '../assets/audio/bush.mp3';
import pickupSound from '../assets/audio/pickup.mp3';
import resourcePng from '../assets/images/resources1.png';
import resourceAtlas from '../assets/images/resources1_atlas.json';

export default class Resource extends MatterEntity {
  static preload(scene) {
    scene.load.atlas('resources', resourcePng, resourceAtlas);
    scene.load.audio('tree', treeSound);
    scene.load.audio('rock', rockSound);
    scene.load.audio('bush', bushSound);
    scene.load.audio('pickup', pickupSound);
  }

  constructor(data) {
    const { scene, resource } = data;
    const drops = JSON.parse(
      resource.properties.find((p) => p.name === 'drops').value,
    );
    const depth = resource.properties.find((p) => p.name === 'depth').value;
    super({
      scene,
      x: resource.x,
      y: resource.y,
      texture: 'resources',
      frame: resource.type,
      drops,
      depth,
      health: 5,
      name: resource.type,
    });
    const yOrigin = resource.properties.find((p) => p.name === 'yOrigin').value;
    this.y += this.height * (yOrigin - 0.5);
    const { Bodies } = Phaser.Physics.Matter.Matter;
    const circleCollider = Bodies.circle(this.x, this.y, 12, {
      isSensor: false,
      label: 'collider',
    });
    this.setExistingBody(circleCollider);
    this.setStatic(true);
    this.setOrigin(0.5, yOrigin);
  }
}
