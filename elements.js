const canvas = document.getElementById('myCanvas');
const backGroundCanvas = document.getElementById('backGround');
const context = canvas.getContext('2d');
const backGroundContext = backGroundCanvas.getContext('2d');
const characterDataCanvas = document.getElementById('characterDataCanvas');
const dataContext = characterDataCanvas.getContext('2d');
const startCanvas = document.getElementById('start');
const startContext = startCanvas.getContext('2d');
const mountainCanvas = document.getElementById('mountain');
const mountainContext = mountainCanvas.getContext('2d');
export const elements = {
    canvas,
    context,
    backGroundCanvas,
    backGroundContext,
    characterDataCanvas,
    dataContext,
    startCanvas,
    startContext,
    mountainCanvas,
    mountainContext
}