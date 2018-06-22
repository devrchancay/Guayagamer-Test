import { RECEIVED_ROOMS } from '../actions/rooms/actions';

const rooms = (state = {}, action) => {
  switch (action.type) {
    case RECEIVED_ROOMS:
      return { ...state, data: { ...action.rooms } };
    default:
      return state;
  }
};

export default rooms;
