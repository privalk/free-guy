import { constants } from "./constants.js";
import { elements } from "./elements.js";
import { terrariaMap } from "./backgroundAndMap/terrariaMap.js";
import { sword } from "./goods/sword.js";
import { Hero } from "./character/Hero.js";
import { Ghost } from "./character/Ghost.js";
import { Slime } from "./character/Slime.js";
import { handler } from "./handler.js";
import { mountainController } from "./backgroundAndMap/mountainController.js";
import { Star } from "./Goods/Star.js";
import { Portal } from "./Goods/Portal.js";
import { PortalToWin } from "./Goods/PortalTowin.js";
import { Thorn } from "./character/Thorn.js";

class MainController {
    #timer
    /**
     * @type {Hero}
     */
    #hero
    /**
     * @type {Ghost}
     */
    #ghost
    /**
     * @type {*[Slime]}
     */
    slime = []
    numOfSlime = 0
    /**
     * @type {*[Thorn]}
     */
    thorn = []
    numOfThorn = 0
    /**
     * @type {Star}
     */
    star=[]
    numOfStar = 0;
    /**
    * @type {Portal}
    */
    portal=[]
    numOfPortal = 0;
     /**
    * @type {PortalToWin}
    */
    #portalToWin

    clearTimer = () => {
        clearInterval(this.#timer);
    }
    mainRun = () => {
        clearInterval(this.#timer);
        this.#timer = setInterval(() => {
            this.clear()
            terrariaMap.draw(this.#hero.x, this.#hero.y)
            mountainController.drawMountain()
            this.#portalToWin.move();
            this.#portalToWin.drawFrame();
           
            this.#ghost.move()
            this.#ghost.drawFrame(this.#ghost.x - (this.#hero.x - 240), this.#ghost.y - (this.#hero.y - 370))
            for (let i = 0; i < this.numOfSlime; i++) {
                this.slime[i].move()
                this.slime[i].drawFrame(this.slime[i].x - (this.#hero.x - 240), this.slime[i].y - (this.#hero.y - 370))
            }
            for (let i = 0; i < this.numOfThorn; i++) {
                this.thorn[i].move()
                this.thorn[i].drawFrame(this.thorn[i].x, this.thorn[i].y)
            }
            for (let i = 0; i < this.numOfStar; i++) {
                this.star[i].move()
                this.star[i].drawFrame()
            }
            for (let i = 0; i < this.numOfPortal; i++) {
                this.portal[i].move()
                this.portal[i].drawFrame()
            }
            this.#hero.move()
            this.#hero.drawFrame(240, 370)
            sword.drawFrame();
        }, constants.FRAME_TIME * 1000)
    }

    creatHero = () => {
        this.#hero = new Hero()
    }

    initHero = () => {
        this.#hero.x = this.#hero.checkPoint.x
        this.#hero.y = this.#hero.checkPoint.y
        this.#hero.health = 100
        this.#hero.drawHealth()
        this.#hero.remainingCubes = 10
        this.#hero.starOfHero=0;
        this.#hero.drawRemainingCubes();
        this.#hero.setStarOfHero(0);
        this.#hero.drawStar();
    }

    creatStarList = async ()=>{
        return new Promise(resolve => {
            $.getJSON('./JSON/starList.json', function (data){
                mainController.numOfStar=data.length;
                for (let i = 0;i < data.length;i++){
                    let aStar = new Star(data[i].x, data[i].y)
                    mainController.star.push(aStar)
                    
                }
                resolve()
            })
        })
    }

    creatPortalList = async ()=>{
        return new Promise(resolve => {
            $.getJSON('./JSON/portalList.json', function (data){
                mainController.numOfPortal = data.length;
                for (let i = 0;i < data.length;i++){
                    let aPortal = new Portal(data[i].x, data[i].y,data[i].ToX,data[i].ToY)
                    mainController.portal.push(aPortal)
                }
                resolve()
            })
        })
    }

    creatSlimeList = async ()=>{
        return new Promise(resolve => {
            $.getJSON('./JSON/slimeList.json', function (data){
                mainController.numOfSlime = data.length;
                for (let i = 0;i < data.length;i++){
                    let aSlime = new Slime(data[i].x, data[i].y)
                    mainController.slime.push(aSlime)
                    
                }
                resolve()
            })
        })
    }

    creatThornList = async ()=>{
        return new Promise(resolve => {
            $.getJSON('./JSON/thornList.json', function (data){
                mainController.numOfThorn = data.length;
                for (let i = 0;i < data.length;i++){
                    let aThorn = new Thorn(data[i].x, data[i].y)
                    mainController.thorn.push(aThorn)
                }
                resolve()
            })
        })
    }

    init = async () => {
        clearInterval(this.#timer)
        this.initHero()
        this.#ghost = new Ghost(Math.random() * 4500, Math.random() * 3500)
        this.slime = []
        this.portal =[]
        this.star = []
        this.thorn = []
        this.#portalToWin = new PortalToWin(1410,970)

        await terrariaMap.mapInit()
        await this.creatThornList()
        await this.creatSlimeList()
        await this.creatStarList()
        await this.creatPortalList()
        this.mainRun()
        //绑定事件
    }

    getHero = () => this.#hero
    getGhost = () => this.#ghost
    
    clear = () => {
        elements.context.clearRect(0, 0, elements.canvas.height, elements.canvas.width);
        elements.mountainContext.clearRect(0, 0, 500, 500)
    }


}

export const mainController = new MainController();