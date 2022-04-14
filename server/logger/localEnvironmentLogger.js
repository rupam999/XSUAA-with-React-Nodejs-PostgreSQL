import winston from 'winston';

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${level}] ${timestamp} ${message}`;
});

export const localEnvironmentLogger = () => {
  return createLogger({
    level: 'debug',
    format: combine(colorize(), timestamp({ format: 'HH:mm:ss' }), myFormat),
    // defaultMeta: { service: 'user-service' },
    transports: [new transports.Console()],
  });
};
