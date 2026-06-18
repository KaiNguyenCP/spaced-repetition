import { Clock, Flame, Target, TrendingUp } from "lucide-react";
import { KPI } from "./KPI";

export const KPIRow = () => {
  return (
    <section className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <KPI icon={Target} label="True retention" value="91%" delta="+2.4%" up />
      <KPI icon={TrendingUp} label="Reviews / day" value="98" delta="+12" up />
      <KPI
        icon={Clock}
        label="Avg. answer time"
        value="6.2s"
        delta="-0.4s"
        up
      />
      <KPI icon={Flame} label="Days studied" value="28 / 30" delta="93%" up />
    </section>
  );
};
