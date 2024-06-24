import { elements } from "./elements.js";

const { canvas } = elements

export const getMousePosition = (event) => {
        let rectangle = canvas.getBoundingClientRect();
        let mouseX = (event.clientX - rectangle.left);
        let mouseY = (event.clientY - rectangle.top);
        return { x: mouseX, y: mouseY }
}
