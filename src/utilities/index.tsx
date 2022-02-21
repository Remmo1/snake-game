export const clearBoard = (context: CanvasRenderingContext2D | null) => {
    if (context) {
        context.clearRect(0, 0, 1000, 600);
    }
};

export interface IObjectBody {
    x: number;
    y: number;
}

export const drawObject = (
    context: CanvasRenderingContext2D | null,
    objectBody: IObjectBody[],
    fillColor: string,
    strokeStyle = "#146356"
) => {
    if (context) {
        objectBody.forEach((object: IObjectBody) => {
            context.fillStyle = fillColor;
            context.strokeStyle = strokeStyle;
            context?.fillRect(object.x, object.y, 20, 20);
            context?.strokeRect(object.x, object.y, 20, 20);
        });
    }
};