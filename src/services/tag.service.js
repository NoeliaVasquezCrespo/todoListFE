import { API_URL, headers } from "./index";

export const getAll = async () => {
    const response = await fetch(`${API_URL}tags`);
    return await response.json();
};

export const getOne = async (id) => {
    const response = await fetch(`${API_URL}tags/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener la etiqueta");
    }

    return await response.json();
};

export const create = async (tag) => {
    const response = await fetch(`${API_URL}tags`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(tag),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
};

export const update = async (id, data) => {
    const response = await fetch(`${API_URL}tags/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la etiqueta");
    }

    return await response.json();
};

export const remove = async (id) => {
    const response = await fetch(`${API_URL}tags/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Error al eliminar la etiqueta");
    }

    return true;
};
