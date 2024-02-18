import React from "react";
import s from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";
import { API } from "../../../config/api";

const Chart = ({ status, dateFrom, dateUntil, reservChart }) => {
  //   const { data: reservChart, refetch: refetchChart } = useQuery(
  //     "chartDataReservCache",
  //     async () => {
  //       const resp = await API.get(
  //         `/reservationcharts?status=${status}&from=${dateFrom}&until=${dateUntil}`
  //       );
  //       return resp.data.data;
  //     }
  //   );

  // Grouping data by monthint
  const groupedChartData = reservChart
    ? reservChart?.reduce((result, current) => {
        // Cek apakah monthint sudah ada dalam hasil grouping
        if (!result[current.monthint]) {
          // Jika belum ada, tambahkan monthint ke hasil grouping dan inisialisasi total_item dan total_price dengan nilai dari data saat ini
          result[current.monthint] = {
            monthint: current.monthint,
            month: current.month,
            total_item: current.total_item,
            total_price: current.total_price,
          };
        } else {
          // Jika sudah ada, tambahkan total_item dan total_price dengan nilai dari data saat ini
          result[current.monthint].total_item += current.total_item;
          result[current.monthint].total_price += current.total_price;
        }
        return result;
      }, {})
    : {};

  // Ubah objek hasil grouping menjadi array
  const groupedChartDataArray = Object.values(groupedChartData);
  console.log("🚀 ~ Chart ~ groupedChartDataArray:", groupedChartDataArray);

  // Mengambil nilai bulan dari data reservChart
  const labels =
    groupedChartDataArray?.map((chartData) => chartData.month) || [];

  // Membuat dataset untuk chart
  const datasets = [
    {
      label: "Total Pendapatan",
      data:
        groupedChartDataArray?.map((chartData) => chartData.total_price) || [],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ];

  const data = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
