import TaskEntity from "@/domain/board-entities";
import { useEffect, useState } from "react";
import UpdateTask from "../tasks/update-task/update-task";
import { useTaskStore } from "@/stores/taskStore";

interface taskProps {
  task: TaskEntity;
}

function BoardTask({ task }: taskProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setDraggedTask = useTaskStore((state) => state.setDraggedTask)
  
 
  const handleDrag = (currentTask: TaskEntity) => {
    setDraggedTask(currentTask);
    
  };
  const handleUpdate = () => {
    setIsOpen(true)
  }
  return (
    <div>

      <div
        className="items-center rounded-md border p-4 border-t-8 border-t-cyan-500 mt-6 cursor-pointer hover:bg-gray-200 duration-300 ease-in-out"        
        draggable
        onDragStart={() => handleDrag(task)}
        onClick={handleUpdate}
      >
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">{task.title}</p>
          <p className="text-sm text-muted-foreground">{task.assigne}</p>
        </div>
      </div>
      {isOpen && (
        <UpdateTask task={task} isOpen={isOpen} setDialogOpen={setIsOpen} />
      )}

    </div>
  );
}

export default BoardTask;
