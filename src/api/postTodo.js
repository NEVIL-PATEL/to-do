import { apiInstance } from "./apiInstance"

const postTodo = async (tData) => {
    const { data } = await apiInstance.post(`/todos`, tData);
    console.log(data)
    return data

}
export default postTodo