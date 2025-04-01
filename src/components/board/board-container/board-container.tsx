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
      assigne: assignees[assigneeIndex] + (Math.floor(Math.random() * 5) + 1), // Add random number suffix
      boardId: boardId,
    });
  }
  
  return tasks;
};

const stressTestTasks: TaskEntity[] = generateTasks(10);
const tasks: TaskEntity[] = stressTestTasks

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
  const getUpdatedTask = (task :  TaskEntity) =>{

      setTasks((prevTasks) => prevTasks.map((x) => (x.id === task.id ? task : x)))

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
                <BoardTask getTask={setTaskDrag} task={task} getUpdateTask={getUpdatedTask} />
              </div>
            );
          })}
      </CardContent>
 
    </Card>
  ));
}

export default BoardContainer;
