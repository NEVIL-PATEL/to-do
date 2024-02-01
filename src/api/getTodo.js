import { apiInstance } from "./apiInstance";

export const getTodo = async (pagination) => {
    const { data } = await apiInstance.get(`/todos?_page=${pagination.currentPage}&_limit=${pagination.limit}&q=${pagination.sdata}`);
    return data
}
export const getSingleTodo = async (id) => {
    const { data } = await apiInstance.get(`/todos/${id}`);
    return data
}

