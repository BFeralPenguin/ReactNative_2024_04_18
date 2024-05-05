import {Pizza} from '@types';

export default {
  get pizzas(): Pizza[] {
    return require('./pizzas.json');
  },
};
