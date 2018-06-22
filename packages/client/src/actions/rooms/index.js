import { RECEIVED_ROOMS } from './actions';
import { loading, success } from '../talks';
import Rooms from '../../api/rooms';

export const receivedRooms = rooms => ({
  type: RECEIVED_ROOMS,
  rooms,
});

export const generateRooms = () => async dispatch => {
  dispatch(loading());
  const r = new Rooms();
  const request = await r.storeResource({});
  if (request.status === 200) {
    dispatch(success(request.data.message));
  }
  dispatch(loading(false));
};

export const fetchRooms = () => async dispatch => {
  dispatch(loading());
  const r = new Rooms();
  const request = await r.fetchResource({});
  if (request.status === 200) {
    dispatch(receivedRooms(request.data));
  }
};
