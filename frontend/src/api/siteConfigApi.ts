import {AxiosResponse} from 'axios';
import api from "./baseApi";

interface CacheOffsetParams {
	cacheOffSet: number;
}

interface SiteConfigApiResponse extends ApiResponse {
	message: string;
}

interface OffsetApiResponse extends ApiResponse {
	offset: number;
}

const SiteConfigApiService = {
	updateCacheOffset(cacheOffsetParams: CacheOffsetParams): Promise<AxiosResponse<SiteConfigApiResponse>> {
		return api.post('/site-config/update-cache-offset', cacheOffsetParams);
	},
	getCacheOffset(): Promise<AxiosResponse<OffsetApiResponse>> {
		return api.get('/site-config/offset');
	},
};

export default SiteConfigApiService;
