const API_URL = "http://localhost:8000/api/categories";


export const getAllCategories = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};
