import {elements} from "../elements.js";
import {soilImg} from "../resources.js";
import {constants} from "../constants.js";
import {cubesData} from "../data/cubesData.js";
import {Cube} from "../data/cube.js";
import {mainController} from "../mainController.js";


class TerrariaMap{
    cubesList = new Int8Array(350 * 450).fill(0)
    #height = 350
    #width = 450
    #cubeMap = {}
    /**
     * @type {HTMLCanvasElement}
     */
    offscreenCanvas
    realContext
    delta
    /**
     * 计算点击位置与人物距离
     * @param pos {{x:number,y:number}}
     */
    calculationDelta = (pos)=>{
        this.delta = Math.floor(Math.sqrt((pos.x - (mainController.getHero().x + 10) / 10) * (pos.x - (mainController.getHero().x + 10) / 10) + (pos.y - mainController.getHero().y / 10) * (pos.y - mainController.getHero().y / 10)))
    }
    /**
     * 创建一个方块
     * @param pos {{x:number,y:number}}
     */
    creat = (pos)=>{
        //计算点击位置与人物的距离
        if (this.getCode(pos.x, pos.y) === 0 && mainController.getHero().remainingCubes > 0 && this.delta < 8){
            this.cubesList[pos.y * 450 + pos.x] = 1;
            this.drawCube(pos);
            mainController.getHero().cubeReduce();
        }
    }

    /**
     * 清除一个方块
     * @param pos {{x:number,y:number}}
     */
    delete = (pos)=> {
        if (this.getCode(pos.x, pos.y) === 1 && this.delta < 8) {
            this.cubesList[pos.y * 450 + pos.x] = 0;
            this.clearACube(pos);
            mainController.getHero().cubeAdd();
        }

    }

    drawCube = (pos)=>{
        this.realContext.drawImage(soilImg, pos.x * 10, pos.y * 10)
        //elements.testContext.drawImage(this.offscreenCanvas, 0, 0)
    }

    clearACube = (pos)=>{
        this.realContext.clearRect(pos.x * 10, pos.y * 10, constants.CUBE_LENGTH, constants.CUBE_LENGTH);
        //elements.testContext.drawImage(this.offscreenCanvas, 0, 0)
    }

    // TODO
    draw = (x,y)=>{
        elements.backGroundContext.clearRect(0, 0, 500, 500)
        elements.backGroundContext.drawImage(this.offscreenCanvas, x - 240, y - 370, 500, 500, 0, 0, 500, 500)
    }

    getCode = (x, y)=>{
        // 超出界限
        if (x < 0 || x >= this.#width){
            return -2
        }
        return this.cubesList[x + y * 450]??1
    }

    getCubeByCode = (code)=>{
        return this.#cubeMap[code]
    }

    mapInit = async ()=>{
        await this.creatList();
        //注册每个类型的方块
        let realCubes = cubesData.map(o=>Cube.make(o))
        realCubes.forEach(cube=>{
            this.#cubeMap[cube.code] = cube
        })
        console.log("all cubes loaded")

        this.offscreenCanvas = document.createElement("canvas")
        this.offscreenCanvas.height = this.#height * 10
        this.offscreenCanvas.width = this.#width * 10
        this.realContext = this.offscreenCanvas.getContext('2d')

        // TODO
        for (let row = 0; row < 350; row++) {
            for (let col = 0; col < 450; col++) {
                let cube = this.getCubeByCode(this.cubesList[row * 450 + col])
                if (!!cube) {
                    this.realContext.drawImage(cube.img, col * 10, row * 10)
                }
            }
        }
        //elements.testContext.drawImage(this.offscreenCanvas, 0, 0)
        return 0
    }

    creatList = () => {
        return new Promise(res=>{
            $.getJSON("../JSON/mapList.json", function (data) {
                for (let row = 0; row < 350; row++) {
                    for (let col = 0; col < 450; col++) {
                        terrariaMap.cubesList[row * 450 + col] = data[row * 450 + col]
                    }
                }
                res()
            });
        })
    }
}

export const terrariaMap = new TerrariaMap();