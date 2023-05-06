import TSVFileReader from '../file-reader/tsv-file-reader.js';
export default class ImportCommand {
    constructor() {
        this.name = '--import';
    }
    execute(filename) {
        const fileReader = new TSVFileReader(filename?.trim());
        try {
            fileReader.read();
            console.log(fileReader.toArray());
        }
        catch (err) {
            if (!(err instanceof Error)) {
                throw err;
            }
            console.log(`Не удалось импортировать данные из файла по причине: «${err.message}»`);
        }
    }
}
//# sourceMappingURL=import.command.js.map