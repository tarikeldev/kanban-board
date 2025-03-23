import TaskEntity from "@/domain/board-entities";
import { useState } from "react";

interface taskProps {
  getTask : (task : TaskEntity) => void;
  task: TaskEntity;
}



function BoardTask({getTask,task}: taskProps) {
  const [taskDrag, setTaskDrag] = useState(task);
  const handleDrag = (currentTask: TaskEntity) => {
    setTaskDrag(currentTask);
    getTask(taskDrag)
  };
  return (
    <div className="items-center rounded-md border p-4 border-t-8 border-t-cyan-500 mt-6 cursor-gra" data-item={task} draggable onDragStart={e=>handleDrag(task)} >
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{task.title}</p>
        <p className="text-sm text-muted-foreground">{task.assigne}</p>
      </div>
    </div>
  );
}

export default BoardTask;
