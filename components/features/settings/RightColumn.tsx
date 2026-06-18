import { Section } from "./Section";
import { Bell, Brain, Clock, Gauge } from "lucide-react";
import { Row } from "./Row";
import { Toggle } from "./Toggle";
import { Field } from "./Field";

export const RightColumn = () => {
  return (
    <div className="flex flex-col gap-6">
      <Section title="Session" icon={Gauge}>
        <Row label="Show answer timer" desc="Display elapsed time per card.">
          <Toggle />
        </Row>
        <Row label="Auto-play audio" desc="Play audio when card is shown.">
          <Toggle on />
        </Row>
        <Row label="Bury related cards" desc="Hide siblings until next day.">
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
  );
};
