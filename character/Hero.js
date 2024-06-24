import {Character} from "./Character.js";
import {constants} from "../constants.js";
import {heroBackImg, heroImg, soilImg} from "../resources.js";
import {elements} from "../elements.js";
import {mainController} from "../mainController.js";
import { starImg } from "../resources.js";

export class Hero extends Character {
    remainingCubes = 10
    checkPoint = {x:30, y:3300}

    constructor() {
        super(30, 20, constants.g, heroImg, heroBackImg);
        super.health = 10000;
        this.y = this.checkPoint.y
        this.x = this.checkPoint.x
    }

    changeCheckPoint = (checkP)=>{
        this.checkPoint = checkP
    }
    move = () => {
        this.clearOccupy()
        this.calcCrossSpeed()
        this.calcParallelSpeed()
        let expectDisplacement = this.calcExpectDisplacement()
        this.calcActualPosition(expectDisplacement)
        this.occupyCubes()
        //攻击
        this.attack();
        //画星星
        this.drawStar();
    }
    die = () => {
        console.log("die");
        elements.backGroundContext.save();
        elements.backGroundContext.textAlign = 'center';
        elements.backGroundContext.textBaseline = 'middle';
        elements.backGroundContext.font = 'bolder 5em Arial';
        elements.backGroundContext.fillStyle = 'red';
        elements.backGroundContext.fillText("YOU DIED", elements.backGroundCanvas.width / 2, elements.backGroundCanvas.height / 2);
        elements.backGroundContext.textBaseline = 'middle';
        elements.backGroundContext.font = 'bolder 1em Arial';
        elements.backGroundContext.fillStyle = 'black';
        elements.backGroundContext.fillText("Press \"R\" To Restart This Game", elements.backGroundCanvas.width / 2, elements.backGroundCanvas.height / 2 + 50);
        elements.backGroundContext.restore();

        mainController.clearTimer();
    }

    win = () => {
        console.log("win");
        elements.backGroundContext.save();
        elements.backGroundContext.textAlign = 'center';
        elements.backGroundContext.textBaseline = 'middle';
        elements.backGroundContext.font = 'bolder 5em Arial';
        elements.backGroundContext.fillStyle = 'blue';
        elements.backGroundContext.fillText("YOU WIN", elements.backGroundCanvas.width / 2, elements.backGroundCanvas.height / 2);
        elements.backGroundContext.restore();

        mainController.clearTimer();
    }

    drawHealth = () => {
        elements.dataContext.clearRect(0, 0, 250, 100)
        elements.dataContext.save();
        elements.dataContext.font = 'bolder 2em Arial';
        elements.dataContext.fillText("health:" + this.health, 15, 40);
        elements.dataContext.restore();
    }

    getHurt = (dir) => {
        if (this.health > 0) {
            this.health -= 1;
            this.drawHealth()
            //击退
            this.xv = 500 * dir;
            this.isHurtX = true
            this.isHurtY = true
        } else if (this.health === 0) {
            this.drawHealth()
            this.die();
        }
    }

    drawRemainingCubes = () => {
        elements.dataContext.clearRect(400, 0, 100, 100)
        elements.dataContext.drawImage(soilImg, 0, 0, 10, 10, 385, 15, 30, 30);
        elements.dataContext.save();
        elements.dataContext.font = 'bolder 2em Arial'
        elements.dataContext.fillText("x " + this.remainingCubes, 425,40)
        elements.dataContext.restore();
    }

    cubeReduce = () => {
        this.remainingCubes--
        this.drawRemainingCubes()
    }

    cubeAdd = () => {
        this.remainingCubes++
        this.drawRemainingCubes()
    }

    attack = ()=>{

    }

    //星星相关
    drawStarX = [400, 430, 460]
    drawStarY = [50, 50, 50]
    starOfHero = 0
    getStarOfHero = () => {
        return this.starOfHero;
    }
    setStarOfHero = (starOfHero) => {
        this.starOfHero = starOfHero;
    }
    drawStar = () => {
        for (let i = 0; i < this.starOfHero; i++) {
            elements.context.drawImage(starImg, this.drawStarX[i], this.drawStarY[i]);
        }
    }
    starPlus=()=>{
        this.starOfHero++;
    }
}