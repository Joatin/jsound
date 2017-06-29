import winston = require('winston');
import LeveledLogMethod = winston.LeveledLogMethod;
import LogMethod = winston.LogMethod;

export abstract class Logger {
  public log: LogMethod;

  // for cli levels
  public error: LeveledLogMethod;
  public warn: LeveledLogMethod;
  public help: LeveledLogMethod;
  public data: LeveledLogMethod;
  public info: LeveledLogMethod;
  public debug: LeveledLogMethod;
  public prompt: LeveledLogMethod;
  public verbose: LeveledLogMethod;
  public input: LeveledLogMethod;
  public silly: LeveledLogMethod;
}
