import { FileReaderInterface } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
export default class TSVFileReader implements FileReaderInterface {
    filename: string;
    private rawData;
    constructor(filename: string);
    read(): void;
    toArray(): Offer[];
}
