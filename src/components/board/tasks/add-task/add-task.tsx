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
import { Plus, Regex } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BoardEntity, TaskEntity } from "@/domain/board-entities";
import { TaskService } from "@/apis/tasks/taskService";
import { BoardService } from "@/apis/board/boardService";
import { UserService, CurrentUser } from "@/apis/auth/userService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { taskSchema } from "@/lib/schemas/schemas";
import priority from "@/domain/enums/priority";

type TaskFormValues = z.infer<typeof taskSchema>;

function AddTask() {
  const { data: boards } = useQuery<BoardEntity[]>({
    queryKey: ["boards"],
    queryFn: async () => await BoardService.getAllBoards(),
    staleTime: Infinity,
  });
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const form = useForm<TaskFormValues, any, TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      boardId: undefined,
      priority: undefined,
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

  useEffect(() => {
    UserService.getCurrent()
      .then(setCurrentUser)
      .catch(() => setCurrentUser(null));

  }, []);

  function onSubmit(values: TaskFormValues) {
    if (!currentUser) return;
    const task = new TaskEntity();
    
    task.title = values.title;
    task.boardId = values.boardId;
    task.description = values.description;
    task.userId = currentUser.id;
    task.username = currentUser.userName;
    task.priority = values.priority;

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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description..." {...field} />
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
               <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
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
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value={priority.LOW.toString()} className="text-blue-500">
                          Low
                        </SelectItem>
                        <SelectItem value={priority.MEDIUM.toString()} className="text-yellow-500">
                          Medium
                        </SelectItem>
                        <SelectItem value={priority.HIGH.toString()} className="text-red-500">
                          High
                        </SelectItem>
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
