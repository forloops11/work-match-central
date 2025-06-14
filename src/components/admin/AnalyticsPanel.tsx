
import { Settings } from "lucide-react";
import AnalyticsCharts from "../AnalyticsCharts";
import { Analytics } from "@/utils/adminData";

interface AnalyticsPanelProps {
  analytics: Analytics;
}

export default function AnalyticsPanel({ analytics }: AnalyticsPanelProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 flex gap-2 items-center">
        <Settings /> Site Analytics
      </h3>
      <AnalyticsCharts analytics={analytics} />
    </div>
  );
}
