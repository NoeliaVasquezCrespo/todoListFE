import { fetchWithAuth } from "./index";

export const getAll = async (page = 1) => {
    return fetchWithAuth(`tags?page=${page}`);
};

export const getOne = async (id) => {
    return fetchWithAuth(`tags/${id}`);
};

export const create = async (data) => {
    return fetchWithAuth("tags", {
        method: "POST",
        body: JSON.stringify(data)
    });
};

export const update = async (id, data) => {
    return fetchWithAuth(`tags/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
};

export const remove = async (id) => {
    return fetchWithAuth(`tags/${id}`, {
        method: "DELETE"
    });
};
