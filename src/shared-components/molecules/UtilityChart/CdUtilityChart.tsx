import React, { useState, useEffect, useMemo } from "react";
import { ApexOptions } from "apexcharts";
import CdChart from "@molecules/Chart/CdChart";
import CdDropdown from "@atoms/Dropdown/CdDropdown";
import CdDropdownToggle from "@atoms/DropdownToggle/CdDropdownToggle";
import CdDropdownMenu from "@atoms/DropdownMenu/CdDropdownMenu";
import CdDropdownItem from "@atoms/DropdownItem/CdDropdownItem";
import { ChartType } from "@enums/components/chart-enum";
import CdTypography from "@atoms/Typography/CdTypography";

type ChartData = {
  series: { name: string; data: number[] }[];
  categories: string[];
};

interface UtilityCompanyChartProps {
  chartName?: string;
  chartDescription?: string;
  chartData?: {allData: { series: { name: string; data: number[] }[]; categories: string[] };
  };
  filterEnabled?: boolean;
  colors?: string[];
  onFilterChange?: (filter: string) => void;
}

const CdUtilityChart: React.FC<UtilityCompanyChartProps> = ({
  chartName = "Chart",
  chartDescription = "Description",
  chartData,
  filterEnabled = true,
  colors = ["#ff6384", "#87CEEB"],
  onFilterChange,
}) => {
   // Validate and provide default data
  const defaultData: ChartData = {
    series: [{ name: "Request Count", data: [0] }],
    categories: ["No Data"],
  };

   // Ensure data is properly structured
  const validData = useMemo(() => {
    if (!chartData?.allData?.series?.[0]?.data?.length) {
      return defaultData;
    }
    return chartData.allData;
  }, [chartData]);

  const [filter, setFilter] = useState<string>("All");
  const [filteredCategories, setFilteredCategories] = useState<string[]>(validData.categories);
  const [filteredSeries, setFilteredSeries] = useState(validData.series);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Get unique categories for filter 
  const uniqueCategories = useMemo(() => {
    const categories = validData.categories || [];
    return ["All", ...Array.from(new Set(categories))];
  }, [validData.categories]);

  // Notify parent component of filter changes
  useEffect(() => {
    if (onFilterChange) {onFilterChange(filter);}
  }, [filter, onFilterChange]);

  // Handle chart category click
  const handleCategoryClick = (category: string) => {
    if (filterEnabled) {
      setFilter(prevFilter => prevFilter === category ? "All" : category);
    }
  };

  // Handle data filtering
  useEffect(() => {
    if (!filterEnabled || filter === "All") {
      setFilteredCategories(validData.categories);
      setFilteredSeries(validData.series);
      return;
    }

    const categoryIndex = validData.categories.indexOf(filter);
    if (categoryIndex === -1) {
      setFilteredCategories([filter]);
      setFilteredSeries([{ name: "Request Count", data: [0] }]);
      return;
    }

    const filteredData = [validData.series[0].data[categoryIndex]];
    setFilteredCategories([filter]);
    setFilteredSeries([{ name: "Request Count", data: filteredData }]);
  }, [filter, validData, filterEnabled]);

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const selectedCategory = validData.categories[config.dataPointIndex];
          handleCategoryClick(selectedCategory);
        },
      },
      animations: {
        enabled: true,
        speed: 800,
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: "45%",
      },
    },
    states: {
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
        }
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return val?.toString() || '0';
      },
      style: {
        fontSize: "12px",
        colors: ["#000"],
      },
      offsetY: -20,
    },
    xaxis: {
      categories: filteredCategories,
      labels: {
        style: {
          fontSize: "12px",
        },
        rotate: -45,
        trim: true,
        maxHeight: 70
      },
    },
    yaxis: {
      labels: {
        formatter: function(val) {
          return Math.floor(val).toString();
        }
      }
    },
    colors: filteredCategories.map((category) => 
      category === filter && filter !== "All" ? colors[0] : colors[0]
    ),
    noData: {
      text: "No data available",
      align: 'center',
      verticalAlign: 'middle',
    }
  };

  return (
    <div className="utility-company-chart">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <CdTypography className="h5">{chartName}</CdTypography>
        {filterEnabled && uniqueCategories.length > 1 && (
          <CdDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <CdDropdownToggle caret style={{ width: "200px" }}>
              {filter}
            </CdDropdownToggle>
            <CdDropdownMenu>
              {uniqueCategories.map((category) => (
                <CdDropdownItem key={category} onClick={() => setFilter(category)} active={filter === category}>
                  {category}
                </CdDropdownItem>
              ))}
            </CdDropdownMenu>
          </CdDropdown>
        )}
      </div>
      <CdTypography className="h7">{chartDescription}</CdTypography>
      <CdChart
        options={chartOptions}
        series={filteredSeries}
        type={ChartType.Bar}
        height={250}
        className="shadow-sm"
      />
    </div>
  );
};

export default CdUtilityChart;