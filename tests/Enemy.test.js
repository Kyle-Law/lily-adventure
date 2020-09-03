/* eslint no-undef: 0 */
import Enemy from '../src/Classes/Enemy';
import MatterEntity from '../src/Classes/MatterEntity';

test('Enemy is a subclass of Phaser.GameObjects.Sprite', () => {
  expect(Enemy).toBeSubclassOf(Phaser.GameObjects.Sprite);
});

test('Enemy is a subclass of MatterEntity', () => {
  expect(Enemy).toBeSubclassOf(MatterEntity);
});
