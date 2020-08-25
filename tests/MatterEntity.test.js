/* eslint no-undef: 0 */
import MatterEntity from "../src/Classes/MatterEntity";

test("MatterEntity is a subclass of Phaser.Physics.Matter.Sprite", () => {
  expect(MatterEntity).toBeSubclassOf(Phaser.Physics.Matter.Sprite);
});
