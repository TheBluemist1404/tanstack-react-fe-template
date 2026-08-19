import axios, {
	type AxiosInstance,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from "axios";

type MaybePromise<T> = T | Promise<T>;

export interface HttpInterceptorHandlers {
	onRequest?: (
		config: InternalAxiosRequestConfig,
	) => MaybePromise<InternalAxiosRequestConfig>;
	onRequestError?: (error: unknown) => MaybePromise<InternalAxiosRequestConfig>;
	onResponse?: (response: AxiosResponse) => MaybePromise<AxiosResponse>;
	onResponseError?: (error: unknown) => MaybePromise<AxiosResponse>;
}

export const httpClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
	headers: {
		Accept: "application/json",
	},
});

const reject = (error: unknown) => Promise.reject(error);

export function registerHttpInterceptors(
	handlers: HttpInterceptorHandlers = {},
	client: AxiosInstance = httpClient,
) {
	const requestInterceptorId = client.interceptors.request.use(
		handlers.onRequest ?? ((config) => config),
		handlers.onRequestError ?? reject,
	);
	const responseInterceptorId = client.interceptors.response.use(
		handlers.onResponse ?? ((response) => response),
		handlers.onResponseError ?? reject,
	);

	return () => {
		client.interceptors.request.eject(requestInterceptorId);
		client.interceptors.response.eject(responseInterceptorId);
	};
}

registerHttpInterceptors();
