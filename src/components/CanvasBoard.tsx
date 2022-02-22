import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {IGlobalState} from "../store/reducers";
import {clearBoard, drawObject, generateRandomPosition, IObjectBody} from "../utilities";
import {makeMove, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP} from "../store/actions";
import {clear} from "@testing-library/user-event/dist/clear";

export interface ICanvasBoard {
    height: number;
    width: number;
}

const CanvasBoard = ({ height, width }: ICanvasBoard) => {

    const dispatch = useDispatch();

    const snake1 = useSelector((state : IGlobalState) => state.snake);

    const disallowedDirection = useSelector(
        (state: IGlobalState) => state.disallowedDirection
    );

    const [pos, setPos] = useState<IObjectBody>(
        generateRandomPosition(width - 20, height - 20)
    );

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    const moveSnake = useCallback(
        (dx = 0, dy = 0, ds: string) => {
            if (dx > 0 && dy === 0 && ds !== "RIGHT") {
                dispatch(makeMove(dx, dy, MOVE_RIGHT));
            }

            if (dx < 0 && dy === 0 && ds !== "LEFT") {
                dispatch(makeMove(dx, dy, MOVE_LEFT));
            }

            if (dx === 0 && dy > 0 && ds !== "DOWN") {
                dispatch(makeMove(dx, dy, MOVE_DOWN));
            }

            if (dx === 0 && dy < 0 && ds !== "UP") {
                dispatch(makeMove(dx, dy, MOVE_UP));
            }
        },
        [dispatch]
    );

    const handleKeyEvents = useCallback(
        (event: KeyboardEvent) => {
            if (disallowedDirection) {
                switch (event.key) {
                    case "w":
                        moveSnake(0, -20, disallowedDirection);
                        break;
                    case "s":
                        moveSnake(0, 20, disallowedDirection);
                        break;
                    case "a":
                        moveSnake(-20, 0, disallowedDirection);
                        break;
                    case "d":
                        event.preventDefault();
                        moveSnake(20, 0, disallowedDirection);
                        break;
                }

            }
            else {
                if (
                    disallowedDirection !== "LEFT" &&
                    disallowedDirection !== "UP" &&
                    disallowedDirection !== "DOWN" &&
                    event.key === "d"
                )
                    moveSnake(20, 0, disallowedDirection);
            }
        }, [disallowedDirection, moveSnake]
    );

    const resetBoard = useCallback(() => {
        window.removeEventListener("keypress", handleKeyEvents);
        clearBoard(context);
        drawObject(context, snake1, "#91C483");
        drawObject(
            context,
            [generateRandomPosition(width - 20, height - 20)],
            "#676FA3"
        );
        window.addEventListener("keypress", handleKeyEvents);
        },
        [context, dispatch, handleKeyEvents, height, snake1, width]
    );

    useEffect(() => {
        setContext(canvasRef.current && canvasRef.current.getContext("2d"));
        clearBoard(context);
        drawObject(context, snake1, "#91C483");
        drawObject(context, [pos], "#676FA3");
    }, [context, pos, snake1, height, width, dispatch, handleKeyEvents]);

    useEffect(() => {
        window.addEventListener("keypress", handleKeyEvents);

        return () => {
            window.removeEventListener("keypress", handleKeyEvents);
        };
    }, [disallowedDirection, handleKeyEvents]);


    return (
        <>
            <canvas
                ref={canvasRef}
                style={{
                    border: "3px solid back",
                }}
                height={height}
                width={width}
            />
        </>

    );
};

export default CanvasBoard;