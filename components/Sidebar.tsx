"use client";

import {
  Home,
  User,
  Power,
  Settings,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { FC } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { SidebarProps } from "@/interfaces/SidebarProps.interface";

const menuItems = [
  { name: "Beranda", icon: <Home className="h-5 w-5" /> },
  { name: "Profile", icon: <User className="h-5 w-5" /> },
  { name: "Settings", icon: <Settings className="h-5 w-5" /> },
];

export const Sidebar: FC<SidebarProps> = ({
  active,
  onSelect,
  collapsed,
  onToggleCollapse,
}) => {
  const { logout } = useAuth();

  return (
    <aside
      className={`hidden fixed h-full lg:flex bg-base-200 flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-base-300">
        {!collapsed && (
          <span className="text-lg font-bold text-base-content">
            Dinas Pendidikan
          </span>
        )}
        <button
          className="btn btn-ghost btn-sm p-2 rounded-full hover:bg-base-300 transition"
          onClick={onToggleCollapse}
        >
          {collapsed ? (
            <ChevronsRight className="h-5 w-5 text-accent" />
          ) : (
            <ChevronsLeft className="h-5 w-5 text-accent" />
          )}
        </button>
      </div>

      <ul className="menu flex-1 p-2 text-base-content w-full gap-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => onSelect(item.name)}
              className={`flex items-center ${
                collapsed ? "justify-center" : "gap-2"
              } w-full p-2 rounded-r-lg transition relative ${
                active === item.name
                  ? "bg-base-300 font-semibold"
                  : "hover:bg-base-300"
              }`}
              data-tip={collapsed ? item.name : ""}
            >
              {active === item.name && !collapsed && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-r"></span>
              )}
              <span className="z-10">{item.icon}</span>
              {!collapsed && <span className="z-10">{item.name}</span>}
            </button>
          </li>
        ))}
      </ul>

      <div className="p-4 border-t border-base-300">
        <button
          onClick={logout}
          className={`btn btn-error text-white w-full flex items-center justify-center gap-2 rounded-lg p-3 hover:bg-accent-focus transition-all duration-200 relative`}
          data-tip={collapsed ? "Keluar" : ""}
        >
          {collapsed ? <Power className="h-5 w-5 text-white" /> : "Keluar"}
        </button>
      </div>
    </aside>
  );
};
