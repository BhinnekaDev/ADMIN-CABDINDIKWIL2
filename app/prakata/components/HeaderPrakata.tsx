import { Plus, Search } from "lucide-react";
import { HeaderPrakataProps } from "@/app/prakata/interfaces/header-prakata.interface";

export default function HeaderPrakata({
  search,
  loading,
  setSearch,
  openAddModal,
}: HeaderPrakataProps) {
  return (
    <div className="w-full max-w-5xl mb-6 flex flex-col sm:flex-row justify-between gap-4">
      <button
        className="btn btn-primary flex items-center gap-2"
        onClick={openAddModal}
      >
        <Plus size={16} /> Tambah Data
      </button>
      <div className="relative w-full sm:w-auto">
        <Search
          className="absolute top-1/2 left-3 -translate-y-1/2 z-10"
          size={16}
        />
        {loading ? (
          <div className="h-10 w-full sm:w-64 bg-gray-100 dark:bg-gray-700 animate-pulse rounded-md" />
        ) : (
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered pl-10 w-full sm:w-64"
          />
        )}
      </div>
    </div>
  );
}
