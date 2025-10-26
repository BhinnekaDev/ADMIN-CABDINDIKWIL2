import { FC } from "react";
import { Power } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import { menuItems } from "@/constants/menuItems";
import { SidebarItem } from "@/components/SidebarItem";

export const MobileSidebar: FC<{
  isOpen: boolean;
  onClose: () => void;
  active: string;
  onSelect: (name: string) => void;
}> = ({ isOpen, onClose, active, onSelect }) => {
  const { logout } = useAuth();

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 dark:bg-black/50 bg-white/50 flex justify-center items-end lg:hidden">
        <aside className="bg-base-200 w-full max-w-sm p-4 rounded-t-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-lg text-base-content">Menu</span>
            <button className="btn btn-ghost btn-sm" onClick={onClose}>
              ✕
            </button>
          </div>
          <ul className="menu gap-3 w-full">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.name}
                item={item}
                collapsed={false}
                isActive={active === item.name}
                onClick={() => {
                  onSelect(item.name);
                  onClose();
                }}
              />
            ))}
            <li>
              <button onClick={logout} className="btn btn-error btn-block">
                <Power className="h-5 w-5 text-white" />
              </button>
            </li>
          </ul>
        </aside>
      </div>
    )
  );
};
