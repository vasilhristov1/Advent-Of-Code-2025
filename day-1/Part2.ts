import * as fs from 'fs';
import * as readline from 'readline';
import { START, Direction } from './constants';
import { move } from './move';

async function main() {
    let current = START;
    let totalZeros = 0;

    const rl = readline.createInterface({
        input: fs.createReadStream('input.txt'),
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        const direction = line[0] as Direction;
        const steps = parseInt(line.slice(1).trim(), 10);

        const { newPosition, zerosHit } = move(direction, steps, current);

        current = newPosition;
        totalZeros += zerosHit;
    }

    console.log(totalZeros);
}

main().catch(console.error);
