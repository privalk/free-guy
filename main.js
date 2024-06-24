import {terrariaMap} from "./backgroundAndMap/terrariaMap.js";
import {elements} from "./elements.js";
import {mainController} from "./mainController.js";
import {load} from "./resources.js";
import {handler} from "./handler.js";
import {showStart} from "./backgroundAndMap/showStart.js";

async function main() {
    elements.startCanvas.onclick = handler.clickToStart;
    await load()
    await terrariaMap.mapInit()
    mainController.creatHero()
    await mainController.init()
    elements.characterDataCanvas.onclick = handler.mouseCreatEventHandler;
    elements.characterDataCanvas.ondblclick = handler.mouseDeleteEventHandler;
    window.onkeydown = handler.keyFlagChangeTo1;
    window.onkeyup = handler.keyFlagChangeTo0;
    showStart.Run();
}

main();
