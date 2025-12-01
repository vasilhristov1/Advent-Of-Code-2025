import * as fs from 'fs';
import * as readline from 'readline';
import { START, Direction } from './constants';
import { move } from './move';

async function main() {
    let current = START;
    let numberOfZeros = 0;

    const rl = readline.createInterface({
        input: fs.createReadStream('input.txt'),
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        const direction = line[0] as Direction;
        const steps = parseInt(line.slice(1).trim(), 10);

        const { newPosition } = move(direction, steps, current);
        current = newPosition;

        if (current === 0) {
            numberOfZeros++;
        }
    }

    console.log(numberOfZeros);
}

main().catch(console.error);
