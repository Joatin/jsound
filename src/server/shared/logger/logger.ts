

export interface Logger {

    silly(msg?: string, meta?: Object): void;
    debug(msg?: string, meta?: Object): void;
    verbose(msg?: string, meta?: Object): void;
    info(msg?: string, meta?: Object): void;
    warn(msg?: string, meta?: Object): void;
    error(msg?: string, meta?: Object): void;
}