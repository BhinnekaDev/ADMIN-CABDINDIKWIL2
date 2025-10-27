"use client";

import { FC, useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useActiveMenu } from "@/hooks/useActiveMenu";
import { MobileSidebar } from "@/components/MobileSidebar";

const JenisPendidikanLayout: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthorized = useAuthGuard();
  const activeFromPath = useActiveMenu();
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState(activeFromPath);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (isAuthorized === null) return null;
  if (!isAuthorized) return null;

  return (
    <div className="flex min-h-screen bg-base-100">
      <Sidebar
        active={active}
        collapsed={collapsed}
        onSelect={setActive}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      <div
        className={`flex flex-col flex-1 duration-300 ${
          collapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <Header
          active={active}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 p-6 bg-base-100">{children}</main>

        <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
          <p>
            © {new Date().getFullYear()} - All rights reserved by Bhinneka Dev
          </p>
        </footer>
      </div>

      <MobileSidebar
        active={active}
        onSelect={setActive}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />
    </div>
  );
};

export default JenisPendidikanLayout;
