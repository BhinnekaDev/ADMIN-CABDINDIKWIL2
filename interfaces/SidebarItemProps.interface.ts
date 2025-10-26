import { JSX } from "react";

export interface SidebarSubItem {
  name: string;
  path: string;
  icon: JSX.Element;
  onClick?: () => void;
}

export interface SidebarItemType {
  name: string;
  path?: string;
  icon: JSX.Element;
  subItems?: SidebarSubItem[];
}

export interface SidebarItemProps {
  item: SidebarItemType;
  isActive: boolean;
  collapsed: boolean;
  onClick?: () => void;
  openDropdown?: string | null;
  onToggleDropdown?: (name: string) => void;
  onSelect?: (name: string) => void;
}
