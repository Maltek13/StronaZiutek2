const canvasPage = {
    path: "^/?canvas$",
    html: /*html*/ `
        <div class="middle">
            <div class="landing">
                <h1>Canvas</h1>
                <p>Narysuj coś na płótnie!</p>
            </div>
            <div class="center">
                <canvas id="canvas" width="800" height="600" style="border: 1px solid var(--gray-6); margin-top: 1rem; background-color: #FCFCFC; border-radius: 5px; cursor: crosshair;"></canvas>
                <div id="controls" style="margin-top: 1rem; display: flex; flex-direction: row; gap: 2rem; justify-content: space-between; width: 100%; align-items: center;">
                    <div style="justify-content: space-between; display: flex; gap: 2rem;">
                        <div class="controls-item">
                            <label for="canvas-background-color-picker">Tło</label>
                            <input class="konewka" type="color" id="canvas-background-color-picker" value="#FCFCFC">
                        </div>
                        <div class="controls-item">
                            <label for="canvas-color-picker">Pędzel</label>
                            <input class="konewka" type="color" id="canvas-color-picker" value="#000000" >
                        </div>
                    </div>
                    <div class="controls-item">
                        <button id="clear-canvas">Wyczyść</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    onLoad: () => {
        let isDrawing = false;

        const canvasElement = document.getElementById("canvas");
        const context = canvasElement.getContext("2d");
        context.lineWidth = 2;

        document
            .getElementById("canvas-background-color-picker")
            .addEventListener("input", (e) => {
                canvasElement.style.backgroundColor = e.target.value;
            });

        document
            .getElementById("canvas-color-picker")
            .addEventListener("input", (e) => {
                context.strokeStyle = e.target.value;
            });

        document
            .getElementById("clear-canvas")
            .addEventListener("click", () => {
                context.clearRect(
                    0,
                    0,
                    canvasElement.width,
                    canvasElement.height,
                );
            });

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
    },
};
