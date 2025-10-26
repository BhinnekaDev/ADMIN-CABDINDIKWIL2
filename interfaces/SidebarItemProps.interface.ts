import { JSX } from "react";

export interface SidebarItemProps {
  isActive: boolean;
  collapsed: boolean;
  onClick: () => void;
  item: { name: string; icon: JSX.Element };
}
