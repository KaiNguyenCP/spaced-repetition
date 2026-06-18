import { Filter, Search } from "lucide-react";
import { Select } from "./Select";

export const Filters = () => {
  return (
    <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search front, back, or tags..."
          className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Select label="All decks" />
        <Select label="Any state" />
        <Select label="Sort: Due date" />
        <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
          <Filter className="size-4" /> More
        </button>
      </div>
    </div>
  );
};
