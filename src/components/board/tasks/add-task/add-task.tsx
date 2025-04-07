"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { boards } from "../../board-container/board-container"
import { useState } from "react"
import TaskEntity from "@/domain/board-entities"
import { useTaskStore } from "@/stores/taskStore"



function AddTask() {
  const addTask = useTaskStore(state=>state.setNewTask)
  const [newTask, setNewTask] = useState<TaskEntity>(new TaskEntity())
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    addTask(newTask)
    setNewTask({ id:0, title: "", boardId: 0 })
  }

  const handleOnChange = (event: any) => {
    const { name, value } = event.target

    setNewTask((prev) => ({
      ...prev,
      [name]:  value
    }))
  }

  const handleOnSelect = (value: string) => {
    setNewTask((prev) => ({
      ...prev,
      boardId: Number.parseInt(value),
    }))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer hover:bg-blue-900 hover:text-white hover:ease-in-out">
          <Plus className="mr-2 h-4 w-4" />
          Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription>Add a new task</DialogDescription>
        </DialogHeader>
        <form onSubmit={(e)=>handleSubmit(e)}>
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
              <Select name="boardId" value={newTask.boardId?.toString() ?? "0"} onValueChange={handleOnSelect}>
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
  )
}

export default AddTask