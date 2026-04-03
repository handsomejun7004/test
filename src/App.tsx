import DashboardLayout from './components/layout/DashboardLayout';
import SummaryCards from './components/summary/SummaryCards';
import AllocationChart from './components/charts/AllocationChart';
import PerformanceChart from './components/charts/PerformanceChart';
import HoldingsTable from './components/holdings/HoldingsTable';
import { holdings, allocationData, performanceHistory, portfolioSummary } from './data/mockData';

export default function App() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SummaryCards summary={portfolioSummary} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart data={performanceHistory} initialValue={portfolioSummary.totalCost} />
          <AllocationChart data={allocationData} />
        </div>
        <HoldingsTable holdings={holdings} />
      </div>
    </DashboardLayout>
  );
}
