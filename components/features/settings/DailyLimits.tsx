import React from "react";
import { Section } from "./Section";
import { SlidersHorizontal } from "lucide-react";
import { Field } from "./Field";

export const DailyLimits = () => {
  return (
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
  );
};
