export const API_URL = "http://localhost:8000/api/";

export const fetchWithAuth = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");

    if (!token) {
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: options.body
    });

    if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}`);
    }

    return response.json();
};
