import { API_URL } from "./index";


export const getAllCategories = async () => {
    const response = await fetch(`${API_URL}categories`);
    return await response.json();
};
