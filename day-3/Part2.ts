import { getFileData, maxJoltageForBank } from './utils';

async function main() {
    const data = getFileData('input.txt').trim();
    const lines = data.split('\n').filter(l => l.length > 0);

    let total = 0;

    for (const line of lines) {
        const joltage = maxJoltageForBank(line, 12);
        total += joltage;
    }

    console.log('Part 2 total output joltage:', total);
}

main().catch(console.error);
