import Link from "next/link";
import { useRouter } from "next/router";
import { ReactHTMLElement, useState } from "react";
import { Menu, MenuItemProps, MenuProps } from "semantic-ui-react";
import { authService } from "../firebase";
import { UserProps } from "../Types/UserInterface";

export default function Gnb({ user }: UserProps) {
  const [activeItem, setActiveItem] = useState<string>("Home");
  const router = useRouter();

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { innerText } = e.target as HTMLElement; // or <HTMLElement>
    setActiveItem(innerText);
  };

  const handleSignout = () => {
    authService.signOut();
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <Menu pointing secondary>
        <Link href="/" passHref>
          <Menu.Item
            name="Home"
            active={activeItem === "Home"}
            onClick={handleItemClick}
          />
        </Link>

        <Link href="/profile" passHref>
          <Menu.Item
            name="Profile"
            active={activeItem === "Profile"}
            onClick={handleItemClick}
          />
        </Link>
        {user && (
          <Menu.Menu position="right">
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={handleSignout}
            />
          </Menu.Menu>
        )}
      </Menu>
    </div>
  );
}
