import { useQuery } from "react-query";
import { getCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";

function Chart({ coinId }) {
  const { data, isLoading } = useQuery(["ohlcv", coinId], () =>
    getCoinHistory(coinId)
  );
  return (
    <>
      {isLoading && "Loading Charts..."}
      {!isLoading && (
        <ReactApexChart
          type="candlestick"
          options={{
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              zoom: { enabled: false },
              background: "rgba(0,0,0,.5)",
            },
            xaxis: {
              categories: data?.map((day) => day.time_open),
              type: "datetime",
              axisTicks: { show: false },
              axisBorder: { show: false },
            },
            yaxis: { show: false },
            tooltip: {
              x: {
                format: "yy년MM월dd일",
              },
            },
          }}
          series={[
            {
              name: "candle",
              data: data.map((day) => {
                return {
                  x: day.time_open,
                  y: [
                    `${day.open.toFixed(2)}`,
                    `${day.high.toFixed(2)}`,
                    `${day.low.toFixed(2)}`,
                    `${day.close.toFixed(2)}`,
                  ],
                };
              }),
            },
          ]}
        />
      )}
    </>
  );
}
export default Chart;
