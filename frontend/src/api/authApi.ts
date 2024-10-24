import {AxiosResponse} from 'axios';
import api from "./baseApi";

interface UserParams {
	email: string;
	password: string;
	firstname: string;
	surname: string;
}

interface UserApiResponse extends ApiResponse {
	data: {
		user: UserType;
		token: string;
	}
}


const AuthApiService = {
	signUp(userData: UserParams): Promise<AxiosResponse<UserApiResponse>> {
		return api.post('/signup', userData);
	},

	login(userData: Omit<UserParams, 'firstname'| 'surname'>): Promise<AxiosResponse<any>> {
		return api.post('/login', userData);
	},
};

export default AuthApiService;
