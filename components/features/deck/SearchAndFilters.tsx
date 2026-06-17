import { Search } from "lucide-react";

export const SearchAndFilters = () => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search decks..."
          className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
      </div>
      <div className="flex items-center gap-2">
        {["All", "Due", "New", "Archived"].map((f, i) => (
          <button
            key={f}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              i === 0
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:bg-accent/50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
};
