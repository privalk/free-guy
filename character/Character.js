import {elements} from "../elements.js";
import {constants} from "../constants.js";
import {terrariaMap} from "../backgroundAndMap/terrariaMap.js";
import {mainController} from "../mainController.js";


export class Character {
    height = 0
    width = 0
    g = 0
    /**
     * 横向加速度（单位：速度）
     * @type {number}
     */
    parallelAcceleration = 20
    /**
     * 横向移动速度
     * @type {number}
     */
    xv = 0
    /**
     * 纵向移动速度
     * @type {number}
     */
    yv = 0
    /**
     * 默认跳跃速度
     * @type {number}
     */
    jumpV = -380
    /**
     * 默认横向移动速度
     * @type {number}
     */
    parallelVLimit = 200
    getHurtV = 500;
    x = 0
    y = 0
    img
    backImg

    isHurtX = false
    isHurtY = false

    parallelOrder = 0
    jumpOrder = false

    /**
     *
     * @type oldPosition {{x:number, y:number}}
     */
    oldPosition

    constructor(height, width, g, img, backImg) {
        this.g = g
        this.height = height
        this.width = width
        this.img = img
        this.backImg = backImg
        this.x = 0
        this.y = 0
    }

    clearOccupy = ()=>{
        for (let row = Math.floor(this.y / 10); row < Math.floor((this.y + this.height)/ 10); row++){
            for (let col = Math.floor(this.x / 10); col < Math.ceil((this.x + this.width)/ 10); col++){
                terrariaMap.cubesList[row * 450 + col] = 0;
            }
        }
    }

    occupyCubes = ()=>{
        for (let row = Math.floor(this.y / 10); row < Math.floor((this.y + this.height)/ 10); row++){
            for (let col = Math.floor(this.x / 10); col < Math.ceil((this.x + this.width)/ 10); col++){
                terrariaMap.cubesList[row * 450 + col] = -1;
            }
        }
    }

    parallelMove = (pos) => {
        this.parallelOrder = pos
    }

    cancelParallelMove = (pos) => {
        if (this.parallelOrder === pos) {
            this.parallelOrder = 0
        }
    }

    isFlying = () => {
        if (this.y % 10 !== 0){
            return true
        }
        if (this.y < terrariaMap.offscreenCanvas.height - this.height) {
            let blockY = (this.y + this.height) / 10
            let blockX = Math.floor(this.x / constants.CUBE_LENGTH)
            let jm = this.x % 10 === 0 ? this.width / 10 : this.width / 10 + 1
            for (let j = 0; j < jm; j++) {
                // 在下一个位置上有土块
                if (terrariaMap.getCode(blockX + j, blockY) !== 0 && terrariaMap.getCode(blockX + j, blockY) !== -1) {
                    return false
                }
            }
            return true
        }
        return false
    }

    jump = () => {
        this.jumpOrder = true
    }

    cancelJump = () => {
        this.jumpOrder = false
    }

    calcParallelSpeed = () => {
        // this.xv = this.parallelOrder * this.parallelV
        if (!this.isHurtX){
            if (Math.abs(this.xv) < this.parallelVLimit) {
                this.xv += this.parallelOrder * this.parallelAcceleration
            } else if (this.xv > 0) {
                this.xv = 200
            } else if (this.xv < 0) {
                this.xv = -200
            }
        }else if (Math.abs(this.xv) < 200){
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

    calcCrossSpeed = () => {
        // 被攻击
        if (this.isHurtY){
            this.yv = -200;
            this.isHurtY = false
            return;
        }
        // 腾空状态，速度未到达极限速度，计算自由落体速度
        if (this.isFlying() && this.yv < 1000) {
            this.yv += this.g * constants.FRAME_TIME
            return
        }

        if (this.isFlying()) {
            return
        }

        // 落地，有跳跃指令
        if (this.jumpOrder) {
            this.yv = this.jumpV
            return;
        }
        // 落地，且没有跳跃指令
        this.yv = 0
    }

    /**
     * 计算期望位移
     * @returns {{x: number, y: number}}
     */
    calcExpectDisplacement = () => {
        return {x: this.xv * constants.FRAME_TIME, y: this.yv * constants.FRAME_TIME}
    }

    /**
     * 计算实际位置
     * @param expectDisplacement {{x:number,y:number}} 期望位移
     */

    calcActualPosition = (expectDisplacement) => {
        let {y} = expectDisplacement
        // 计算横向真实位置
        let {blocked, direction} = this.calcActualX(expectDisplacement.x)
        if (blocked && y === 0 && Character.justOneBottomBlock(this.x / 10, this.y / 10, this.height / 10, this.width / 10, direction)) {
            this.y -= 10
            // return
        }
        // 计算纵向真实位置
        this.calcActualY(expectDisplacement.y)
    }

    static hasBlocks(x, y, height, width) {
        for (let i = x; i < x + width; i++) {
            for (let j = y; j < y + height; j++) {
                if (terrariaMap.getCode(i, j) !== 0 && terrariaMap.getCode(i, j) !== -1) {
                    return true
                }
            }
        }
        return false
    }

    static justOneBottomBlock(x, y, height, width, direction) {
        for (let i = 0; i < width; i++) {
            if (terrariaMap.getCode(x + i, y) !== 0 && terrariaMap.getCode(x + i, y) !== -1) {
                return false
            }
        }
        let i = direction ? x + width : x - 1
        for (let j = 0; j < height; j++) {
            if (j === height - 1) {
                return terrariaMap.getCode(i, j + y) !== 0 && terrariaMap.getCode(i, j + y) !== -1
            }
            if (terrariaMap.getCode(i, j + y) !== 0 && terrariaMap.getCode(i, j + y) !== -1) {
                return false
            }
        }
    }

    onCrash(){

    }


    /**
     * 计算横向位置
     * @param disX {int} 期望位移
     * @returns {{blocked:boolean,direction:boolean}}
     */
    calcActualX = (disX) => {
        if (disX === 0) {
            return {blocked: false, direction: false}
        }

        if (this.x % 10 !== 0) {
            // 移动确实太小，完全不考虑跨格子的问题
            if (disX + (this.x) % 10 < 10 && disX + (this.x) % 10 >= 0) {
                this.x += disX
                return {blocked: false, direction: false}
            }

            // 贴边
            if (disX > 0) {
                let rest = (this.x + disX) % 10
                this.x = this.x + disX - rest
                disX = rest
            } else {
                let rest = this.x % 10
                this.x -= rest
                disX += rest
            }
        }

        let nextBlockX
        if (disX > 0) {
            nextBlockX = this.x / 10 + this.width / 10
        } else {
            nextBlockX = (this.x / 10) - 1
        }

        // 找到头顶所在的格子
        let startY = Math.floor(this.y / 10)
        // 如果不是整数，则需要多判断一格（脚下）
        let height = this.y % 10 === 0 ? this.height / 10 : this.height / 10 + 1

        while (true) {
            // 在接下来的一列是有格子的
            let hasBlock = Character.hasBlocks(nextBlockX, startY, height, 1)
            if (hasBlock) {
                // 不动了，直接return
                this.onCrash()
                return {blocked: true, direction: disX > 0}
            } else {
                // 下一个位置没有格子

                // 如果剩余的disX太大，则需要继续向前遍历
                if (disX > 10 || disX < -10) {
                    if (disX > 0) {
                        this.x += 10
                        disX -= 10
                        nextBlockX++
                    } else {
                        this.x -= 10
                        disX += 10
                        nextBlockX--
                    }
                } else {
                    //如果disX绝对值小于10，则直接位移
                    this.x += disX
                    return {blocked: false, direction: false}
                }
            }
        }

    }

    /**
     * 计算纵向位置
     * @param disY {int} 期望位移
     */
    calcActualY = (disY) => {
        if (disY === 0) {
            return;
        }

        // 触底
        // TODO
        if (this.y + disY > terrariaMap.offscreenCanvas.height - this.height) {
            // 需要将纵向速度归零
            this.yv = 0
            this.y = terrariaMap.offscreenCanvas.height - this.height
            return;
        }

        //预处理将格子贴边
        if (this.y % 10 !== 0) {
            // 移动确实太小，完全不考虑跨格子的问题
            if (disY + this.y % 10 < 10 && disY + this.y % 10 >= 0) {
                this.y += disY
                return
            }

            // 贴边
            if (disY > 0) {
                let rest = (this.y + disY) % 10
                this.y = this.y + disY - rest
                disY -= rest
            } else {
                let rest = this.y % 10
                this.y -= rest
                disY += rest
            }
        }

        let nextBlockY
        if (disY > 0) {
            //向下计算
            nextBlockY = (this.y + this.height) / 10
        } else {
            //向上计算
            nextBlockY = this.y / 10 - 1
        }

        let startX = Math.floor(this.x / 10)
        let width = this.x % 10 === 0 ? this.width / 10 : this.width / 10 + 1

        while (true) {
            let hasBlock = Character.hasBlocks(startX, nextBlockY, 1, width)
            if (hasBlock) {
                // 记得速度归零
                this.yv = 0
                return;
            } else {
                if (disY > 10 || disY <= -10) {
                    if (disY > 0) {
                        this.y += 10
                        disY -= 10
                        nextBlockY++
                    } else {
                        this.y -= 10
                        disY += 10
                        nextBlockY--
                    }
                } else {
                    this.y += disY
                    return;
                }
            }
        }

    }

    move = () => {
       
    }

    //人物动态
    index = -1
    face = 1;
    getFace = () => {
        return this.face;
    }

    /**
     * 输入绘制角色的坐标
     * @param x {int}
     * @param y {int}
     */
    drawFrame = (x, y) => {
        this.index++;
        if (this.xv > 0) {
            elements.context.drawImage(this.img, this.index * this.width, 0, this.width, this.height, x, y, this.width, this.height);
            this.face = 1;
        } else if (this.xv < 0) {
            elements.context.drawImage(this.backImg, this.index * this.width, 0, this.width, this.height, x, y, this.width, this.height);
            this.face = -1;

        } else {
            if (this.face === 1) {
                elements.context.drawImage(this.img, 0, 0, this.width, this.height, x, y, this.width, this.height);
                this.index = 5
            } else {
                elements.context.drawImage(this.backImg, 0, 0, this.width, this.height, x, y, this.width, this.height);
                this.index = 5
            }
        }
        if (this.index >= 24) {
            this.index = -1
        }
    }

    drawStartFrame = (x, y) => {
        this.index++;
        elements.startContext.drawImage(this.img, this.index * this.width, 0, this.width, this.height, x, y, this.width, this.height);
        if (this.index >= 24) {
            this.index = -1
        }
    }


    //战斗相关
    health = 1;

    //子类重写
    die = () => {
        console.error("please implement method DIE !! ")
    }
    //子类重写
    attack = () => {
        if ((this.x + this.width - mainController.getHero().x) >= 0 && this.x < mainController.getHero().x && (Math.abs(this.y - mainController.getHero().y) <= 30)) {
            mainController.getHero().getHurt(1)
        }else if ((this.x - (mainController.getHero().x + mainController.getHero().width)) <= 0 && this.x > mainController.getHero().x && (Math.abs(this.y - mainController.getHero().y) <= 30)){
            mainController.getHero().getHurt(-1)
        }
    }
    //子类重写
    getHurt = () => {

    }


}