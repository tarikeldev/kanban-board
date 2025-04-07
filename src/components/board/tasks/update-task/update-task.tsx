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
import { useTaskStore } from "@/stores/taskStore";

function UpdateTask({ task, isOpen, setDialogOpen }: 
                    { task: TaskEntity, isOpen : boolean, 
                      setDialogOpen:  (open:boolean) => void}) {
  const [editTask, setTask] = useState<TaskEntity>(task);
  const setUpdateTask = useTaskStore((state) => state.setUpdateTask);
  console.log("here inner update in",editTask);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setUpdateTask(editTask);

    ///this is cancels the form before submission
    setDialogOpen(false);
   };
  const handleOnChange = (e: any) => {
    const value = e.target.value;
    console.log("here inner update onChange",editTask);

    setTask((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleOnSelect = (value: string) => {
    console.log("here inner update onSelect",editTask);

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

            <Button type="submit">Submit</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateTask