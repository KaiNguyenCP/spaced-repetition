import {
  Gauge,
  Clock,
  Bell,
  Brain,
  SlidersHorizontal,
  Save,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";

export default function SettingsPage() {
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
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* FSRS */}
          <Section
            title="FSRS scheduling"
            icon={Brain}
            desc="Free Spaced Repetition Scheduler parameters that drive each card's next review."
          >
            <Field
              label="Desired retention"
              hint="Target probability of recall at review time. Higher = more reviews."
            >
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={80}
                  max={97}
                  defaultValue={90}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 rounded-md border border-border bg-background px-2 py-1 text-center text-sm tabular-nums">
                  90%
                </span>
              </div>
            </Field>
            <Field
              label="Maximum interval"
              hint="Cap on how far out a card can be scheduled (days)."
            >
              <input
                type="number"
                defaultValue={36500}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </Field>
            <Field
              label="FSRS weights (w0–w18)"
              hint="Optimized parameters. Paste from the optimizer or leave default."
            >
              <textarea
                rows={2}
                defaultValue="0.40, 0.60, 2.40, 5.80, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61, 0.00, 0.00"
                className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 font-mono text-xs outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </Field>
            <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
              <div>
                <p className="text-sm font-medium">Auto-optimize weights</p>
                <p className="text-xs text-muted-foreground">
                  Re-run the optimizer monthly using your review history.
                </p>
              </div>
              <Toggle on />
            </div>
          </Section>

          {/* Daily limits */}
          <Section
            title="Daily limits"
            icon={SlidersHorizontal}
            desc="Control how many cards appear in each study session."
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="New cards / day">
                <input
                  type="number"
                  defaultValue={20}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                />
              </Field>
              <Field label="Max reviews / day">
                <input
                  type="number"
                  defaultValue={200}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                />
              </Field>
            </div>
            <Field
              label="Learning steps"
              hint="Minutes between early repetitions of new cards."
            >
              <input
                type="text"
                defaultValue="1m 10m"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </Field>
            <Field label="New card order">
              <div className="flex gap-2">
                {["Sequential", "Random"].map((o, i) => (
                  <button
                    key={o}
                    className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${i === 0 ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-accent"}`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </Field>
          </Section>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <Section title="Session" icon={Gauge}>
            <Row
              label="Show answer timer"
              desc="Display elapsed time per card."
            >
              <Toggle />
            </Row>
            <Row label="Auto-play audio" desc="Play audio when card is shown.">
              <Toggle on />
            </Row>
            <Row
              label="Bury related cards"
              desc="Hide siblings until next day."
            >
              <Toggle on />
            </Row>
          </Section>

          <Section title="Reminders" icon={Bell}>
            <Row label="Daily reminder" desc="Notify when reviews are due.">
              <Toggle on />
            </Row>
            <Field label="Reminder time">
              <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm">
                <Clock className="size-4 text-muted-foreground" />
                <input
                  type="time"
                  defaultValue="08:30"
                  className="flex-1 bg-transparent outline-none"
                />
              </div>
            </Field>
          </Section>

          <Section title="Appearance" icon={Brain}>
            <Field label="Theme">
              <div className="flex gap-2">
                {["Dark", "Light", "System"].map((t, i) => (
                  <button
                    key={t}
                    className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${i === 0 ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-accent"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>
          </Section>
        </div>
      </div>
    </AppShell>
  );
}

function Section({
  title,
  icon: Icon,
  desc,
  children,
}: {
  title: string;
  icon: typeof Gauge;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-1 flex items-center gap-2">
        <Icon className="size-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {desc ? (
        <p className="mb-4 text-xs text-muted-foreground">{desc}</p>
      ) : (
        <div className="mb-4" />
      )}
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {hint ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

function Row({
  label,
  desc,
  children,
}: {
  label: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      {children}
    </div>
  );
}

function Toggle({ on }: { on?: boolean }) {
  return (
    <span
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        on ? "bg-primary" : "bg-muted"
      }`}
      role="switch"
      aria-checked={on}
    >
      <span
        className={`inline-block size-5 transform rounded-full bg-background shadow transition-transform ${
          on ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </span>
  );
}
