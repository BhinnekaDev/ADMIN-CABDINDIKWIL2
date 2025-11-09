"use client";

import {
  Bar,
  Pie,
  Cell,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  PieChart,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  useAdmin,
  useBerita,
  useSekolah,
} from "@/app/dashboard/hooks/useDashboard";

export default function Page() {
  const { data: adminData, loading: loadingAdmin } = useAdmin();

  const currentYear = new Date().getFullYear();

  const beritaParams = useMemo(
    () => ({
      tahun: currentYear,
      bulanMulai: 1,
      bulanAkhir: 12,
    }),
    [currentYear]
  );

  const { data: beritaData, loading: loadingBerita } = useBerita(beritaParams);
  const { data: sekolahData, loading: loadingSekolah } = useSekolah();

  const colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

  const renderSkeleton = () => (
    <div className="w-full h-56 bg-base-300 rounded-xl animate-pulse" />
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 sm:p-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-base-content"
      >
        Statistik Data Sistem
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-base sm:text-lg text-base-content/80 mb-10 max-w-lg"
      >
        Visualisasi jumlah Admin, Berita, dan Sekolah — dengan data real yang
        lebih informatif
      </motion.p>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex-1 min-w-[300px] max-w-sm bg-base-200 p-6 rounded-2xl shadow-xl border border-base-300"
        >
          <h2 className="text-xl font-semibold mb-4 text-base-content">
            Admin
          </h2>
          {loadingAdmin ? (
            renderSkeleton()
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={adminData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
                <XAxis dataKey="name" tick={{ fill: "currentColor" }} />
                <YAxis tick={{ fill: "currentColor" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    color: "#000",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="jumlah"
                  fill="url(#adminGradient)"
                  radius={[10, 10, 0, 0]}
                />
                <defs>
                  <linearGradient
                    id="adminGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex-1 min-w-[300px] max-w-sm bg-base-200 p-6 rounded-2xl shadow-xl border border-base-300"
        >
          <h2 className="text-xl font-semibold mb-4 text-base-content">
            Berita
          </h2>
          {loadingBerita ? (
            renderSkeleton()
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={beritaData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
                <XAxis dataKey="bulan" tick={{ fill: "currentColor" }} />
                <YAxis tick={{ fill: "currentColor" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--b1))",
                    color: "hsl(var(--bc))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="jumlah"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex-1 min-w-[300px] max-w-sm bg-base-200 p-6 rounded-2xl shadow-xl border border-base-300"
        >
          <h2 className="text-xl font-semibold mb-4 text-base-content">
            Sekolah
          </h2>
          {loadingSekolah ? (
            renderSkeleton()
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    color: "hsl(var(--bc))",
                    borderRadius: "8px",
                  }}
                />
                <Pie
                  data={sekolahData}
                  dataKey="jumlah"
                  nameKey="name"
                  outerRadius={80}
                  innerRadius={45}
                  label
                >
                  {sekolahData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                      className="hover:opacity-80 transition-all"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>
    </div>
  );
}
