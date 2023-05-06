import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            main.js --<${chalk.rgb(49, 132, 149)('command')}> [${chalk.blue('--arguments')}]
        Команды:
            ${chalk.rgb(49, 132, 149)('--version')}:                   ${chalk.magenta('# выводит номер версии')}
            ${chalk.rgb(49, 132, 149)('--help')}:                      ${chalk.magenta('# печатает этот текст')}
            ${chalk.rgb(49, 132, 149)('--import')} <path>:             ${chalk.magenta('# импортирует данные из TSV')}
            ${chalk.rgb(49, 132, 149)('--generate')} <n> <path> <url>: ${chalk.magenta('# генерирует произвольное количество тестовых данных')}
        `);
  }
}
