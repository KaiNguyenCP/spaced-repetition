import { ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";

export const DueTodayBanner = () => {
  return (
    <section className="mb-6 flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <GraduationCap className="size-6" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">You have 73 cards to review</h2>
          <p className="text-sm text-muted-foreground">
            12 new · 23 learning · 38 due · about 22 minutes
          </p>
        </div>
      </div>
      <Link
        href="/study"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Start studying
        <ArrowRight className="size-4" />
      </Link>
    </section>
  );
};
