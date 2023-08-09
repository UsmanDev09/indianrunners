import { createLogger, transports, format } from 'winston'
import moment from 'moment'

const timestamps = moment().format('YYYY-MM-DD')

const logger = createLogger({
    transports: [
        new transports.File({
            dirname: 'logs',
            filename: `logs-${timestamps}`,
            level: 'info',
            format: format.combine(format.colorize(), format.timestamp(), format.json())
        }),
        new transports.Console()
    ]
})  

export default logger