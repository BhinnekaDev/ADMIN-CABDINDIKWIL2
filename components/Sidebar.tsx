import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { FC, useState, useEffect } from "react";
import { menuItems } from "@/constants/menuItems";
import { Power, ChevronsLeft, ChevronsRight } from "lucide-react";
import { SidebarProps } from "@/interfaces/SidebarProps.interface";

export const Sidebar: FC<SidebarProps> = ({
  active,
  onSelect,
  collapsed,
  onToggleCollapse,
}) => {
  const router = useRouter();
  const { logout } = useAuth();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  useEffect(() => {
    const activeItem = menuItems.find(
      (item) =>
        item.name === active ||
        item.subItems?.some((sub) => sub.name === active)
    );

    const timer = setTimeout(() => {
      setOpenDropdown(activeItem?.subItems ? activeItem.name : null);
    }, 0);

    return () => clearTimeout(timer);
  }, [active]);

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
              onClick={() => {
                if (item.subItems) {
                  handleDropdownToggle(item.name);
                } else if (item.path) {
                  router.push(item.path);
                  onSelect(item.name);
                }
              }}
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
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-r" />
              )}
              <span className="z-10">{item.icon}</span>
              {!collapsed && <span className="z-10">{item.name}</span>}
            </button>

            {item.subItems && openDropdown === item.name && (
              <ul
                className={`ml-6 mt-2 flex flex-col gap-1 transition-all duration-200
                  ${
                    collapsed
                      ? "absolute left-full top-0 w-48 bg-base-200 shadow-lg z-50"
                      : ""
                  }`}
              >
                {item.subItems.map((sub) => (
                  <li key={sub.name}>
                    <button
                      onClick={() => {
                        if (sub.path) router.push(sub.path);
                        onSelect(sub.name);
                      }}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-300 w-full"
                    >
                      {active === sub.name && !collapsed && (
                        <span className="absolute -left-2 top-0 bottom-1 w-1 bg-accent rounded-r"></span>
                      )}
                      {sub.icon} {sub.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="p-4 border-t border-base-300">
        <button
          onClick={logout}
          className="btn btn-error text-white w-full flex items-center justify-center gap-2 rounded-lg p-3 hover:bg-accent-focus transition-all duration-200 relative"
          data-tip={collapsed ? "Keluar" : ""}
        >
          {collapsed ? <Power className="h-5 w-5 text-white" /> : "Keluar"}
        </button>
      </div>
    </aside>
  );
};
