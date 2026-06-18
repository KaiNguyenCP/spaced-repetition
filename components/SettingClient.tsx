import { Save } from "lucide-react";
import { AppShell } from "./AppShell";
import { LeftColumn, RightColumn } from "./features/settings";

export default function SettingClient() {
  return (
    <AppShell
      active="True"
      title="Settings"
      subtitle="Scheduling, daily limits and study preferences"
      action={
        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Save className="size-4" />
          <span className="hidden sm:inline">Save changes</span>
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <LeftColumn />
        <RightColumn />
      </div>
    </AppShell>
  );
}
