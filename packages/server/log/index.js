import chalk from 'chalk';

const logger = (str, level = 0) => {
  const _str = `[app] ${str}`;
  switch (level) {
    case 0:
      console.log(chalk.blue(_str));
      break;
    case 1:
      console.log(chalk.yellow(_str));
      break;
    case 2:
      console.log(chalk.red(_str));
      break;
    default:
      console.log(chalk.blue(_str));
      break;
  }
};

export default {
  log: str => logger(str),
  warning: str => logger(str, 1),
  error: str => logger(str, 2),
};
