import "./App.css";
import Login from "./components/auth/login/login";
import NavBar from "./components/navbar/navbar";
import KanbanBoard from "./pages/kanban-board/kanban-board";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="bg-offwhite grid grid-cols-12 gap-4  ">
          <NavBar />
          <KanbanBoard />
         
        </div>
        <Login/>
      </QueryClientProvider>
    </>
  );
}

export default App;
