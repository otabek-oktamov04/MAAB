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
        {/* <SidebarMenuItem title="Users" to="dashboard/users" hasBullet />
        <SidebarMenuItem title="Investors" to="dashboard/investors" hasBullet /> */}
        {/* <SidebarMenuItem
          title="Qo'shni joylar"
          to="dashboard/neighbor-places"
          hasBullet
        />
        <SidebarMenuItem
          title="rozetka turlari"
          to="dashboard/connector-types"
          hasBullet
        /> */}
      </SidebarMenuItemWithSub>
      {/* <SidebarMenuItemWithSub
        to="dashboard/users"
        title="Foydalanuvchilar"
        icon="user"
      >
       
      </SidebarMenuItemWithSub> */}
    </>
  );
};

export { SidebarMenuMain };
