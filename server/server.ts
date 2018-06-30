import app from './app';
import logger from './config/logger';

app.listen(app.get('port'), () => {
  logger.info(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  logger.info('Press CTRL-C to stop\n');
});
