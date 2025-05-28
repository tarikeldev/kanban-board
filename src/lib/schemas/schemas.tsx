import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }).min(50, { message: "Description must be at least 50 characters long" }),
  boardId: z.number({ message: "Board is required" }).min(1, { message: "Board is required" }),
  priority: z.number({message:"Priority is required"}).min(1, { message: "Priority is required" })
});

export type TaskFormValues = z.infer<typeof taskSchema>;