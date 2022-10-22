import { createLogger, format, transports, addColors } from 'winston';
import 'winston-daily-rotate-file';
import * as fs from 'fs';

const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

// https://lovemewithoutall.github.io/it/winston-example/
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const config = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        info: 3,
        data: 4,
        verbose: 5,
        silly: 6,
        custom: 7
    },
    colors: {
        error: 'red',
        debug: 'blue',
        warn: 'yellow',
        info: 'green',
        data: 'magenta',
        verbose: 'cyan',
        silly: 'grey',
        custom: 'yellow'
    }
}

addColors(config.colors);

const dailyRotateFileTransport = new transports.DailyRotateFile({
    level: 'debug',
    filename: `${logDir}/%DATE%-smart-push.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});

const logger = createLogger({
    level: env === 'development' ? 'debug' : 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.json(),
    ),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.printf(
                    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
                ),
            ),
        }),
        dailyRotateFileTransport,
    ],
});

export default logger;
