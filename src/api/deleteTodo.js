import { apiInstance } from "./apiInstance";

const deleteTodo = async (id) => {
    const { data } = await apiInstance.delete(`/todos/${id}`);
    return data;
};

export default deleteTodo