
import './App.css'
import NavBar from "./components/navbar/navbar"
import KanbanBoard from "./pages/kanban-board/kanban-board"

function App() {
  return (
    <>
     <div className="bg-offwhite grid grid-cols-12 gap-4  ">
      <NavBar/>
     <KanbanBoard/>
    </div>
    </>
  )
}

export default App
