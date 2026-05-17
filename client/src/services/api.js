const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

const request = (path, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };

  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`${API_BASE}${path}`, { ...options, headers })
    .then(async (res) => {
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.status === false) {
        throw new Error(data.message || data.error || "Something went wrong");
      }
      return data;
    });
};

export const authApi = {
  register: (data) => request("/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data) => request("/login", { method: "POST", body: JSON.stringify(data) }),
  profile: () => request("/profile"),
  updateProfile: (data) => request("/updateProfile", { method: "PATCH", body: JSON.stringify(data) }),
};

export const postApi = {
  getAll: () => request("/post"),
  getMy: () => request("/myPost"),
  create: (data) => request("/create", { method: "POST", body: JSON.stringify(data) }),
  like: (id) => request(`/like/${id}`, { method: "PATCH" }),
  remove: (id) => request(`/delete/${id}`, { method: "DELETE" }),
  comments: (postId) => request(`/get/${postId}`),
  addComment: (postId, comment) => request(`/comment/${postId}`, { method: "POST", body: JSON.stringify({ comment }) }),
};
