import { BoardEntity, TaskEntity } from "@/domain/board-entities";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TaskService } from "@/apis/tasks/taskService";
import { useTaskStore } from "@/stores/taskStore";
import { BoardService } from "@/apis/board/boardService";

function UpdateTask({
  task,
  isOpen,
  setDialogOpen,
}: {
  task: TaskEntity;
  isOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}) {
  const [editTask, setTask] = useState<TaskEntity>(task);
  const { data: boards } = useQuery<BoardEntity[]>({queryKey:["boards"], queryFn: async () => await BoardService.getAllBoards()});
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (task: TaskEntity) => await TaskService.updateTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onMutate: () => {
      setDialogOpen(false);
    },
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate(editTask); // Call the mutation to update the task
  };
  const handleOnChange = useCallback((e: any) => {
    const value = e.target.value;

    setTask((prev) => ({
      ...prev,
      title: value,
    }));
  }, []);

  const handleOnSelect = useCallback((value: string) => {
    setTask((prev) => ({
      ...prev,
      boardId: Number.parseInt(value),
    }));
  }, []);
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
                  {boards?.map((board) => (
                    <SelectItem key={board.id} value={board.id.toString()}>
                      {board.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateTask;
