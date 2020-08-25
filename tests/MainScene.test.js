/* eslint no-undef: 0 */
import MainScene from "../src/Scenes/MainScene";

test("MainScene is a subclass of Phaser.Scene", () => {
  expect(MainScene).toBeSubclassOf(Phaser.Scene);
});
