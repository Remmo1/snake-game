import {
    CallEffect,
    delay,
    put,
    PutEffect,
    takeLatest
} from "redux-saga/effects";

import {
    DOWN,
    ISnakeCoord,
    LEFT,
    MOVE_DOWN,
    MOVE_LEFT,
    MOVE_RIGHT,
    MOVE_UP, RIGHT,
    setDisDirection, UP
} from "../actions";

export function* moveSaga(params: {
    type : string;
    payload : ISnakeCoord;
}) : Generator<
    PutEffect<{type: string; payload: ISnakeCoord}>
    PutEffect<{type: string; payload: string}>
    CallEffect<true>
    > {
    while(true) {
            yield put({
                type: params.type.split("_")[1],
                payload: params.payload,
            });
            switch (params.type.split("_")[1]){
                case RIGHT:
                    yield put(setDisDirection(LEFT));
                    break;
                case LEFT:
                    yield put(setDisDirection(RIGHT));
                    break;
                case UP:
                    yield put(setDisDirection(DOWN));
                    break;
                case DOWN:
                    yield put(setDisDirection(UP));
                    break;
            }
            yield delay(100);
        }
    }

    fuction* watcherSagas() {
        yield takeLatest(
            [MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN],
                moveSaga
        );
}

export default watcherSagas;