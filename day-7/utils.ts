import * as fs from 'fs';

export const getFileData = (fileName: string): string => {
    return fs.readFileSync(fileName, 'utf8');
};

