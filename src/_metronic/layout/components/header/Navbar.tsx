import {
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import LogoutConfirmationModal from "../../../partials/layout/header-menus/LogoutModal";

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const onConfirm = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };
  return (
    <div className="app-navbar flex-shrink-0">
      <Menu>
        <MenuButton>
          <Image
            p="4"
            bg="white"
            height="40px"
            width="40px"
            borderRadius="md"
            src=""
          />
        </MenuButton>
        <MenuList>
          <MenuGroup title="Profile">
            <MenuItem>My Account</MenuItem>
            <MenuItem>Payments </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Help">
            <MenuItem onClick={onOpen}>Chiqish</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      <LogoutConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    </div>
  );
};

export { Navbar };
