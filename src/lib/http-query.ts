import { type QueryKey, queryOptions } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";
import { httpClient } from "@/lib/http-client";

export function createHttpQueryOptions<TData>(
	queryKey: QueryKey,
	request: AxiosRequestConfig,
) {
	return queryOptions({
		queryKey,
		queryFn: async ({ signal }) => {
			const response = await httpClient.request<TData>({
				...request,
				signal,
			});

			return response.data;
		},
	});
}
