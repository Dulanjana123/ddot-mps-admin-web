import { ChartType } from "@enums/components/chart-enum";
import { ChartFixedData } from "@interfaces/components/chart";

export const ewrsFiledByUc: ChartFixedData = {
  title: "Total number of EWRs filed by each utility Company",
  chartType: ChartType.Bar,
  basicChartOptions: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      labels: {
        show: false,
      },
      categories: [],
    },
    yaxis: {
      title: {
        text: "Number of Requests",
      },
      labels: {
        show: false,
      },
    },
  },
  expandedChartOptions: {
    chart: {
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      title: {
        text: "Utility Companies",
      },
      labels: {
        show: true,
      },
      categories: [],
    },
    yaxis: {
      title: {
        text: "Number of Requests",
      },
      labels: {
        show: true,
      },
    },
  },
};

export const ewrsFiledByWard: ChartFixedData = {
  title: "Total Number of EWRs Filed for the ward of the Logged In Inspector",
  chartType: ChartType.Bar,
  basicChartOptions: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
    },
    xaxis: {
      labels: {
        show: false,
      },
      categories: [],
    },
    yaxis: {
      title: {
        text: "Wards",
      },
      labels: {
        show: false,
      },
    },
  },
  expandedChartOptions: {
    chart: {
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
    },
    xaxis: {
      title: {
        text: "Number of Requests",
      },
      labels: {
        show: true,
      },
      categories: [],
    },
    yaxis: {
      title: {
        text: "Wards",
      },

      labels: {
        show: true,
      },
    },
  },
};

export const ewrsFiledByEmergencyType: ChartFixedData = {
  title: "Total Number of EWRs Filed for Emergency Type",
  chartType: ChartType.Bar,
  basicChartOptions: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      title: {
        text: "Emergency Type",
      },
      labels: {
        show: false,
      },
      categories: [],
    },
    yaxis: {
      title: {
        text: "Number of Requests",
      },
      labels: {
        show: false,
      },
    },
  },
  expandedChartOptions: {
    chart: {
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      curve: "straight",
    },
    xaxis: {
      title: {
        text: "Emergency Type",
      },
      labels: {
        show: true,
      },
      categories: [],
    },
    yaxis: {
      title: {
        text: "Number of Requests",
      },
      labels: {
        show: true,
      },
    },
  },
};

export const ewrsAgainstStatus: ChartFixedData = {
  title: "Total Number of EWRs available under each Status",
  chartType: ChartType.Bar,
  basicChartOptions: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      title: {
        text: "Status",
      },
      labels: {
        show: false,
      },
      categories: [],
    },
    yaxis: {
      title: {
        text: "Number of Requests",
      },
      labels: {
        show: false,
      },
    },
  },
  expandedChartOptions: {
    chart: {
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      curve: "straight",
    },
    xaxis: {
      title: {
        text: "Status",
      },
      labels: {
        show: true,
      },
      categories: [],
    },
    yaxis: {
      title: {
        text: "Number of Requests",
      },
      labels: {
        show: true,
      },
    },
  },
};
