import {mountainImg} from "../resources.js";
import {elements} from "../elements.js";
import {constants} from "../constants.js";
import {mainController} from "../mainController.js";

class MountainController {

    drawMountain = ()=>{
        elements.mountainContext.drawImage(mountainImg, mainController.getHero().x * 2 / 9, 0, 500, 500, 0, 0, 500, 500 )
    }

}

export const mountainController = new MountainController();
