"use client";

import { FC, Fragment } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  SidebarItemProps,
  SidebarSubItem,
} from "@/interfaces/SidebarItemProps.interface";

export const SidebarItem: FC<SidebarItemProps & { activeName?: string }> = ({
  item,
  onClick,
  isActive,
  activeName,
  collapsed,
  openDropdown,
  onToggleDropdown,
}) => {
  const router = useRouter();
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const dropdownOpen = hasSubItems && openDropdown === item.name;

  const handleSubClick = (sub: SidebarSubItem) => {
    if (sub.path) router.push(sub.path);
    else if (sub.onClick) sub.onClick();
    if (onClick) onClick();
  };

  const handleItemClick = () => {
    if (hasSubItems && onToggleDropdown) {
      onToggleDropdown(item.name);
    } else if (item.path) {
      router.push(item.path);
      if (onClick) onClick();
    }
  };

  return (
    <Fragment>
      <li>
        <button
          onClick={handleItemClick}
          className={`flex items-center justify-between w-full p-2 rounded-r-lg relative transition ${
            isActive ? "bg-base-300 font-semibold" : "hover:bg-base-300"
          }`}
          data-tip={collapsed ? item.name : ""}
        >
          {isActive && !collapsed && (
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-r" />
          )}
          <span className="flex items-center gap-2 z-10">
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </span>
          {hasSubItems && !collapsed && (
            <span className="z-10">
              {dropdownOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </span>
          )}
        </button>

        {dropdownOpen && !collapsed && item.subItems && (
          <ul className="ml-6 mt-1 flex flex-col gap-1 relative">
            {item.subItems.map((sub) => {
              const subIsActive =
                sub.name === activeName || sub.path === activeName;
              return (
                <li key={sub.name}>
                  <button
                    onClick={() => handleSubClick(sub)}
                    className={`flex items-center gap-2 p-2 rounded-lg w-full text-left hover:bg-base-200 ${
                      subIsActive ? "bg-base-300 font-semibold" : ""
                    }`}
                  >
                    {subIsActive && !collapsed && (
                      <span className="absolute -left-2 top-0 bottom-0 w-1 bg-accent rounded-r" />
                    )}
                    {sub.icon} <span>{sub.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    </Fragment>
  );
};
