import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <div className="bg-darkBackground text-lightText min-h-screen pt-8">
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <AdminMenu />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl animate-slideInLeft">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-white font-bold">$</span>
              </div>
              <h3 className="text-xl font-semibold text-primary">Total Sales</h3>
            </div>
            <p className="text-3xl font-bold text-lightText">
              ${isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-xl animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-white font-bold">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-primary">Customers</h3>
            </div>
            <p className="text-3xl font-bold text-lightText">
              {loading ? <Loader /> : customers?.length}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-xl animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-white font-bold">📦</span>
              </div>
              <h3 className="text-xl font-semibold text-primary">Total Orders</h3>
            </div>
            <p className="text-3xl font-bold text-lightText">
              {loadingTwo ? <Loader /> : orders?.totalOrders}
            </p>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg shadow-xl mb-12 animate-slideInRight">
          <h2 className="text-2xl font-bold text-primary mb-6">Sales Trend</h2>
          <Chart
            options={{
              ...state.options,
              theme: {
                mode: 'dark'
              },
              chart: {
                ...state.options.chart,
                background: '#1F2937',
                foreColor: '#fff'
              },
              colors: ['#EC4899'],
              grid: {
                borderColor: '#374151'
              }
            }}
            series={state.series}
            type="bar"
            height="400"
          />
        </div>

        <div className="animate-fadeIn">
          <OrderList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
