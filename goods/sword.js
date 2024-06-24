import {elements} from "../elements.js";
import {constants} from "../constants.js";
import {swordImg, swordBackImg} from "../resources.js";
import {mainController} from "../mainController.js";

class Sword {
    #imageWidth
    #imageHeight
    #swordWidth
    #swordHeight
    #index = -1
    attackOrder = 0;


    wantAttack = () => {
        this.attackOrder = 1;
    }

    cancelAttack = () => {
        if (this.attackOrder === 1) {
            this.attackOrder = 0;
        }
    }

    drawFrame = () => {
        this.#imageWidth = swordImg.width;
        this.#imageHeight = swordImg.height;
        this.#swordWidth = this.#imageWidth / 6;
        this.#swordHeight = this.#imageHeight;
        if (this.attackOrder === 1) {
            this.#index++;
            if (mainController.getHero().getFace() === 1) {
                elements.context.drawImage(swordImg, this.#index * this.#swordWidth, 0, this.#swordWidth, this.#swordHeight, 240 + 10, 370 - 20, 50, 50);
                if (this.#index >= 6) {
                    this.#index = -1;
                    this.cancelAttack()
                }
            } else {
                elements.context.drawImage(swordBackImg, this.#index * this.#swordWidth, 0, this.#swordWidth, this.#swordHeight, 240 - 50, 370 - 20, 50, 50);
                if (this.#index >= 6) {
                    this.#index = -1;
                    this.cancelAttack()
                }
            }
        }
        this.attack()
    }

    attack = () => {
        if (this.attackOrder === 1) {
            for(let i = 0;i < mainController.numOfSlime;i++){
                let heroToSlime = this.swordAttackRangeCheck(mainController.getHero().x, mainController.slime[i].x,mainController.getHero().y,mainController.slime[i].y,mainController.getHero().getFace())
                if (heroToSlime !== 0){
                    mainController.slime[i].getHurt(heroToSlime);
                }
            }
            if (this.swordAttackRangeCheck(mainController.getHero().x, mainController.getGhost().x, mainController.getHero().y, mainController.getGhost().y, mainController.getHero().getFace()) !== 0) {
                mainController.getGhost().getHurt();
            }
            
        }
    }
    /**
     * 检测长剑攻击范围
     * @param atkerX {int}
     * @param atkedX {int}
     * @param atkerY {int}
     * @param atkedY {int}
     */
    swordAttackRangeCheck = (atkerX, atkedX, atkerY, atkedY, face) => {
        if (atkedX >= atkerX + 10 && atkedX <= atkerX + 60 && atkedY <= atkerY + 20 && atkedY >= atkerY - 40 && face === 1) {
            return 1
        }

        if (atkedX >= atkerX - 60 && atkedX <= atkerX - 10 && atkedY <= atkerY + 20 && atkedY >= atkerY - 40 && face === -1) {
            return -1
        }

        return 0
    }
}

export const sword = new Sword();
