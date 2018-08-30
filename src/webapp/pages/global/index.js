import global from './reducer';
import home from '../home/reducer';
import auth from '../auth/reducer';
import userList from  '../user/list/reducer';
import detail from '../detail/reducer';



const appReducer = {
  global,
  home,
  auth,
  userList,
  detail
};
	
	
	
	

export default appReducer;
