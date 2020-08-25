/* eslint no-undef: 0 */
import Resource from "../src/Classes/Resource";
import MatterEntity from "../src/Classes/MatterEntity";

test("Resource is a subclass of Phaser.GameObjects.Sprite", () => {
  expect(Resource).toBeSubclassOf(Phaser.GameObjects.Sprite);
});

test("Resource is a subclass of MatterEntity", () => {
  expect(Resource).toBeSubclassOf(MatterEntity);
});
