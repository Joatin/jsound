
import {WinstonLogger} from "../shared/logger/winston-logger";
export function run(scBroker){
    let logger = new WinstonLogger('broker');
    logger.info('hello from broker');
}