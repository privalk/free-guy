export const heroImg = new Image()
export const soilImg = new Image()
export const stoneImg = new Image()
export const heroBackImg = new Image()
export const swordImg = new Image()
export const swordBackImg = new Image()
export const testImg = new Image()
export const ghostImg = new Image()
export const ghostBackImg = new Image()
export const backGroundImg = new Image()
export const titleImg = new Image()
export const mountainImg = new Image()
export const starImg = new Image()
export const portalImg = new Image()
export const thornImg = new Image()
export const slimeImg = new Image()
export const cubeImg = {
    heroImg, soilImg, stoneImg
}

const images = []

const register = (img, src) => images.push({img, src})

export const load = async () => {
    register(heroImg, 'image/Cookie.png')
    register(heroBackImg, 'image/CookieBack.png')
    register(soilImg, 'image/soil.png')
    register(stoneImg, 'image/stone.png')
    register(swordImg, 'image/sword.png')
    register(swordBackImg, 'image/swordBack.png')
    register(testImg, 'image/you.png')
    register(ghostImg, 'image/Ghost.png')
    register(ghostBackImg, 'image/GhostBack.png')
    register(backGroundImg, 'image/background.jpg')
    register(titleImg, 'image/title.png')
    register(mountainImg, 'image/mountain.png')
    register(portalImg, 'image/portal.png')
    register(starImg, 'image/star.png')
    register(thornImg, 'image/thorn.png')
    register(slimeImg, 'image/Slime.png')
    let promises = images.map(e => new Promise(resolve => {
        e.img.src = e.src
        e.img.onload = () => resolve()
    })
  )

    await Promise.all(promises)
    console.log("all load")
}