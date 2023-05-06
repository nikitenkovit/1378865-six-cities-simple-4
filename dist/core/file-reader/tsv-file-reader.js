import { readFileSync } from 'node:fs';
import { mapLineToOffer } from '../../utils/mapLineToOffer.js';
export default class TSVFileReader {
    constructor(filename) {
        this.filename = filename;
        this.rawData = '';
    }
    read() {
        this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
    }
    toArray() {
        if (!this.rawData) {
            return [];
        }
        return this.rawData
            .split('\n')
            .filter((row) => row.trim() !== '')
            .map((line) => line.split('\t'))
            .map(mapLineToOffer);
    }
}
//# sourceMappingURL=tsv-file-reader.js.map