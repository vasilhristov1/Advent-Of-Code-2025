import { Direction, SIZE } from './constants';

export interface MoveResult {
    newPosition: number;
    zerosHit: number;
}

export const move = (direction: Direction, steps: number, position: number): MoveResult => {
    const delta = direction === 'L' ? -steps : steps;
    const newPosition = ((position + delta) % SIZE + SIZE) % SIZE;

    let k0: number;

    if (direction === 'R') {
        k0 = position === 0 ? SIZE : SIZE - position;
    } else {
        k0 = position === 0 ? SIZE : position;
    }

    let zerosHit = 0;

    if (steps >= k0) {
        zerosHit = Math.floor((steps - k0) / SIZE) + 1;
    }

    return { newPosition, zerosHit };
};
