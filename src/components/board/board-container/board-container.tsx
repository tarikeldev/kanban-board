import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "./board-container.css";
import BoardTask from "../board-task/board-task";
import TaskEntity from "@/domain/board-entities";
import { useTaskStore } from "@/stores/taskStore";
import { TaskService } from "@/apis/tasks/taskService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const boards: any[] = [
  {
    id: 1,
    title: "To Do",
    //order: 1 //means which column the board exist
    tasks: new Array<TaskEntity>(),
  },
  {
    id: 2,
    title: "In Progress",
    //order: 1 //means which column the board exist
    tasks: new Array<TaskEntity>(),
  },
  {
    id: 3,
    title: "Review",
    //order: 1 //means which column the board exist
    tasks: new Array<TaskEntity>(),
  },
  {
    id: 4,
    title: "Resolved",
    //order: 1 //means which column the board exist
    tasks: new Array<TaskEntity>(),
  },
  {
    id: 5,
    title: "Testing",
    //order: 1 //means which column the board exist
    tasks: new Array<TaskEntity>(),
  },
];

function BoardContainer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {BoardCards()}
    </div>
  );
}

function  BoardCards() {
  const { draggedTask } = useTaskStore();
  const { data } = useQuery<TaskEntity[]>({queryKey:["tasks"], queryFn: async () => await TaskService.getAllTasks()});
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

  return boards.map((card) => (
    <Card
      key={card.id}
      className="border-gray-200 rounded-lg bg-white"
      onDragOver={handleOnDragOver}
      onDrop={() => handleOnDrop(card.id)}
    >
      <CardHeader>
        <CardTitle>{card.title}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        {data &&
          data
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
  ));
}

export default BoardContainer;
