"use client";

import { useRouter } from "next/navigation";
import { FC, Fragment, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  SidebarSubItem,
  SidebarItemProps,
} from "@/interfaces/SidebarItemProps.interface";

export const SidebarItem: FC<SidebarItemProps> = ({
  item,
  onClick,
  isActive,
  collapsed,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSubClick = (sub: SidebarSubItem) => {
    if (sub.path) {
      router.push(sub.path);
      onClick();
    } else if (sub.onClick) {
      sub.onClick();
      onClick();
    }
  };

  const handleClick = () => {
    if (item.subItems) {
      setOpen(!open);
    } else if (item.path) {
      router.push(item.path);
      onClick();
    }
  };

  return (
    <Fragment>
      <li>
        <button
          onClick={handleClick}
          className={`flex items-center justify-between w-full p-2 rounded-r-lg relative transition ${
            isActive ? "bg-base-300 font-semibold" : "hover:bg-base-300"
          }`}
          data-tip={collapsed ? item.name : ""}
        >
          {isActive && !collapsed && (
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-r"></span>
          )}

          <span className="flex items-center gap-2 z-10">
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </span>

          {item.subItems && !collapsed && (
            <span className="z-10">
              {open ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </span>
          )}
        </button>
      </li>

      {item.subItems && open && !collapsed && (
        <ul className="ml-6 mt-1 flex flex-col gap-1">
          {item.subItems.map((sub) => (
            <li key={sub.name}>
              <button
                onClick={() => handleSubClick(sub)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200 w-full text-left"
              >
                {sub.icon} <span>{sub.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};
