import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";

const SidebarMenuMain = () => {
  return (
    <>
      <SidebarMenuItem to={"dashboard"} title={"Statistika"} icon="home" />
      <SidebarMenuItemWithSub title="User App" to="dashboard" icon="user">
        <SidebarMenuItem title="Yangiliklar" to="dashboard/news" hasBullet />
        <SidebarMenuItem
          title="Foydalanuvchilar"
          to="dashboard/users"
          hasBullet
        />
      </SidebarMenuItemWithSub>
    </>
  );
};

export { SidebarMenuMain };
