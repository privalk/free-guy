import {mainController} from "../mainController.js";
import {portalImg} from "../resources.js";
import {Goods} from "./Goods.js";

export class Portal extends Goods {
    
   
    constructor(x,y,deliveryToX,deliveryToY) {
        super(20, 20, portalImg);
        this.x = x;
        this.y = y;
        this.deliveryToX=deliveryToX;
        this.deliveryToY=deliveryToY;
    }
    
    deliveryToX;
    deliveryToY;
    move = () => {
        this.checkHero();
        this.delivery();
    }
    delivery = () => {
        if (this.checkHero() && mainController.getHero().getStarOfHero() == 3) {
           
            mainController.getHero().x = this.deliveryToX;
            mainController.getHero().y = this.deliveryToY;
            let checkP ={x:this.deliveryToX,y:this.deliveryToY}
            mainController.getHero().changeCheckPoint(checkP)
            mainController.getHero().setStarOfHero(0);
            mainController.getHero().remainingCubes=10;
            mainController.getHero().drawRemainingCubes();
            mainController.getHero().health=100;
        }
    }

}