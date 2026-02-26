import { API_URL, headers } from "./index";

export const getAll = async () => {
    const response = await fetch(`${API_URL}tasks`);
    return await response.json();
};

export const getOne = async (id) => {
    const response = await fetch(`${API_URL}tasks/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener la tarea");
    }

    return await response.json();
};

export const create = async (task) => {
    const response = await fetch(`${API_URL}tasks`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
};

export const update = async (id, task) => {
    const response = await fetch(`${API_URL}tasks/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la tarea");
    }

    return await response.json();
};

export const remove = async (id) => {

};