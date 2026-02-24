import { API_URL, headers } from "./index";

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
        headers: headers,
        body: JSON.stringify(category),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
};

export const update = async (id, data) => {
    const response = await fetch(`${API_URL}categories/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la categoría");
    }

    return await response.json();
};
