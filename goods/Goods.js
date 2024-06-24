import { elements } from "../elements.js";
import { mainController } from "../mainController.js";
import { terrariaMap } from "../backgroundAndMap/terrariaMap.js";
export class Goods {
    constructor(width, height, img) {
        this.img = img;
        this.height = height;
        this.width = width;
    }
    x
    y
    img
    width
    height
    
    move = () => {
        this.checkHero();
    }
    drawFrame = () => {
        elements.context.drawImage(this.img, this.x - (mainController.getHero().x - 240), this.y - (mainController.getHero().y - 370));
    }
    checkHero = () => {

        if ((this.x + this.width - mainController.getHero().x) >= 0 && this.x < mainController.getHero().x && (Math.abs(this.y - mainController.getHero().y) <= 15)) {
            return true;

        }
        else if ((this.x - (mainController.getHero().x + mainController.getHero().width)) <= 0 && this.x > mainController.getHero().x && (Math.abs(this.y - mainController.getHero().y) <= 15)) {
            return true;
        }

    }
}