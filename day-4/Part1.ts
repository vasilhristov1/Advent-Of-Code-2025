// UTILS
import { getAccessiblePapers, getFileData } from "./utils";

const data = getFileData('input.txt').trim();
const lines = data.split('\n').filter(l => l.length > 0);

const accessible = getAccessiblePapers(lines);

console.log('Total paper count:', accessible.length);
