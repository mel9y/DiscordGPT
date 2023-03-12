import { log, LogRecord } from '../deps.ts';

const formatter = (record: LogRecord) => {
  const { datetime, levelName, msg } = record;

  const date = new Date(
    datetime.getTime() - datetime.getTimezoneOffset() * 6e4,
  );
  const logTime = date.toISOString().slice(0, -5) +
    date.toString().replace(/^.*GMT([-+]\d{2})(\d{2}).*$/, '$1:$2');

  return `[${logTime} - ${levelName}] ${msg}`;
};

log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler('DEBUG', {
      formatter,
    }),
  },

  loggers: {
    default: {
      level: 'DEBUG',
      handlers: ['console'],
    },
  },
});

const logger = log.getLogger();
export { logger };
