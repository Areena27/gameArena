import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await axiosInstance({
      url: endpoint,
      method: options.method || "GET",
      data: options.body ? JSON.parse(options.body) : options.data,
      params: options.params,
      headers: {
        ...options.headers,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const statusText = error.response.statusText;
      const serverMessage = error.response.data?.message || error.response.data?.error;
      // If server didn't return JSON with `message`, show status so it's debuggable (e.g. 404 Not Found)
      throw new Error(serverMessage || `${status} ${statusText} (API: ${endpoint})`);
    } else if (error.request) {
      // Request made but no response received
      throw new Error("Network error. Please check your connection.");
    } else {
      // Something else happened
      throw new Error(error.message || "An error occurred");
    }
  }
};

// Auth API
export const authAPI = {
  login: async (credentials) => {
    return apiRequest("/auth/login", {
      method: "POST",
      data: credentials,
    });
  },

  signup: async (userData) => {
    return apiRequest("/auth/signup", {
      method: "POST",
      data: userData,
    });
  },

  logout: async () => {
    return apiRequest("/auth/logout", {
      method: "GET",
    });
  },
};

// User API
export const userAPI = {
  getUser: async () => {
    return apiRequest("/user", {
      method: "GET",
    });
  },

  updateUser: async (userId, userData) => {
    return apiRequest(`/user/${userId}`, {
      method: "PATCH",
      data: userData,
    });
  },

  followUser: async (userId) => {
    return apiRequest("/user/follow", {
      method: "POST",
      data: { userId },
    });
  },

  unfollowUser: async (userId) => {
    return apiRequest("/user/unfollow", {
      method: "POST",
      data: { userId },
    });
  },

  getFollowers: async () => {
    return apiRequest("/user/followers", {
      method: "GET",
    });
  },

  getFollowing: async () => {
    return apiRequest("/user/following", {
      method: "GET",
    });
  },

  getUserStats: async (userId = null) => {
    return apiRequest("/user/stats", {
      method: "GET",
      params: userId ? { id: userId } : {},
    });
  },
};

// Game API
export const gameAPI = {
  // Create game (developer only)
  createGame: async (gameData) => {
    return apiRequest("/game", {
      method: "POST",
      data: gameData,
    });
  },

  getGameStats: async () => {
    return apiRequest("/game/stats", {
      method: "GET",
    });
  },

  // List all approved games
  listAllGames: async (params = {}) => {
    return apiRequest("/game", {
      method: "GET",
      params: params,
    });
  },

  // Approve game (admin only)
  approveGame: async (gameId) => {
    return apiRequest(`/game/approve/${gameId}`, {
      method: "PATCH",
    });
  },

  // List pending games (admin only)
  listPendingGames: async (params = {}) => {
    return apiRequest("/game/pending", {
      method: "GET",
      params: params,
    });
  },

  // List developer's games (developer only)
  listDeveloperGames: async (params = {}) => {
    return apiRequest("/game/developerlist", {
      method: "GET",
      params: params,
    });
  },

  // Update game (developer only)
  updateGame: async (gameId, gameData) => {
    return apiRequest(`/game/${gameId}`, {
      method: "PATCH",
      data: gameData,
    });
  },

  // Reject game (admin only)
  rejectGame: async (gameId) => {
    return apiRequest(`/game/reject/${gameId}`, {
      method: "DELETE",
    });
  },
};

// Review API
export const reviewAPI = {
  // Create review
  createReview: async (reviewData) => {
    return apiRequest("/game/review", {
      method: "POST",
      data: reviewData,
    });
  },

  // Update review
  updateReview: async (reviewId, reviewData) => {
    return apiRequest(`/game/review/${reviewId}`, {
      method: "PATCH",
      data: reviewData,
    });
  },

  // Delete review
  deleteReview: async (reviewId) => {
    return apiRequest(`/game/review/${reviewId}`, {
      method: "DELETE",
    });
  },
};