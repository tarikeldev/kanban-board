import TaskEntity from "@/domain/board-entities";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";
import { boards } from "../../board-container/board-container";
import { useState } from "react";

function UpdateTask({ task, isOpen, setDialogOpen, taskUpdate }: 
                    { task: TaskEntity, isOpen : boolean, 
                      setDialogOpen:  (open:boolean) => void, 
                      taskUpdate:(task:TaskEntity)=>void}) {
  const [editTask, setTask] = useState<TaskEntity>(task);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    taskUpdate(editTask);
   };
  const handleOnChange = (e: any) => {
    const value = e.target.value;
    setTask((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleOnSelect = (value: string) => {
    setTask((prev) => ({
      ...prev,
      boardId: Number.parseInt(value),
    }));
  };
  return (
    <Dialog open={isOpen} onOpenChange={setDialogOpen}>
        
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4 py-4">
            <div className="grid flex-1 gap-2">
              <Input
                type="text"
                placeholder="Task name"
                 name="title"
                 value={editTask.title}
                onChange={handleOnChange}
              />
            </div>
            <div className="grid flex-1 gap-2">
              <Select
                name="boardId"
                value={editTask.boardId?.toString() ?? "1"}
                onValueChange={handleOnSelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select board" />
                </SelectTrigger>
                <SelectContent>
                  {boards.map((board) => (
                    <SelectItem key={board.id} value={board.id.toString()}>
                      {board.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>

            <Button type="submit" onClick={() => setDialogOpen(false)}>Submit</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateTask