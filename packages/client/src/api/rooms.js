import endpoints from './endpoints';
import Resources from './resources';

class Rooms extends Resources {
  resource = endpoints.room;
}

export default Rooms;
