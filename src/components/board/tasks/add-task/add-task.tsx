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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BoardEntity, TaskEntity } from "@/domain/board-entities";
import { TaskService } from "@/apis/tasks/taskService";
import { BoardService } from "@/apis/board/boardService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// shadcn form components
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .min(10, { message: "Title must be at least 10 characters long" }),
  boardId: z
    .number({ message: "Board is required" })
    .min(1, { message: "Board is required" }),
});

type TaskFormValues = z.infer<typeof schema>;

function AddTask() {
  const { data: boards } = useQuery<BoardEntity[]>({
    queryKey: ["boards"],
    queryFn: async () => await BoardService.getAllBoards(),
    staleTime: Infinity,
  });
  const queryClient = useQueryClient();

  const form = useForm<TaskFormValues, any, TaskFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      boardId: undefined,
    },
    mode: "all",
  });

  const mutation = useMutation({
    mutationFn: async (task: TaskEntity) => await TaskService.createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      form.reset();
    },
  });

  function onSubmit(values: TaskFormValues) {
    const task = new TaskEntity();
    task.title = values.title;
    task.boardId = values.boardId;
    mutation.mutate(task);
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Task name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="boardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board</FormLabel>
                  <FormControl>
                    {/* Use a wrapper div to manually handle onBlur */}
                    <div
                      tabIndex={-1}
                      onBlur={field.onBlur}
                    >
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value ? String(field.value) : ""}
                        defaultValue=""
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="submit" disabled={!form.formState.isValid}>
                  Submit
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddTask;
