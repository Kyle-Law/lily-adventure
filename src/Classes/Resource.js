/* eslint-disable import/extensions */
import Phaser from "phaser";
import MatterEntity from "./MatterEntity.js";

export default class Resource extends MatterEntity {
  static preload(scene) {
    scene.load.atlas(
      "resources",
      "src/assets/images/resources1.png",
      "src/assets/images/resources1_atlas.json"
    );
    scene.load.audio("tree", "src/assets/audio/tree.mp3");
    scene.load.audio("rock", "src/assets/audio/rock.mp3");
    scene.load.audio("bush", "src/assets/audio/bush.mp3");
    scene.load.audio("pickup", "src/assets/audio/pickup.mp3");
  }

  constructor(data) {
    const { scene, resource } = data;
    const drops = JSON.parse(
      resource.properties.find((p) => p.name === "drops").value
    );
    const depth = resource.properties.find((p) => p.name === "depth").value;
    super({
      scene,
      x: resource.x,
      y: resource.y,
      texture: "resources",
      frame: resource.type,
      drops,
      depth,
      health: 5,
      name: resource.type,
    });
    const yOrigin = resource.properties.find((p) => p.name === "yOrigin").value;
    this.y += this.height * (yOrigin - 0.5);
    const { Bodies } = Phaser.Physics.Matter.Matter;
    const circleCollider = Bodies.circle(this.x, this.y, 12, {
      isSensor: false,
      label: "collider",
    });
    this.setExistingBody(circleCollider);
    this.setStatic(true);
    this.setOrigin(0.5, yOrigin);
  }
}
