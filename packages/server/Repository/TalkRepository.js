import Talk from '../Models/Talk';
import Repository from './index';

class TalkRepository extends Repository {
  Model = Talk;
}

export default TalkRepository;
