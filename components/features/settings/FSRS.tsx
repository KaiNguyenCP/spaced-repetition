import { Brain } from "lucide-react";
import { Field } from "./Field";
import { Toggle } from "./Toggle";
import { Section } from "./Section";

export const FSRS = () => {
  return (
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
  );
};
