import { apiInstance } from "./apiInstance";

const putTodo = async ({ id, todo }) => {
    const { data } = await apiInstance.put(`/todos/${id}`, {todo})
    return data

}
export default putTodo;