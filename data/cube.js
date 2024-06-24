import {cubeImg} from "../resources.js";

export class Cube {
    name
    defence
    /**
     * @type {HTMLImageElement}
     */
    img
    code

    /**
     *
     * @param obj
     * @returns {Cube}
     */
    static make= (obj)=>{
        let c = new Cube()
        c.name = obj.name
        c.code = obj.code
        c.defence = obj.defence
        c.img = obj.img
        return c
    }

    load = ()=> new Promise(resolve => this.img.onload = resolve)
}