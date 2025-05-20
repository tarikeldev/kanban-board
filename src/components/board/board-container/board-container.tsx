import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "./board-container.css";
import BoardTask from "../board-task/board-task";
import { BoardEntity, TaskEntity } from "@/domain/board-entities";
import { useTaskStore } from "@/stores/taskStore";
import { TaskService } from "@/apis/tasks/taskService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BoardService } from "@/apis/board/boardService";
import { useEffect } from "react";


function BoardContainer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {BoardCards()}
    </div>
  );
}

function  BoardCards() {
  const { draggedTask } = useTaskStore();
  const { data: tasks } = useQuery<TaskEntity[]>({queryKey:["tasks"], queryFn: async () => await TaskService.getAllTasks()});
  const { data: boards } = useQuery<BoardEntity[]>({queryKey:["boards"], queryFn: async () => await BoardService.getAllBoards(), staleTime: Infinity});
 
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (task: TaskEntity) => await TaskService.updateTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["tasks"]}); // Refresh only the task list
    },
  });
   

  const handleOnDrop = (id: number) => {
    if (draggedTask && typeof draggedTask === "object") {
      const updatedTask = { ...draggedTask, boardId: id };
      mutation.mutate(updatedTask);     
     
    }
  };

  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return boards?.map((card) => {
    const taskCount = tasks ? tasks.filter((x) => x.boardId == card.id).length : 0;
    return (
      <Card
        key={card.id}
        className="border-gray-200 rounded-lg bg-white"
        onDragOver={handleOnDragOver}
        onDrop={() => handleOnDrop(card.id)}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{card.title}</CardTitle>
            <span className="inline-block rounded-full bg-cyan-100 text-cyan-700 text-xs px-3 py-1 font-medium">
              {taskCount} Tasks
            </span>
          </div>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          {tasks &&
            tasks
              .filter((x) => x.boardId == card.id)
              .map((task: TaskEntity) => {
                return (
                  <div key={task.id} className="grid gap-10">
                    <BoardTask task={task} />
                  </div>
                );
              })}
        </CardContent>
      </Card>
    );
  });
}

export default BoardContainer;
