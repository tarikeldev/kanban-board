// src/api/task-service.js
import { TaskEntity } from "@/domain/board-entities";
import axiosBase from "../base/axiosBase";

// Create axios instance with base configuration
const apiClient = axiosBase
// Task endpoints
const TASKS_URL = '/tasks';

// Task service functions
export const TaskService = {
  // Get all tasks
  getAllTasks: async () => {
    const response = await apiClient.get(TASKS_URL);
    return response.data;
  },

  // Get a task by ID
  getTaskById: async (id: number) => {
    const response = await apiClient.get(`${TASKS_URL}/${id}`);
    return response.data;
  },

  // Create a new task
  createTask: async (taskData: TaskEntity) => {
    const response = await apiClient.post(TASKS_URL, taskData);
    return response.data;
  },

  // Update an existing task
  updateTask: async (task: { id: number; }) => {
    const response = await apiClient.put(`${TASKS_URL}/${task.id}`, task);
    return response.data;
  },

  // Delete a task
  deleteTask: async (id: number) => {
    const response = await apiClient.delete(`${TASKS_URL}/${id}`);
    return response.data;
  },

  // Get tasks by board ID
  getTasksByBoardId: async (boardId: number) => {
    const response = await apiClient.get(TASKS_URL);
    // Filter tasks by boardId on the client side
    // Note: If your API supports filtering, use a query parameter instead
    return response.data.filter((task: { boardId: number; }) => task.boardId === boardId);
  }
};