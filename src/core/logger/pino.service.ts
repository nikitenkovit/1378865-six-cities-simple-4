import { LoggerInterface } from './logger.interface.js';
import {Logger, pino, TransportTargetOptions} from 'pino';
import { injectable } from 'inversify';

const targets: TransportTargetOptions[] = [
  {
    level: 'info',
    target: 'pino/file',
    options: {},
  },
  {
    level: 'info',
    target: 'pino/file',
    options: {
      destination: './logs/info.log',
    },
  },
  {
    level: 'debug',
    target: 'pino/file',
    options: {
      destination: './logs/debug.log',
    },
  },
  {
    level: 'warn',
    target: 'pino/file',
    options: {
      destination: './logs/warn.log',
    },
  },
  {
    level: 'error',
    target: 'pino/file',
    options: {
      destination: './logs/error.log',
    },
  },
];

@injectable()
export default class PinoService implements LoggerInterface {
  private readonly logger: Logger;

  constructor() {
    this.logger = pino({ transport: { targets } });
    this.logger.info('Logger created…');
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    this.logger.error(message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
