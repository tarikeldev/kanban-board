  import { Card } from "@/components/ui/card";
  import { Link as RouterLink, useNavigate } from "react-router-dom";
  import { useAuthStore } from "@/stores/authStore";
  
  const Navbar = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
  
    const handleLogout = () => {
      logout();
      navigate("/auth/login");
    };
  
    return (
      <Card className="col-span-12 row-span-2 p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-100">
        <ul className="hidden md:flex items-center gap-10 text-card-foreground">
          <li className="text-primary font-medium">
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/projects">Projects</RouterLink>
          </li>
          <li>
            <RouterLink to="/dashboard">Dashboard</RouterLink>
          </li>
          <li>
            <RouterLink to="/user">User</RouterLink>
          </li>
 
          <li>
            <button onClick={handleLogout} className="left-0 bg-transparent border-none cursor-pointer text-red-500">
              Logout
            </button>
          </li>
        </ul>
  
        
      </Card>
    );
  };
  
  export default Navbar;
  