import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import axios from 'axios';

const DonutCharts = () => {
    const url = process.env.REACT_APP_BASEURL;
  const chartRef = useRef(null);
  const [series, setSeries] = useState([0, 0, 0]);

  const chartOptions = {
    series: series,
    colors: ["#1C64F2", "#16BDCA", "#FDBA8C"],
    chart: {
      height: 320,
      width: "100%",
      type: "donut",
    },
    stroke: {
      colors: ["transparent"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: 20,
            },
            total: {
              showAlways: true,
              show: true,
              label: "Total Products",
              fontFamily: "Inter, sans-serif",
              formatter: function (w) {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return sum;
              },
            },
            value: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: -20,
              formatter: function (value) {
                return value;
              },
            },
          },
          size: "80%",
        },
      },
    },
    grid: {
      padding: {
        top: -2,
      },
    },
    labels: ["Baju", "Celana", "Sepatu"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/produks`);
        const products = response.data.data;

        const bajuCount = products.filter(product => product.category_id === 1).length;
        const celanaCount = products.filter(product => product.category_id === 2).length;
        const sepatuCount = products.filter(product => product.category_id === 3).length;

        setSeries([bajuCount, celanaCount, sepatuCount]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const chart = new ApexCharts(chartRef.current, chartOptions);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [series]);
  return (
    <div>
      <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
        <div className="flex justify-between mb-3">
          <div className="flex justify-center items-center">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">All Products</h5>
            <svg data-popover-target="chart-info" data-popover-placement="bottom" className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
            </svg>
            <div data-popover id="chart-info" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
              <div className="p-3 space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">All Product</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae enim, quisquam eveniet fuga magni laudantium atque est aliquam nulla quis.</p>
                <h3 className="font-semibold text-gray-900 dark:text-white">Calculation</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, libero beatae dolore facilis cumque et! Laborum obcaecati in atque distinctio animi corrupti sint? Aliquid, error!</p>
                <a href="#" className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">Read more <svg className="w-2 h-2 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
                </svg></a>
              </div>
              <div data-popper-arrow></div>
            </div>
          </div>
          <div>
            <button type="button" data-tooltip-target="data-tooltip" data-tooltip-placement="bottom" className="hidden sm:inline-flex items-center justify-center text-gray-500 w-8 h-8 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
              </svg>
              <span className="sr-only">Download data</span>
            </button>
            <div id="data-tooltip" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
              Download CSV
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="max-w-xs mx-auto mt-4" ref={chartRef}></div>
        </div>
      </div>
    </div>
  );
};

export default DonutCharts;
