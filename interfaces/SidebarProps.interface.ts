export interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  active: string;
  onSelect: (name: string) => void;
}
