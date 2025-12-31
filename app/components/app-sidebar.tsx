import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~/components/ui/sidebar";
import { useNavigate } from "react-router";

export function AppSidebar() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="text-lg">
          The Learning Cove
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenuItem>
          <SidebarMenuButton className="cursor-pointer" onClick={() => handleNavigation('/get-started')}>
            Get Started
          </SidebarMenuButton>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton className="cursor-pointer">
                Who am i?
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
          <SidebarMenuButton className="cursor-pointer" onClick={() => handleNavigation('/web-sockets')}>
            Web Sockets
          </SidebarMenuButton>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton className="cursor-pointer">
                What is a Web Socket?
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </SidebarMenuItem>
        <SidebarFooter />
        <SidebarContent /></SidebarContent>
    </Sidebar>
  )
}