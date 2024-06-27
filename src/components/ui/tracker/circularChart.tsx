import { Doughnut } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PieController, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(CategoryScale, LinearScale, PieController, ArcElement, Tooltip, Legend);
Chart.register(ChartDataLabels);

interface CircularChartProps {
  data: { month: string; income: { amount: number }; spendings: { amount: number } }[];
  dataView: "income" | "spendings";
  totalValue: number;
}

const CircularChart: React.FC<CircularChartProps> = ({ data, dataView, totalValue }) => {
  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: dataView === "income" ? "Income" : "Spendings",
        data: data.map((d) => (dataView === "income" ? d.income.amount : d.spendings.amount)),
        backgroundColor: "#BE9271",
        borderColor: "#FFFFFF",
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    layout: {
      padding: {
        left: 65,
        right: 65,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
      datalabels: {
        color: "#BE9271",
        font: {
          family: "montserrat",
          size: 12,
          weight: "bold" as "bold",
        },
        formatter: (value: any, context: any) => {
          return `${context.chart.data.labels[context.dataIndex]}`;
        },
        align: "end",
        anchor: "end",
        offset: 1,
      },
    },
    cutout: "80%",
  };

  const drawLines = {
    id: "drawLines",
    afterDraw: (chart: any) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      chart.data.labels.forEach((label: any, index: any) => {
        const meta = chart.getDatasetMeta(0);
        const dataPoint = meta.data[index];
        const startAngle = dataPoint.startAngle;
        const endAngle = dataPoint.endAngle;
        const midAngle = startAngle + (endAngle - startAngle) / 2;
        const x = (chartArea.left + chartArea.right) / 2;
        const y = (chartArea.top + chartArea.bottom) / 2;
        const radius = dataPoint.outerRadius;
        const dx = Math.cos(midAngle) * radius;
        const dy = Math.sin(midAngle) * radius;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x + dx, y + dy);
        ctx.lineTo(x + dx * 1.05, y + dy * 1.05);
        ctx.strokeStyle = "rgba(139, 93, 53, 0.8)";
        ctx.stroke();
        ctx.restore();
      });
    },
  };

  return (
    <div className="relative">
      <Doughnut data={chartData} options={options} plugins={[drawLines]} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="font-montserrat font-bold text-xs">
          <h1 className="text-center text-cckLightBrown">{dataView === "income" ? "Total Pemasukan" : "Total Pengeluaran"}</h1>
          <h2 className="text-center text-cckLightBrown">Rp. {totalValue}</h2>
        </div>
      </div>
    </div>
  );
};

export default CircularChart;
