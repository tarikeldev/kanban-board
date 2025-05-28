import { TaskEntity } from "@/domain/board-entities";
import { useState } from "react";
import UpdateTask from "../tasks/update-task/update-task";
import { useTaskStore } from "@/stores/taskStore";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Calendar, User2 } from "lucide-react";
import priority from "@/domain/enums/priority";
import { Badge } from "@/components/ui/badge";

interface taskProps {
  task: TaskEntity;
}

function BoardTask({ task }: taskProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setDraggedTask = useTaskStore((state) => state.setDraggedTask);

  const handleDrag = (currentTask: TaskEntity) => {
    setDraggedTask(currentTask);
  };
  const handleUpdate = () => {
    setIsOpen(true);
  };

  const getInitials = (name?: string) => {
    if (!name) return "NA";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  function getBorderColorByPriority() {
    switch (task.priority) {
      case 1:
        return "border-l-4  border-blue-400 hover:bg-blue-50";
      case 2:
        return "border-l-4  border-yellow-400 hover:bg-yellow-50";
      case 3:
        return "border-l-4  border-red-400 hover:bg-red-50";
      default:
        return "border-l-4  border-gray-300 hover:bg-gray-50";
    }
  }


  function getVariantByPriority(){
    switch (task.priority) {
      case 1:
        return "default";
      case 2:
        return "secondary";
      case 3:
        return "destructive";
        case undefined:
      case null:  
        return null;
    }
  }

  return (
    <div>
      <div
        className={`rounded-xl border hover:bg-gray-50 bg-white shadow-md p-4 mt-6 cursor-pointer hover:shadow-lg transition-all duration-200 group ${getBorderColorByPriority()}`}
        
        draggable
        onDragStart={() => handleDrag(task)}
        onClick={handleUpdate}
      >
        <div className="flex items-center h-12 gap-3 mb-2">
          <div className="flex-shrink-0">
            <Avatar className="h-8 w-8 border border-gray-300">
              <AvatarFallback className="w-100">{getInitials(task.username)}</AvatarFallback>
            </Avatar>
          </div>
   <div className="flex flex-col flex-1 w-0">
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-gray-900 line-clamp-1">
                {task.title}
              </p>
              <Badge
                variant={getVariantByPriority()}
                className="ml-1 px-2 py-0.5 text-xs font-medium rounded-full"
              >
                {task.priority ? priority[task?.priority] : ""}
              </Badge>
            </div>
            {task.description && (
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 truncate">
                {task.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <User2 className="w-4 h-4" />
            <span>{task.username || "Unassigned"}</span>
          </div>
          {(
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>
                {task?.createdAt
                  ? new Date(task.createdAt).toLocaleDateString()
                  : ""}
              </span>            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <UpdateTask task={task} isOpen={isOpen} setDialogOpen={setIsOpen} />
      )}
    </div>
  );
}

export default BoardTask;
