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
    const response = await fetch(`${API_URL}categories`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error al obtener las categorías");
    }

    return response.json();
};

export const getOne = async (id) => {
    const response = await fetch(`${API_URL}categories/${id}`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error al obtener la categoría");
    }

    return response.json();
};

export const create = async (category) => {
    const response = await fetch(`${API_URL}categories`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(category),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    return response.json();
};

export const update = async (id, data) => {
    const response = await fetch(`${API_URL}categories/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la categoría");
    }

    return response.json();
};

export const remove = async (id) => {
    const response = await fetch(`${API_URL}categories/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error al eliminar la categoría");
    }

    return true;
};