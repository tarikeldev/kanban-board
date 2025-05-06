  import { Card } from "@/components/ui/card";
  import { nanoid } from "nanoid";
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
  
  const landings = [
    {
      id: nanoid(),
      title: "Landing 01",
      route: "/project-management",
    },
    {
      id: nanoid(),
      title: "Landing 02",
      route: "/crm-landing",
    },
    {
      id: nanoid(),
      title: "Landing 03",
      route: "/ai-content-landing",
    },
    {
      id: nanoid(),
      title: "Landing 04",
      route: "/new-intro-landing",
    },
    {
      id: nanoid(),
      title: "Landing 05",
      route: "/about-us-landing",
    },
    {
      id: nanoid(),
      title: "Landing 06",
      route: "/contact-us-landing",
    },
    {
      id: nanoid(),
      title: "Landing 07",
      route: "/faqs-landing",
    },
    {
      id: nanoid(),
      title: "Landing 08",
      route: "/pricing-landing",
    },
    {
      id: nanoid(),
      title: "Landing 09",
      route: "/career-landing",
    },
  ];
  
  export default Navbar;
  