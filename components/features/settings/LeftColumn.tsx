import { FSRS } from "./FSRS";
import { DailyLimits } from "./DailyLimits";

export const LeftColumn = () => {
  return (
    <div className="flex flex-col gap-6 lg:col-span-2">
      <FSRS />
      <DailyLimits />
    </div>
  );
};
