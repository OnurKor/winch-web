import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChartActive({
  activeCards,
  totalCards,
  title,
  colors = ["#36A2EB", "#00BDD4"],
  labels,
}) {
  const defaultLabels = ["Cihaz Sayısı", "Kullanıcı Sayısı"];
  const chartLabels = labels || defaultLabels;

  const hasData = totalCards > 0;

  // 📌 Yüzde yerine direkt değerleri kullan
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Sayı",
        data: hasData ? [activeCards, totalCards] : [0, 1], // Oranı düzgün hesapla
        backgroundColor: colors,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 10,
            weight: "bold",
            family: "Arial, sans-serif",
          },
          color: "#333",
        },
      },
      //   tooltip: {
      //     callbacks: {
      //       label: function (tooltipItem) {
      //         return ⁠ ${chartLabels[tooltipItem.dataIndex]}: ${data.datasets[0].data[tooltipItem.dataIndex]} ⁠;
      //       },
      //     },
      //   },
      title: {
        display: true,
        text: title,
        font: {
          size: 12,
          weight: "bold",
          family: "Arial, sans-serif",
        },
        color: "#333",
      },
    },
  };

  return (
    <div
      className="chart-container bg-lightkozy/20 flex justify-center items-center py-2 rounded-md"
      style={{ width: "300px", height: "200px" }}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
}
