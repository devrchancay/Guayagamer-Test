import { combineReducers } from 'redux';

import talks from './talks';
import rooms from './rooms';

const rootReducers = combineReducers({ talks, rooms });

export default rootReducers;
