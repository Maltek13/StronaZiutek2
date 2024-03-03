let isDrawing = false;

const canvasElement = document.getElementById("canvas");
const context = canvasElement.getContext("2d");
context.lineWidth = 2;

const canvasPos = canvasElement.getBoundingClientRect();

canvasElement.addEventListener("mousedown", startDrawing);
canvasElement.addEventListener("mouseup", stopDrawing);
canvasElement.addEventListener("mousemove", draw);

function startDrawing(e) {
    isDrawing = true;
    context.beginPath();
    context.moveTo(
        e.clientX - canvasPos.left,
        e.clientY - canvasPos.top,
    );
}

function draw(e) {
    if (isDrawing == true) {
        const x = e.clientX - canvasPos.left;
        const y = e.clientY - canvasPos.top;

        context.lineTo(x, y);
        context.stroke();
    }
}

function stopDrawing() {
    isDrawing = false;
}