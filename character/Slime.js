import {Character} from "./Character.js";
import {elements} from "../elements.js";
import {constants} from "../constants.js";
import {terrariaMap} from "../backgroundAndMap/terrariaMap.js";
import {slimeImg} from "../resources.js";
import {mainController} from "../mainController.js";

export class Slime extends Character {

    constructor(x, y) {
        super(20, 20, 980, slimeImg, slimeImg);
        this.x = x;
        this.y = y;
        this.parallelOrder = 1;
        this.parallelVLimit = 100
    }

    parallelMove = ()=>{

    }

    cancelParallelMove = ()=>{

    }

    onCrash() {
        this.xv = 0;
        this.parallelOrder = -this.parallelOrder
    }

    #checkHero = ()=>{
        if ((this.x - mainController.getHero().x < -20 || this.x - mainController.getHero().x > 20) && this.parallelOrder * (mainController.getHero().x + 10 - this.x) > 0) {
            this.parallelVLimit = 150;
            return
        }
        this.parallelVLimit = 100
    }

    #calcActualPosition = (expectDisplacement) => {
        // console.log(expectDisplacement)
        // 计算横向真实位置
        this.calcActualX(expectDisplacement.x)
        // 计算纵向真实位置
        this.calcActualY(expectDisplacement.y)
    }

    #calcParallelSpeed = () => {
        // this.xv = this.parallelOrder * this.parallelV
        if (!this.isHurtX){
            if (Math.abs(this.xv) < this.parallelVLimit) {
                this.xv += this.parallelOrder * this.parallelAcceleration
            } else if (this.xv > 0) {
                this.xv = this.parallelVLimit
            } else if (this.xv < 0) {
                this.xv = -this.parallelVLimit
            }
        }else if (Math.abs(this.xv) < this.parallelVLimit){
            this.isHurtX = false;
        }

        if (this.parallelOrder * this.xv <= 0 || this.isHurtX) {
            if (this.xv > 0){
                this.xv -= this.parallelAcceleration
                return;
            }
            if(this.xv < 0){
                this.xv += this.parallelAcceleration
            }
        }
    }

    jump = ()=>{

    }

    move = () => {
        // console.log(this.parallelOrder)
        this.clearOccupy()
        this.#checkHero()
        this.calcCrossSpeed()
        this.#calcParallelSpeed()
        let expectDisplacement = this.calcExpectDisplacement()
        this.#calcActualPosition(expectDisplacement)
        this.occupyCubes()
        //攻击
        this.attack();
    }

    getHurt = (dir) => {
        //击退
        this.parallelOrder = -this.parallelOrder
        this.xv = 500 * dir;
        this.isHurtX = true
        this.isHurtY = true
    }

    die=()=>{
        
    }
}