import {logout} from "../store/userSlice";
import store from '../store';

const GeneralHelper = {
	callLogout(): void {
		store.dispatch(logout());
	},
}

export default GeneralHelper;
