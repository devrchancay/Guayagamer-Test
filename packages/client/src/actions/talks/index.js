import {
  LOADING,
  SUCCESS,
  ERROR,
  RECEIVE_TALKS,
  ACCUMULATE,
  INIT,
} from './actions';
import Talks from '../../api/talks';

export const loading = (status = true) => ({
  type: LOADING,
  status,
});

export const success = message => ({
  type: SUCCESS,
  message,
});

export const error = messages => ({
  type: ERROR,
  messages,
});

export const init = () => ({
  type: INIT,
});

export const receiveTalks = talks => ({
  type: RECEIVE_TALKS,
  talks,
});

export const acumulate = duration => ({
  type: ACCUMULATE,
  duration,
});

export const storageTalks = newTalk => async dispatch => {
  dispatch(loading());
  const talk = new Talks();
  const res = await talk.storeResource(newTalk);
  if (res.status === 200) {
    dispatch(success('La charla se guardo con exito'));
  } else {
    dispatch(error(res.data));
  }
  dispatch(loading(false));
};

export const fetchTalks = () => async dispatch => {
  dispatch(loading());
  const talk = new Talks();
  const res = await talk.fetchResource({});
  if (res.status === 200) {
    dispatch(receiveTalks(res.data));
    dispatch(init());
    res.data.docs.forEach(item => {
      dispatch(acumulate(item.duration));
    });
  }
  dispatch(loading(false));
};
