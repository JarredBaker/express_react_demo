import {AxiosResponse} from 'axios';
import api from "./baseApi";

interface StarWarsApiResponse extends ApiResponse {
	data: Array<StarWarsPerson | null>;
}


const StarWarsApiService = {
	search(queryParams: Record<string, any> = {}): Promise<AxiosResponse<StarWarsApiResponse>> {
		return api.get('/star-wars/search', {params: queryParams});
	},
};

export default StarWarsApiService;
