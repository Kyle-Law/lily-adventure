/* eslint no-undef: 0 */
import 'phaser';
import Button from '../Objects/Button';
import API from '../Objects/API';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    // this.sys.game.globals.bgMusic.play();
    this.add.text(400, 50, 'Leader Board', {
      color: 'white',
      fontSize: '50px ',
    }).setOrigin(0.5, 0.5);

    API.getScores().then((data) => {
      const { result } = data;

      result.sort((a, b) => b.score - a.score);
      this.add.text(190, 100, 'RANK      NAME                 SCORE',{fontSize:'20px'});
      this.size = result.length < 8 ? result.length : 8;

      let spacing = 100;

      for (let i = 0; i < this.size; i += 1) {
        this.add.text(200, 50 + spacing, (i + 1),{fontSize:'20px'});
        this.add.text(310, 50 + spacing, result[i].user,{fontSize:'20px'});
        this.add.text(560, 50 + spacing, result[i].score,{fontSize:'20px'});

        spacing += 35;
      }
    });

    // this.menuButton = new Button(this, 380, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    const style =
      "background: url(assets/ui/blue_button02.png); cursor:pointer; color: #fff;";
    const menu = this.add.dom(400, 500, "button", style, "Menu").setOrigin(0.5, 0.5);
    menu.scaleX =4;
    menu.scaleY = 2;
    menu.addListener("click");

    menu.on("click", () => {
      history.go()
    });
  }
}