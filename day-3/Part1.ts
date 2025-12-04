import { getFileData, maxJoltageForBank } from './utils';

async function main() {
    const data = getFileData('input.txt').trim();
    const lines = data.split('\n').filter(l => l.length > 0);

    let total = 0;

    for (const line of lines) {
        const joltage = maxJoltageForBank(line, 2);
        total += joltage;
    }

    console.log('Part 1 total output joltage:', total);
}

main().catch(console.error);
