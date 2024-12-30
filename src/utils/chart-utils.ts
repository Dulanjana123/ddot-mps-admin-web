import { ApexOptions } from "apexcharts";

export const updateChartCategories = (
  newCategories: string[],
  chartOptions: ApexOptions
) => {
  chartOptions.xaxis = {
    ...chartOptions.xaxis,
    categories: newCategories,
  };

  return chartOptions;
};
