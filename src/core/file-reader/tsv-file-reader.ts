import { readFileSync } from 'node:fs';
import { FileReaderInterface } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import { mapLineToOffer } from '../../utils/mapLineToOffer.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
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
