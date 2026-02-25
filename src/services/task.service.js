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
    const response = await fetch(`${API_URL}tasks`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error al obtener tareas");
    }

    return response.json();
};

export const getOne = async (id) => {
    const response = await fetch(`${API_URL}tasks/${id}`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error al obtener la tarea");
    }

    return response.json();
};

export const create = async (task) => {
    const response = await fetch(`${API_URL}tasks`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error("Error al crear la tarea");
    }

    return response.json();
};

export const update = async (id, task) => {
    const response = await fetch(`${API_URL}tasks/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la tarea");
    }

    return response.json();
};

export const remove = async (id) => {
    const response = await fetch(`${API_URL}tasks/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Error al eliminar la tarea");
    }

    return true;
};