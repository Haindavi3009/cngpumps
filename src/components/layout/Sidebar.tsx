
import { 
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader
} from "@/components/ui/sidebar";
import { Home, Route, MapPin, Star, MessageCircle, Settings, Filter, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/"
    },
    {
      title: "Plan Route",
      icon: Route,
      path: "/plan-route"
    },
    {
      title: "Nearby Stations",
      icon: MapPin,
      path: "/nearby"
    },
    {
      title: "Favorites",
      icon: Star,
      path: "/favorites"
    },
    {
      title: "Reviews",
      icon: MessageCircle,
      path: "/reviews"
    },
    {
      title: "Trip History",
      icon: Calendar,
      path: "/history"
    },
    {
      title: "Preferences",
      icon: Filter,
      path: "/preferences"
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings"
    }
  ];

  return (
    <SidebarComponent>
      <SidebarHeader>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cng-500 to-cng-700 flex items-center justify-center text-white font-bold text-lg">
              CN
            </div>
            <div>
              <h2 className="text-xl font-bold">CNG Navigator</h2>
              <p className="text-xs text-muted-foreground">Plan your journey</p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
