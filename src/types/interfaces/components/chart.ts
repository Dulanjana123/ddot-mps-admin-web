import { ChartType } from "@enums/components/chart-enum";
import { ApexOptions } from "apexcharts";

export interface ChartDataSeriesItem {
  name: string;
  data: number[];
}

export interface ChartDynamicData {
  categories: string[];
  series: ChartDataSeriesItem[];
}

export interface ChartFixedData {
  title: string;
  chartType: ChartType;
  basicChartOptions: ApexOptions;
  expandedChartOptions: ApexOptions;
}

export interface EwrDashboardData {
  totalEwrCount: number;
  ewrCountWithoutCP: number;
  ewrsFiledByUcChartData: ChartDynamicData;
  ewrsFiledByWardChartData: ChartDynamicData;
  ewrsFiledByEmergencyTypeChartData: ChartDynamicData;
  ewrsFiledByStatusChartData: ChartDynamicData;
}
