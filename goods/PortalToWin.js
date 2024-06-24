import { mainController } from "../mainController.js";
import { portalImg } from "../resources.js";
import { Goods } from "./Goods.js";

export class PortalToWin extends Goods {
    constructor(x, y) {
        super(20, 20, portalImg);
        super.x = x;
        super.y = y;
    }
    move = () => {
        this.checkHero();
    }
    checkHero = () => {
        if ((this.x + this.width - mainController.getHero().x) >= 0 && this.x < mainController.getHero().x && (Math.abs(this.y - mainController.getHero().y) <= 30) && mainController.getHero().getStarOfHero() === 3) {
            mainController.getHero().win();

        }
        else if ((this.x- (mainController.getHero().x + mainController.getHero().width)) <= 0 && this.x > mainController.getHero().x && (Math.abs(this.y - mainController.getHero().y) <= 30) && mainController.getHero().getStarOfHero() === 3) {
            mainController.getHero().win();
        }
    }

}