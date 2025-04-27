import TaskEntity from "@/domain/board-entities";
import { create } from "zustand";

const generateTasks = (count: number): TaskEntity[] => {
  const tasks: TaskEntity[] = [];
  const assignees = ["Tarik", "Ayo", "Islam", "Alaa", "Sara", "Alex", "Mohammed", "Fatima", "John", "Priya", "Carlos", "Mei"];
  
  for (let i = 1; i <= count; i++) {
    const paddedId = i.toString().padStart(4, '0');
    const assigneeIndex = Math.floor(Math.random() * assignees.length);
    const boardId = Math.floor(Math.random() * 5) + 1; // Random board ID between 1-5
    
    tasks.push({
      id: i,
      title: `Task-${paddedId}`,
      assignee: assignees[assigneeIndex] + (Math.floor(Math.random() * 5) + 1), // Add random number suffix
      boardId: boardId,
    });
  }
  
  return tasks;
};

const stressTestTasks: TaskEntity[] = generateTasks(10);
const tasks: TaskEntity[] = stressTestTasks
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
  tasks:tasks,
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
  setListBoards: (boards: any[]) => set({ boards: boards}),
  resetStore: () => set({ tasks: [], newTask: { id: 0, title: "", boardId: 0 } }), // ✅ Reset state function
  }));

