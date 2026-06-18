export const Toggle = ({ on }: { on?: boolean }) => {
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
};
