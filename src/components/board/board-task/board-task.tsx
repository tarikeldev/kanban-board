import TaskEntity from "@/domain/board-entities";
import { useState } from "react";
import UpdateTask from "../tasks/update-task/update-task";

interface taskProps {
  getTask: (task: TaskEntity) => void;
  task: TaskEntity;
  getUpdateTask: (task: TaskEntity) => void;
}

function BoardTask({ getTask, task, getUpdateTask }: taskProps) {
  const [taskDrag, setTaskDrag] = useState(task);
  const [isOpen, setIsOpen] = useState(false);

   const getUpdated = (updatedTask: TaskEntity)=>{    
    getUpdateTask(updatedTask);
  }
  const handleDrag = (currentTask: TaskEntity) => {
    setTaskDrag(currentTask);
    getTask(taskDrag);
  };
  const handleUpdate = (e:any) => {
    e.preventDefault();

    setIsOpen(true)
  }
  return (
    <div>

      <div
        className="items-center rounded-md border p-4 border-t-8 border-t-cyan-500 mt-6 cursor-pointer hover:bg-gray-200 duration-300 ease-in-out"
        data-item={task}
        draggable
        onDragStart={() => handleDrag(task)}
        onClick={handleUpdate}
      >
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">{task.title}</p>
          <p className="text-sm text-muted-foreground">{task.assigne}</p>
        </div>
      </div>
      <UpdateTask task={task} isOpen={isOpen} setDialogOpen={setIsOpen} taskUpdate={getUpdated} />

    </div>
  );
}

export default BoardTask;
