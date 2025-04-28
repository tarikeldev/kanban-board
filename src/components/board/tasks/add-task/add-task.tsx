import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";
import {BoardEntity, TaskEntity} from "@/domain/board-entities";
import { TaskService } from "@/apis/tasks/taskService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BoardService } from "@/apis/board/boardService";

function AddTask() {
  const [newTask, setNewTask] = useState<TaskEntity>(new TaskEntity());
  const { data: boards } = useQuery<BoardEntity[]>({queryKey:["boards"], queryFn: async () => await BoardService.getAllBoards(), staleTime: Infinity});
  const queryClient = useQueryClient();

  console.log("boards",boards);
  
  const mutation = useMutation({
    mutationFn: async (task: TaskEntity) => await TaskService.createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onMutate: () => {
      setNewTask(new TaskEntity());
    }
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate(newTask);
   
  };

  const handleOnChange = useCallback((event: any) => {
    const { name, value } = event.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleOnSelect = useCallback((value: any) => {
    setNewTask((prev) => ({ ...prev, boardId: Number(value) }));
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer hover:bg-blue-900 hover:text-white hover:ease-in-out"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription>Add a new task</DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col space-y-4 py-4">
            <div className="grid flex-1 gap-2">
              <Input
                type="text"
                placeholder="Task name"
                value={newTask.title ?? ""}
                name="title"
                onChange={handleOnChange}
              />
            </div>
            <div className="grid flex-1 gap-2">
              <Select
                name="boardId"
                value={newTask.boardId?.toString() ?? "0"}
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
            <DialogClose asChild>
              <Button type="submit">Submit</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddTask;
