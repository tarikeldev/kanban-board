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
import { useEffect, useState } from "react";
import { useTaskStore } from "@/stores/taskStore";

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

function BoardCards() {
  const { newTask, updatedTask, draggedTask, tasks, setListTasks } = useTaskStore();

  useEffect(() => {
    if (updatedTask && updatedTask.title && updatedTask.boardId) {
      setListTasks(
        tasks.map((x) => (x.id === updatedTask.id ? updatedTask : x))
      );
    }
  }, [updatedTask]);

  useEffect(() => {
    if (newTask && newTask.title && newTask.boardId) {
      const addedTask = { ...newTask, id: tasks.length + 1 };
      setListTasks([...tasks, newTask]);
    }
  }, [newTask]);

  const handleOnDrop = (id: number) => {
    if (draggedTask && typeof draggedTask === "object") {
      const updatedTask = { ...draggedTask, boardId: id };
      setListTasks(
        tasks.map((task) => (task.id === draggedTask.id ? updatedTask : task))
      );
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
        {tasks
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
