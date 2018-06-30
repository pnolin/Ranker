import winston from 'winston';

winston.configure({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: 'debug'
    }),
    new winston.transports.File({
      colorize: true,
      filename: 'logs.log',
      json: true,
      level: 'info',
      maxsize: 5242880
    })
  ]
});

export default winston;
