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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TaskService } from "@/apis/tasks/taskService";
import { BoardService } from "@/apis/board/boardService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { taskSchema } from "@/lib/schemas/schemas";
import { Textarea } from "@/components/ui/textarea";

function UpdateTask({
  task,
  isOpen,
  setDialogOpen,
}: {
  task: TaskEntity;
  isOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}) {

  type TaskFormValues = z.infer<typeof taskSchema>;
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      boardId: task.boardId,
      description: task.description,
    },
    mode: "all",
  });
  const { data: boards } = useQuery<BoardEntity[]>({
    queryKey:["boards"],
    queryFn: async () => await BoardService.getAllBoards(),
  });
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
  function onSubmit(values: TaskFormValues) {
    const newTask = new TaskEntity();
    newTask.id = task.id;
    newTask.title = values.title;
    newTask.boardId = values.boardId;
    newTask.description = values.description;
    mutation.mutate(newTask);
  } 
  return (
    <Dialog open={isOpen} onOpenChange={setDialogOpen}>
      <DialogContent  className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>Task {task.id}</DialogDescription>
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
            <DialogFooter className="sm:justify-start">
                <Button type="submit" disabled={!form.formState.isValid}>
                  Submit
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateTask;
