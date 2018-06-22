import app from './config/express';
import Logger from './log';

Logger.log('Starting Application');
const server = app.listen(process.env.PORT || 3000, () => {
  const message = `Listening on port ${server.address().port}`;
  Logger.log(message);
});
