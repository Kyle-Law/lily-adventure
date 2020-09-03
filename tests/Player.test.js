/* eslint no-undef: 0 */
import Player from '../src/Classes/Player';
import MatterEntity from '../src/Classes/MatterEntity';

test('Player is a subclass of Phaser.GameObjects.Sprite', () => {
  expect(Player).toBeSubclassOf(Phaser.GameObjects.Sprite);
});

test('Player is a subclass of MatterEntity', () => {
  expect(Player).toBeSubclassOf(MatterEntity);
});
