import { readFileSync } from 'node:fs';
import path from 'node:path';
export default class VersionCommand {
    constructor() {
        this.name = '--version';
    }
    readVersion() {
        const contentPageJSON = readFileSync(path.resolve('./package.json'), 'utf-8');
        const content = JSON.parse(contentPageJSON);
        return content.version;
    }
    async execute() {
        const version = this.readVersion();
        console.log(version);
    }
}
//# sourceMappingURL=version.command.js.map