/* eslint no-undef: 0 */
import DropItem from "../src/Classes/DropItem";

test("DropItem is a subclass of Phaser.Physics.Matter.Sprite", () => {
  expect(DropItem).toBeSubclassOf(Phaser.Physics.Matter.Sprite);
});
