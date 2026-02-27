import { fetchWithAuth } from "./index";

export const getAll = async () => {
    return fetchWithAuth("categories");
};

export const getOne = async (id) => {
    return fetchWithAuth(`categories/${id}`);
};

export const create = async (data) => {
    return fetchWithAuth("categories", {
        method: "POST",
        body: JSON.stringify(data)
    });
};

export const update = async (id, data) => {
    return fetchWithAuth(`categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
};

export const remove = async (id) => {
    return fetchWithAuth(`categories/${id}`, {
        method: "DELETE"
    });
};

