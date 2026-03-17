import { fetchWithAuth } from "./index";

export const getAll = async ({ page = 1, limit = 10, withoutPagination = false } = {}) => {
    return fetchWithAuth(withoutPagination ? `categories?withoutPagination=1` : `categories?page=${page}&limit=${limit}`);
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

