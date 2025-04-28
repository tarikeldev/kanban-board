import { BoardEntity, TaskEntity } from "@/domain/board-entities";
import { create } from "zustand";

interface TaskStore {
  tasks: TaskEntity[];
  boards: any[];
  draggedTask: TaskEntity | null;
  newTask: TaskEntity | null;
  updatedTask: TaskEntity   | null;
  isOpen: boolean | null;
  setIsOpen: (isOpen: boolean) => void;
  setNewTask: (params: { title?: string; boardId?: number }) => void;
  setUpdateTask: (task: TaskEntity) => void;
  setDraggedTask: (task: TaskEntity) => void;
  setListTasks: (tasks: TaskEntity[]) => void;
  setListBoards: (boards: any[]) => void;
  resetStore: () => void; // ✅ Reset state function
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks:[],
  boards: [],
  newTask: null,
  updatedTask: null,
  draggedTask: null,
  isOpen: null,
  setIsOpen: (isOpen: boolean) => set({ isOpen: isOpen }),
  setDraggedTask: (task: TaskEntity) => set({ draggedTask: task }),
  setNewTask: (params) => set({
    newTask: {
      id:0,
      title: params.title ?? "",
      boardId: params.boardId ?? 0,
    }}
  ),
  setUpdateTask: (task: TaskEntity) => set({
    updatedTask: task
    }),
  setListTasks: (tasks: TaskEntity[]) => set({ tasks: tasks}),
  setListBoards: (boards: BoardEntity[]) => set({ boards: boards}),
  resetStore: () => set({ tasks: [], newTask: { id: 0, title: "", boardId: 0 } }),
  }));

