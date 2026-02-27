import { API_URL } from "./index";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const getAll = async () => {
    const response = await fetch(`${API_URL}tags`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error al obtener las etiquetas");
    }

    return response.json();
};

export const getOne = async (id) => {
    const response = await fetch(`${API_URL}tags/${id}`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error al obtener la etiqueta");
    }

    return response.json();
};

export const create = async (tag) => {
    const response = await fetch(`${API_URL}tags`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(tag),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    return response.json();
};

export const update = async (id, data) => {
    const response = await fetch(`${API_URL}tags/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la etiqueta");
    }

    return response.json();
};

export const remove = async (id) => {
    const response = await fetch(`${API_URL}tags/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error al eliminar la etiqueta");
    }

    return true;
};
