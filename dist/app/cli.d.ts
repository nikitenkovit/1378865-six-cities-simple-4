import { CliCommandInterface } from '../core/cli-command/cli-command.interface';
export default class CLIApplication {
    private commands;
    private defaultCommand;
    private parseCommand;
    getCommand(commandName: string): CliCommandInterface;
    processCommand(argv: string[]): void;
    registerCommands(commandList: CliCommandInterface[]): void;
}
