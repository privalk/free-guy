import { starImg } from "../resources.js";
import { Goods } from "./Goods.js";
import { mainController } from "../mainController.js";

export class Star extends Goods {
    constructor(x, y) {
        super(20, 20, starImg);
        super.x = x;
        super.y = y;
    }



    move = () => {
        this.checkHero();
        this.beGet();
    }

    beGet = () => {
        if (this.checkHero()) {
            mainController.getHero().starPlus();
            delete this.x;
            delete this.y;
        }
    }

}