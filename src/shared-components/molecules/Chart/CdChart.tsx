import CdCard from "@atoms/Card/CdCard";
import CardHeaderCommon from "@common-elements/CardHeaderCommon/CardHeaderCommon";
import ReactApexChart from "react-apexcharts";
import { CardBody } from "reactstrap";
import { ApexOptions } from "apexcharts";
import { ChartType } from "@enums/components/chart-enum";

type ChartProps = {
  title?: string;
  options: ApexOptions;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  type?: ChartType;
  height?: number | string;
  width?: number | string;
  onClick?: () => void;
  className?: string;
};

const CdChart: React.FC<ChartProps> = ({
  title,
  options,
  series,
  type = ChartType.Line,
  height = "100%",
  width = "100%",
  onClick,
  className,
}) => {
  return (
    <CdCard className={`h-100 w-100 ${className}`}>
      {title && <CardHeaderCommon title={title} />}
      <CardBody onClick={onClick} style={{ cursor: `${onClick && "pointer"}` }}>
        <ReactApexChart
          options={options}
          series={series ?? []}
          type={type}
          height={height}
          width={width}
        />
      </CardBody>
    </CdCard>
  );
};

export default CdChart;
