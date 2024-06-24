const canvas = document.getElementById("myCanvas")
const context = canvas.getContext('2d')
const saveBtn = document.getElementById("saveMap")
const startXInput = document.getElementById("startX")
const startYInput = document.getElementById("startY")
const endXInput = document.getElementById("endX")
const endYInput = document.getElementById("endY")
const drawBtn = document.getElementById("draw")
const clearBtn = document.getElementById("clear")
const goodsXInput = document.getElementById("goodsX")
const goodsYInput = document.getElementById("goodsY")
const portalToXInput = document.getElementById("portalToX")
const portalToYInput = document.getElementById("portalToY")
const creatSlimeBtn = document.getElementById("creatSlime")
const creatThornBtn = document.getElementById("creatThorn")
const creatStarBtn = document.getElementById("creatStar")
const creatPortalBtn = document.getElementById("creatPortal")
const indexInput = document.getElementById("delIndex")

let cubesList = new Int8Array(450 * 350)
let isClick = false
let temp1
let goods = true
let slimes = []
let thorns = []
let portals = []
let stars = []


function changeGood() {
    let code = event.keyCode
    if (code === 70) {
        goods = !goods
    }
    if (goods) {
        creatPortalBtn.innerHTML = "creatPortal"
        creatStarBtn.innerHTML = "creatStar"
        creatThornBtn.innerHTML = "creatThorn"
        creatSlimeBtn.innerHTML = "creatSlime"
    } else {
        creatPortalBtn.innerHTML = "delPortal"
        creatStarBtn.innerHTML = "delStar"
        creatThornBtn.innerHTML = "delThorn"
        creatSlimeBtn.innerHTML = "delSlime"
    }
}

function save(console) {
    console.save = function (data, filename) {
        if (!data) {
            console.error('Console.save: No data')
            return;
        }
        if (!filename) filename = 'console.json'
        if (typeof data === "object") {
            data = JSON.stringify(data, undefined, 4)
        }
        const blob = new Blob([data], {type: 'text/json'}),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a');
        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['../JSON', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
    temp1 = cubesList
    console.save(temp1, "mapList.json")
    temp1 = slimes
    console.save(temp1,"slimeList.json")
    temp1 = thorns
    console.save(temp1,"thornList.json")
    temp1 = portals
    console.save(temp1, "portalList.json")
    temp1 = stars
    console.save(temp1, "starList.json")
}


/**
 *
 * @param array {*[]}
 */
function totalHandler(array, color, height, wight) {
    if (goods) {

        let goodsX = parseInt(goodsXInput.value) *10
        let goodsY = parseInt(goodsYInput.value)*10
        let good = {x: goodsX, y: goodsY}
        if (isNaN(goodsX) || isNaN(goodsY)) {
            console.log("Please enter the position of goods")
            return;
        }
        let index = "" + array.length
        context.fillStyle = color
        context.fillRect(goodsX, goodsY, wight, height)
        context.fillStyle = "white"
        context.fillText(index, goodsX, goodsY + 10)
        array.push(good)
        console.log(good);
    } else {
        let delIndex = parseInt(indexInput.value);
        if (delIndex >= array.length || isNaN(delIndex)) {
            console.log("Please enter a number that is smaller than array's length")
            return
        } else {
            for (let i = 0; i <= array.length; i++) {
                let shiftObj = array.shift();
                if (i === delIndex) {
                    console.log(shiftObj)
                    context.clearRect(shiftObj.x, shiftObj.y, wight, height)
                } else {
                    array.push(shiftObj)
                }
            }
            // console.log(array)
            for (let i = 0; i < array.length; i++) {
                let index = "" + i
                context.fillStyle = "green"
                context.fillRect(array[i].x, array[i].y, wight, height)
                context.fillStyle = "white"
                context.fillText(index, array[i].x, array[i].y + 10)
            }
        }
    }
    drawMap()
}

function thornHandler() {
    totalHandler(thorns, "gary", 10, 20)
}

function slimeHandler() {
    totalHandler(slimes, "green", 20, 20)
}

function starHandler() {
    totalHandler(stars, "yellow", 20, 20)
}

function portalHandler() {
    if (goods) {

        let goodsX = parseInt(goodsXInput.value)*10
        let goodsY = parseInt(goodsYInput.value)*10
        let toX = parseInt(portalToXInput.value)*10
        let toY = parseInt(portalToYInput.value)*10
        if (isNaN(goodsX) || isNaN(goodsY) || isNaN(toX) || isNaN(toY)) {
            console.log("Please enter the position of portal and to where")
            return;
        }
        let good = {x: goodsX, y: goodsY, deliveryToX: toX, deliveryToY: toY}
        let index = "" + portals.length
        context.fillStyle = "purple"
        context.fillRect(goodsX, goodsY, 20, 20)
        context.fillStyle = "white"
        context.fillText(index, goodsX, goodsY + 10)
        portals.push(good)
    } else {
        let delIndex = parseInt(indexInput.value);
        if (delIndex >= portals.length || isNaN(delIndex)) {
            console.log("Please enter a number that is smaller than array's length")
            return
        } else {
            for (let i = 0; i <= portals.length; i++) {
                let shiftObj = portals.shift();
                if (i === delIndex) {
                    console.log(shiftObj)
                    context.clearRect(shiftObj.x, shiftObj.y, 20, 20)
                } else {
                    portals.push(shiftObj)
                }
            }
            // console.log(array)
            for (let i = 0; i < portals.length; i++) {
                let index = "" + i
                context.fillStyle = "green"
                context.fillRect(portals[i].x, portals[i].y, 20, 20)
                context.fillStyle = "white"
                context.fillText(index, portals[i].x, portals[i].y + 10)
            }
        }
    }
}

function drawStone(pos) {
        cubesList[pos.y * 450 + pos.x] = 2;
        context.fillStyle = 'rgb(180,180,180)';
        context.fillRect(pos.x * 10, pos.y * 10, 10, 10)
        context.strokeStyle = 'black';
        context.strokeRect(pos.x * 10 + 1, pos.y * 10 + 1, 8, 8)
}

function clearStone(pos) {
    context.clearRect(pos.x * 10, pos.y * 10, 10, 10)
    cubesList[pos.y * 450 + pos.x] = 0;
}

function getEditorMousePosition(event) {
    let rectangle = canvas.getBoundingClientRect();
    let mouseX = (event.clientX - rectangle.left);
    let mouseY = (event.clientY - rectangle.top);
    
    return {x: mouseX, y: mouseY}

}

function drawMap() {
    for (let row = 0; row < 350; row++) {
        for (let col = 0; col < 450; col++) {
            if (cubesList[row * 450 + col] !== 0) {
                context.fillStyle = 'rgb(180,180,180)';
                context.fillRect(col * 10, row * 10, 10, 10)
                context.strokeStyle = 'black';
                context.strokeRect(col * 10 + 1, row * 10 + 1, 8, 8)
            }
        }
    }
}

async function mapInit() {
    return new Promise(resolve => {
        $.getJSON("../JSON/mapList.json", function (data) {
            for (let row = 0; row < 350; row++) {
                for (let col = 0; col < 450; col++) {
                    cubesList[row * 450 + col] = data[row * 450 + col]
                }
            }
            resolve()
        });
    })
}

async function starInit() {
    return new Promise(resolve => {
        $.getJSON("../JSON/starList.json", function (data){
            for(let i = 0; i< data.length;i++){
                stars[i] = data[i]
                context.fillStyle = 'red'
                context.fillRect(data[i].x,data[i].y,20,20)
                context.fillStyle = 'white'
                context.fillText(i,data[i].x,data[i].y+10)
            }
            resolve()
        })
    })
}
async function portalInit() {
    return new Promise(resolve => {
        $.getJSON("../JSON/portalList.json", function (data){
            for(let i = 0; i< data.length;i++){
                portals[i] = data[i]
                context.fillStyle = 'purple'
                context.fillRect(data[i].x,data[i].y,20,20)
                context.fillStyle = 'white'
                context.fillText(i,data[i].x,data[i].y+10)
            }
            resolve()
        })
    })
}
async function slimeInit() {
    return new Promise(resolve => {
        $.getJSON("../JSON/slimeList.json", function (data){
            for(let i = 0; i< data.length;i++){
                slimes[i] = data[i]
                context.fillStyle = 'green'
                context.fillRect(data[i].x,data[i].y,20,20)
                context.fillStyle = 'white'
                context.fillText(i,data[i].x,data[i].y+10)
            }
            resolve()
        })
    })
}
async function thronInit() {
    return new Promise(resolve => {
        $.getJSON("../JSON/thornList.json", function (data){
            for(let i = 0; i< data.length;i++){
                thorns[i] = data[i]
                context.fillStyle = 'rgb(70,70,70)'
                context.fillRect(data[i].x,data[i].y,20,10)
                context.fillStyle = 'white'
                context.fillText(i,data[i].x,data[i].y+10)
            }
            resolve()
        })
    })
}

function moveHandler() {
    let pos = getEditorMousePosition(event)
    let realPos = {
        x: Math.floor(pos.x / 10),
        y: Math.floor(pos.y / 10)
    }
    if (isClick === true && goods === true) {
        drawStone(realPos)
    } else if (isClick === true && goods === false) {
        clearStone(realPos)
    }
}

async function main() {
    await mapInit()
    await slimeInit()
    await thronInit()
    await starInit()
    await portalInit()
    drawMap()
    creatPortalBtn.onclick = portalHandler
    creatSlimeBtn.onclick = slimeHandler
    creatThornBtn.onclick = thornHandler
    creatStarBtn.onclick = starHandler
    drawBtn.onclick = () => {
        let sX = startXInput.value
        let sY = startYInput.value
        let eX = endXInput.value
        let eY = endYInput.value

        for (let i = sY; i <= eY; i++) {
            for (let j = sX; j <= eX; j++) {
                let pos = {x: j, y: i};
                drawStone(pos);
            }
        }
    }
    clearBtn.onclick = () => {
        let sX = startXInput.value
        let sY = startYInput.value
        let eX = endXInput.value
        let eY = endYInput.value

        for (let i = sY; i <= eY; i++) {
            for (let j = sX; j <= eX; j++) {
                let pos = {x: j, y: i};
                clearStone(pos);
            }
        }
    }
    saveBtn.onclick = save
    canvas.onmousedown = () => {
        isClick = true
        let pos = getEditorMousePosition(event)

        let realPos = {
            x: Math.floor(pos.x / 10),
            y: Math.floor(pos.y / 10)
        }
        goodsXInput.value = realPos.x
        goodsYInput.value = realPos.y
        if (goods === true) {
            drawStone(realPos)
        } else {
            context.clearRect(realPos.x * 10, realPos.y * 10, 10, 10)
            cubesList[realPos.y * 450 + realPos.x] = 0;
        }
    }
    canvas.onmousemove = moveHandler
    canvas.onmouseup = () => {
        isClick = false
    }
    window.onkeydown = changeGood

}

main()