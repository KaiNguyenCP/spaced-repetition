export const Card = ({ children }: { children: React.ReactNode }) =>{
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {children}
    </div>
  );
}