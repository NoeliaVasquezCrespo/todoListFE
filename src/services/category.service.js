import { API_URL } from "./index";

export const getAllCategories = async () => {
    const response = await fetch(`${API_URL}categories`);
    return await response.json();
};

export const create = async (category) => {
    const response = await fetch(`${API_URL}categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(category),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
};

