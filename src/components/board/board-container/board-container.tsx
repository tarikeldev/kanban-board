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
function BoardContainer({addTask} : {addTask: TaskEntity}) {
  console.log("adddTas",addTask);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {BoardCards(addTask)}
    </div>
  );
}

function BoardCards(addTask : TaskEntity) {

  const [listTasks, setTasks] = useState<TaskEntity[]>(tasks);
  const [getTask, setTaskDrag] = useState<TaskEntity>();
  addTask.id = listTasks.length + 1
  useEffect(() => {
    if (addTask && addTask.title && addTask.boardId) {
      setTasks(prevTasks => [...prevTasks, addTask]);
    }
}, [addTask]); 
  console.log("dddd listTasks",listTasks);

  const handleOnDrop = (e :any, id: number) => {
    e.preventDefault()    
    if (typeof getTask == 'object' && listTasks.length > 0 && id > 0) {
      getTask.boardId = id;
      setTasks([...listTasks]);
    }
  };

  const handleOnDragOver = (e: React.DragEvent)=> {
    e.preventDefault()
  }

  return boards.map((card) => (
    <Card key={card.id}
      className="border-gray-200 rounded-lg bg-white"
      
      onDragOver={handleOnDragOver}
      onDrop={(e)=>handleOnDrop(e,card.id)}>
      <CardHeader>
        <CardTitle>{card.title}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent key={card.id}>
        {listTasks
          .filter((x) => x.boardId == card.id)
          .map((task: TaskEntity) => {
            return (
              <div key={task.id} className="grid gap-10" >
                <BoardTask getTask={setTaskDrag} task={task} />
              </div>
            );
          })}
      </CardContent>
 
    </Card>
  ));
}

export default BoardContainer;
