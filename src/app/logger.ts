import winston = require('winston');
import LeveledLogMethod = winston.LeveledLogMethod;
import LogMethod = winston.LogMethod;

export abstract class Logger {
  log: LogMethod;

  // for cli levels
  error: LeveledLogMethod;
  warn: LeveledLogMethod;
  help: LeveledLogMethod;
  data: LeveledLogMethod;
  info: LeveledLogMethod;
  debug: LeveledLogMethod;
  prompt: LeveledLogMethod;
  verbose: LeveledLogMethod;
  input: LeveledLogMethod;
  silly: LeveledLogMethod;
}
