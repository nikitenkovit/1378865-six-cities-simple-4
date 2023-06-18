#!/usr/bin/env node
import 'reflect-metadata';
import CLIApplication from './app/cli.js';
import HelpCommand from './core/cli-command/helper.command.js';
import VersionCommand from './core/cli-command/version.command.js';
import ImportCommand from './core/cli-command/import.command.js';
import GenerateCommand from './core/cli-command/generate-command.js';
import ImportCitiesCommand from './core/cli-command/import-cities.command.js';

const manager = new CLIApplication();
manager.registerCommands([
  new HelpCommand(),
  new VersionCommand(),
  new ImportCommand(),
  new GenerateCommand(),
  new ImportCitiesCommand(),
]);
manager.processCommand(process.argv);
