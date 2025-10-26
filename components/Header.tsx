"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { Menu, User, Power } from "lucide-react";
import { FC, useState, useRef, useEffect } from "react";
import { HeaderProps } from "@/interfaces/HeaderProps.interface";

export const Header: FC<HeaderProps> = ({ active, onOpenMobileSidebar }) => {
  const { logout } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="navbar sticky top-0 z-50 bg-base-100 px-6 lg:px-8">
      <div className="navbar-start flex items-center gap-4">
        <button
          className="btn btn-ghost btn-circle lg:hidden"
          onClick={onOpenMobileSidebar}
        >
          <Menu className="h-6 w-6 text-accent" />
        </button>
        <span className="text-2xl font-semibold text-base-content">
          {active}
        </span>
      </div>

      <div className="navbar-end relative" ref={dropdownRef}>
        <button
          className="btn btn-ghost btn-circle flex items-center gap-2 hover:bg-base-300 transition-all duration-200"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <User className="h-5 w-5 text-base-content" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-10 mt-3 w-56 bg-base-200 rounded-xl shadow-xl overflow-hidden animate-fade-in scale-up-origin z-50">
            <ul className="menu p-2 w-full">
              <li>
                <a className="flex items-center gap-2 hover:bg-base-300 rounded-lg p-2 transition">
                  <User className="h-4 w-4 text-accent" />
                  Profile
                </a>
              </li>
              <li>
                <a
                  onClick={logout}
                  className="flex items-center gap-2 hover:bg-red-500 dark:text-white hover:text-white rounded-lg p-2 transition"
                >
                  <Power className="h-4 w-4" />
                  Keluar
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
          transform-origin: top right;
        }
        .scale-up-origin {
          transform-origin: top right;
        }
      `}</style>
    </header>
  );
};
