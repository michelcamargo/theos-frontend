export type PaginationOptions = {

}

export type PaginatedResponse<T> = {
	total_count: number,
	incompleteResults: boolean,
	items: Array<T>,
}
