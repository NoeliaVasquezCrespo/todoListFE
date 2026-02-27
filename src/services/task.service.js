import { fetchWithAuth } from "./index";

export const getAll = async (page = 1) => {
    return fetchWithAuth(`tasks?page=${page}`);
};

export const getOne = async (id) => {
    return fetchWithAuth(`tasks/${id}`);
};

export const create = async (data) => {
    return fetchWithAuth("tasks", {
        method: "POST",
        body: JSON.stringify(data)
    });
};

export const update = async (id, data) => {
    return fetchWithAuth(`tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
};

export const remove = async (id) => {
    return fetchWithAuth(`tasks/${id}`, {
        method: "DELETE"
    });
};
