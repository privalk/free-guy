import {getMousePosition} from "./utils.js";
import {terrariaMap} from "./backgroundAndMap/terrariaMap.js";
import {mainController} from "./mainController.js";
import {sword} from "./goods/sword.js";
import {elements} from "./elements.js";

function check(event) {
    console.log(1)
}

function clickToStart(){
    elements.startCanvas.hidden= true;
    mainController.getHero().drawHealth();
    mainController.getHero().drawRemainingCubes();
    mainController.mainRun();
}
function mouseCreatEventHandler(event) {
    let pos = getMousePosition(event);
    let realPos = {
        x: Math.floor((pos.x - 240 + mainController.getHero().x) / 10),
        y: Math.floor((pos.y + mainController.getHero().y - 370) / 10)
    }
    terrariaMap.calculationDelta(realPos)
    terrariaMap.creat(realPos);
}

function mouseDeleteEventHandler(event) {
    let pos = getMousePosition(event);
    let realPos = {
        x: Math.floor((pos.x - 240 + mainController.getHero().x) / 10),
        y: Math.floor((pos.y + mainController.getHero().y - 370) / 10)
    }
    terrariaMap.calculationDelta(realPos)
    terrariaMap.delete(realPos);
}

/**
 *
 * @param event {KeyboardEvent}
 */
function keyFlagChangeTo1(event) {
    let code = event.keyCode
    if (code === 65 || code === 37) {
        mainController.getHero().parallelMove(-1)
    } else if (code === 68 || code === 39) {
        mainController.getHero().parallelMove(1)
    } else if (code === 32) {
        mainController.getHero().jump()
    } else if (code === 82) {
        mainController.init() 
    }

    //挥剑
    if (code === 86) {
        sword.wantAttack()
    }
}

/**
 *
 * @param event {KeyboardEvent}
 */
function keyFlagChangeTo0(event) {
    let code = event.keyCode
    if (code === 65 || code === 37) {
        mainController.getHero().cancelParallelMove(-1)
    } else if (code === 68 || code === 39) {
        mainController.getHero().cancelParallelMove(1)
    } else if (code === 32) {
        mainController.getHero().cancelJump()
    }
}

export const handler = {
    clickToStart,
    check,
    mouseCreatEventHandler,
    mouseDeleteEventHandler,
    keyFlagChangeTo1,
    keyFlagChangeTo0,
}