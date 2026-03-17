import { fetchWithAuth } from "./index";

export const getAll = async ({ page = 1, limit = 10, withoutPagination = false } = {}) => {
    return fetchWithAuth(withoutPagination ? `tags?withoutPagination=1` : `tags?page=${page}&limit=${limit}`);
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
