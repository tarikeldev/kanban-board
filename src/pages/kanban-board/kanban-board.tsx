import BoardContainer from "@/components/board/board-container/board-container";
import AddTask from "@/components/board/tasks/add-task/add-task";
import TaskEntity from "@/domain/board-entities";
import { useState } from "react";

function KanbanBoard() {
  return (
    <div className="col-span-10 col-start-2  row-start-3 p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-100  ">
      <div className="float-right mt-3 mr-5">
        <AddTask/>
      </div>
      <div className="mt-15 ">
        <BoardContainer />
      </div>
    </div>
  );
}

export default KanbanBoard;
