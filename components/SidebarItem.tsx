"use client";

import { FC } from "react";
import { SidebarItemProps } from "@/interfaces/SidebarItemProps.interface";

export const SidebarItem: FC<SidebarItemProps> = ({
  item,
  onClick,
  isActive,
  collapsed,
}) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center gap-2 w-full p-2 rounded-r-lg relative transition ${
          isActive ? "bg-base-300 font-semibold" : "hover:bg-base-300"
        }`}
        data-tip={collapsed ? item.name : ""}
      >
        {isActive && !collapsed && (
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-r"></span>
        )}
        <span className="z-10">{item.icon}</span>
        {!collapsed && <span className="z-10">{item.name}</span>}
      </button>
    </li>
  );
};
