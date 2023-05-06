#!/usr/bin/env node
import CLIApplication from './app/cli.js';
import HelpCommand from './core/cli-command/helper.command.js';
import VersionCommand from './core/cli-command/version.command.js';
import ImportCommand from './core/cli-command/import.command.js';
const manager = new CLIApplication();
manager.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
]);
manager.processCommand(process.argv);
//# sourceMappingURL=main.cli.js.map