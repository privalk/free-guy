import {Character} from "./Character.js";
import {elements} from "../elements.js";
import {constants} from "../constants.js";
import {terrariaMap} from "../backgroundAndMap/terrariaMap.js";
import {mainController} from "../mainController.js";
import {thornImg} from "../resources.js";

export class Thorn extends Character {
    direction = 1;

    constructor(x,y) {
        super(10,20,0,thornImg,thornImg);
        this.x = x
        this.y = y
    }

    move = ()=>{
        this.attack()
    }

    attack = () => {
        if ((this.x + this.width - mainController.getHero().x) >= 0 && this.x < mainController.getHero().x && (Math.abs(this.y - (mainController.getHero().y+20)) <= 10)) {
            mainController.getHero().getHurt(1)
        }else if ((this.x - (mainController.getHero().x + mainController.getHero().width)) <= 0 && this.x > mainController.getHero().x && (Math.abs(this.y -(mainController.getHero().y+20)) <= 10)){
            mainController.getHero().getHurt(-1);
        }
    }

    drawFrame = (x,y)=>{
        terrariaMap.realContext.drawImage(this.img, x, y)
    }

}