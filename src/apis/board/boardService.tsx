// src/api/board-service.js
import { BoardEntity } from "@/domain/board-entities";
import axiosBase from "../base/axiosBase";

// Create axios instance with base configuration
const apiClient = axiosBase

// Board endpoints
const BOARDS_URL = '/boards';

// Board service functions
export const BoardService = {
  // Get all boards
  getAllBoards: async () => {
    const response = await apiClient.get(BOARDS_URL);
    return response.data;
  },

  // Get a board by ID
  getBoardById: async (id: number) => {
    const response = await apiClient.get(`${BOARDS_URL}/${id}`);
    return response.data;
  },

  // Create a new board
  createBoard: async (boardData: BoardEntity) => {
    const response = await apiClient.post(BOARDS_URL, boardData);
    return response.data;
  },

  // Update an existing board
  updateBoard: async (board: { id: number; }) => {
    const response = await apiClient.put(`${BOARDS_URL}/${board.id}`, board);
    return response.data;
  },

  // Delete a board
  deleteBoard: async (id: number) => {
    const response = await apiClient.delete(`${BOARDS_URL}/${id}`);
    return response.data;
  }
};