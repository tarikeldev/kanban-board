import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "./board-container.css";
import BoardTask from "../board-task/board-task";
import TaskEntity from "@/domain/board-entities";
import { useState } from "react";

const tasks: TaskEntity[] = [
  {
    id: 1,
    title: "Task-0001",
    assigne: "Tarik1",
    boardId: 1,
  },
  {
    id: 2,
    title: "Task-2002",
    assigne: "Tarik2",
    boardId: 1,
  },
  {
    id: 3,
    title: "Task-333",
    assigne: "Ayo",
    boardId: 2,
  },
  {
    id: 4,
    title: "Task-444",
    assigne: "Islam",
    boardId: 3,
  },
  {
    id: 5,
    title: "Task-0001",
    assigne: "Alaa",
    boardId: 4,
  },
];
const boards: any[] = [
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
];
function BoardContainer() {
  return (
    <div className="grid grid-cols-4 m-5  card container gap-8">
      {BoardCards()}
    </div>
  );
}

function BoardCards() {

  const [listTasks, setTasks] = useState<any[]>(tasks);
  const [getTask, setTaskDrag] = useState<TaskEntity>();
  const handleDragOver = (id: number) => {
    if (getTask && listTasks.length > 0) {
      getTask.boardId = id;
      setTasks([...listTasks, (listTasks[getTask.id - 1].boardId = id)]);
    }
  };

  return boards.map((card, index) => (
    <Card
      className={"col-start" + index + 1 + "shadow-md shadow-gray-400 "}
      onDragOverCapture={(e)=>handleDragOver(card.id)}>
      <CardHeader>
        <CardTitle>{card.title}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent key={index}>
        {listTasks
          .filter((x) => x.boardId == card.id)
          .map((task: TaskEntity) => {
            return (
              <div key={task.id} className="grid gap-10 cursor-pointer">
                <BoardTask getTask={setTaskDrag} task={task} />
              </div>
            );
          })}
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ));
}

export default BoardContainer;
