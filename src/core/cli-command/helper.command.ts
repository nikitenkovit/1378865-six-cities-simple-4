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
            ${chalk.rgb(49, 132, 149)('--version')}:                                                           ${chalk.magenta('# выводит номер версии')}
            ${chalk.rgb(49, 132, 149)('--help')}:                                                              ${chalk.magenta('# печатает этот текст')}
            ${chalk.rgb(49, 132, 149)('--import')} <path> <DB_USER> <DB_PASSWORD> <DB_HOST> <DB_NAME> <SALT>:  ${chalk.magenta('# импортирует данные из TSV')}
            ${chalk.rgb(49, 132, 149)('--generate')} <number> <path> <url>:                                    ${chalk.magenta('# генерирует заданное количество тестовых данных')}
            ${chalk.rgb(49, 132, 149)('--import-cities')} <DB_USER> <DB_PASSWORD> <DB_HOST> <DB_NAME>:         ${chalk.magenta('# Импортирует города')}
        `);
  }
}
