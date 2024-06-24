import {Character} from "./Character.js";
import {testImg} from "../resources.js";
import {mainController} from "../mainController.js";
import {constants} from "../constants.js";
import {elements} from "../elements.js";
import {ghostImg, ghostBackImg} from "../resources.js";


export class Ghost extends Character {
    speedLimit = 200
    acceleration = 500

    constructor(x, y) {
        super(30, 20, 0, ghostImg, ghostBackImg);
        this.x = x;
        this.y = y;
    }

    /**
     *
     * @return {{x:int,y:int,z:int}}
     */
    #calcDirection = () => {
        let directionX = mainController.getHero().x - this.x
        let directionY = mainController.getHero().y - this.y
        let direction = Math.floor(Math.sqrt(directionX * directionX + directionY * directionY))
        return {x: directionX, y: directionY, z: direction}
    }

    /**
     *
     * @param delta {{x:int,y:int,z:int}} 本体与目标的所形成的三角形
     */
    #calcSpeed = (delta) => {
        if (this.isHurtX === true){
            this.yv = - 1500 * delta.y / delta.z;
            this.xv = - 1500 * delta.x / delta.z;
            this.isHurtX = false
            return
        }else if (this.isHurtY === true){
            this.xv += (delta.x * this.acceleration / delta.z) * constants.FRAME_TIME
            this.yv += (delta.y * this.acceleration / delta.z) * constants.FRAME_TIME
            if (Math.abs(this.yv) < this.speedLimit && Math.abs(this.xv) < this.speedLimit) {
                this.isHurtY = false
            }
            return
        }

        this.xv += (delta.x * this.acceleration / delta.z) * constants.FRAME_TIME
        this.yv += (delta.y * this.acceleration / delta.z) * constants.FRAME_TIME

        if (this.xv > this.speedLimit + 1) {
            this.xv = this.speedLimit
        } else if (this.xv < -this.speedLimit - 1) {
            this.xv = -this.speedLimit
        }
        if (this.yv > this.speedLimit + 1) {
            this.yv = this.speedLimit
        } else if (this.yv < -this.speedLimit - 1) {
            this.yv = -this.speedLimit
        }

    }

    #calcDisplacement = () => {
        this.x += this.xv * constants.FRAME_TIME
        this.y += this.yv * constants.FRAME_TIME
    }

    move = () => {
        let direction = this.#calcDirection()
        this.#calcSpeed(direction)
        this.#calcDisplacement();

        //攻击
        this.attack();
    }

    getHurt = () => {
        this.isHurtX = true
        this.isHurtY = true
    }


}
