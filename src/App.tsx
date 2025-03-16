
import { Button } from "@/components/ui/button"
import './App.css'
import NavBar from "./components/navbar/navbar"
import BoardContainer from "./components/board/board-container/board-container"
import KanbanBoard from "./pages/kanban-board/kanban-board"

function App() {
  return (
    <>
     <div className="bg-offwhite">
      <NavBar/>
     <KanbanBoard/>
    </div>
    </>
  )
}

export default App
