import { API_URL } from "./index";

export const getAll = async () => {
    const response = await fetch(`${API_URL}categories`);
    return await response.json();
};

export const getOne = async (id) => {
    const response = await fetch(`${API_URL}categories/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener la categoría");
    }

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
