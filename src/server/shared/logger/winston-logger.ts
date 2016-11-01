import {Logger} from "./logger";
import * as winston from 'winston';
import {LoggerInstance} from "winston";

const container = new winston.Container({});

export class WinstonLogger implements Logger {
    private logger: LoggerInstance;
    public constructor(
        private category: string
    ) {
        container.add(category, {
            console: {
                level: 'silly',
                colorize: true,
                label: category
            }
        });
        this.logger = container.get(category);
    }

    public silly(msg?: string, meta?: Object){
        this.logger.log('silly', msg || null, meta || null);
    }

    public debug(msg?: string, meta?: Object){
        this.logger.debug(msg || null, meta || null);
    }

    public verbose(msg?: string, meta?: Object){
        this.logger.log('verbose', msg || null, meta || null);
    }

    public info(msg?: string, meta?: Object){
        this.logger.info(msg || null, meta || null);
    }

    public warn(msg?: string, meta?: Object){
        this.logger.warn(msg || null, meta || null);
    }

    public error(msg?: string, meta?: Object){
        this.logger.error(msg || null, meta || null);
    }
}