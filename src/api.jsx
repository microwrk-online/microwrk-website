import axios from "axios";

const API_BASE = "http://localhost:8000/api";  // Backend URL

// Fetch video info
export const getVideoInfo = async (url) => {
  try {
    const response = await axios.post(`${API_BASE}/extract/info`, { url });
    return response.data;
  } catch (error) {
    console.error("Error fetching video info:", error);
    throw error;
  }
};

// Automatically extract chapters right after fetching video info
export const extractChapters = async (url) => {
  try {
    const response = await axios.post(`${API_BASE}/extract`, { url });
    return response.data;
  } catch (error) {
    console.error("Error extracting chapters:", error);
    throw error;
  }
};
