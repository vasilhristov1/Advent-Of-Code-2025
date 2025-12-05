// UTILS
import { getAccessiblePapers, getFileData, removeCell } from "./utils";

const data = getFileData('input.txt').trim();
const lines = data.split('\n').filter(l => l.length > 0);

let removedPaperCount = 0;

while (true) {
    const accessible = getAccessiblePapers(lines);

    if (accessible.length === 0) {
        break;
    }

    for (const cell of accessible) {
        removeCell(lines, cell);
    }

    removedPaperCount += accessible.length;
}

console.log('Removed paper count:', removedPaperCount);
