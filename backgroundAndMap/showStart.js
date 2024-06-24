import { terrariaMap } from "./terrariaMap.js";
import { elements } from "../elements.js";
import { mainController } from "../mainController.js";
import { backGroundImg, titleImg } from "../resources.js";
import { handler } from "../handler.js";
import { constants } from "../constants.js";

class ShowStart {
    #timer;
    #x = 0;
    Run = () => {
        this.drawBackGround();

    }

    drawBackGround = () => {
        clearInterval(this.#timer);
        this.#timer = setInterval(() => {
            this.#x-=0.1;
            elements.startContext.drawImage(backGroundImg, this.#x, 0);
            elements.startContext.drawImage(titleImg, 0, 0);
            mainController.getHero().drawStartFrame(250, 300);
            mainController.getGhost().drawStartFrame(50, 120);
            if(this.#x<-backGroundImg.width+500){
                clearInterval(this.#timer);
            }
        }, constants.FRAME_TIME * 1000)
    }
}
export const showStart = new ShowStart();