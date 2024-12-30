import { useEffect, useState } from "react";
import { ewrService } from "@services/api/ewr-service";
import CdDropdown from "@atoms/Dropdown/CdDropdown";
import CdDropdownToggle from "@atoms/DropdownToggle/CdDropdownToggle";
import CdDropdownMenu from "@atoms/DropdownMenu/CdDropdownMenu";
import CdDropdownItem from "@atoms/DropdownItem/CdDropdownItem";
import CdStatCard from "@molecules/StatCard/CdStatCard";
import ProgressBarWidget from "@molecules/ProgressBarWidget/CdProgressBarWidget";
import CdCard from "@atoms/Card/CdCard";
import CdCardBody from "@atoms/Card/CardBody";
import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import { CdContainer, CdDatePicker } from "@atoms/index";
import CdUtilityChart from "@molecules/UtilityChart/CdUtilityChart";
import RecentEmergencyWorkRequests from "./RecentEmergencyWorkRequests";


export default function EmergencyWorkRequest() {
  const [selectedUtilityFilter, setSelectedUtilityFilter] = useState<string | null>(null);
  const [selectedWardFilter, setSelectedWardFilter] = useState<string | null>(null);
  const [selectedEmergencyTypeFilter, setSelectedEmergencyTypeFilter] = useState<string | null>(null);
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
 
  const [startDate, setStartDate] = useState<string>("1970-01-01");
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [selectedRange, setSelectedRange] = useState<string>("All Time");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const [chartData, setChartData] = useState<any>({
    allData: { series: [], categories: [] }
  });

  const segments = [
    { label: "Status Label", value: 0, color: "HexColorCode" }
  ];

  const handleDateRangeChange = (range: string) => {
    setSelectedRange(range);
  
    const today = new Date();
  
    switch (range) {
      case "All Time":
      setStartDate("1970-01-01"); //Default date
      setEndDate(today.toISOString().split("T")[0]);
      break;
      case "Today":
        setStartDate(today.toISOString().split("T")[0]);
        setEndDate(today.toISOString().split("T")[0]);
        break;
      case "Last 7 Days":
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 7);
        setStartDate(last7Days.toISOString().split("T")[0]);
        setEndDate(today.toISOString().split("T")[0]);
        break;
      case "Last 30 Days":
        const last30Days = new Date(today);
        last30Days.setDate(today.getDate() - 30);
        setStartDate(last30Days.toISOString().split("T")[0]);
        setEndDate(today.toISOString().split("T")[0]);
        break;
      case "Custom":
        break;
      default:
        setStartDate("");
        setEndDate("");
    }
  };

  
  const fetchChartData = async () => {
    try {
      const response = await ewrService.getDashboardData({
        startDate: startDate,
        endDate: endDate,
      });
  
      if (!response || !response.data) {
        console.error("No data received");
        return;
      }
  
      const {
        ewrCountWithoutCP = 0,
        ewrVsAgencyChartData = [],
        wardVsEwrChartData = [],
        emergencyTypeVsEwrChartData = [],
        statusVsEwrChartData = [],
        inspectorCountChartData = [],
      } = response.data;
  
      // Ensure data integrity and avoid undefined/null issues
      const transformedSegments = (statusVsEwrChartData || []).map((item, index) => ({
        label: item?.status || "Unknown",
        value: item?.requestCount || 0,
        color: ["#FF4B4B", "#377DFF", "#FCD77F", "#3CD278"][index % 4], // Cycle colors
      }));
  
      const totalEmergencyRequests = (emergencyTypeVsEwrChartData || []).reduce(
        (sum, item) => sum + (item?.requestCount || 0),
        0
      );
  
      const transformedChartData = {
        ewrCountWithoutCP,
        segments: transformedSegments,

        ewrVsAgency: {
          allData: {
            chartName: "By Utility Company",
            series: [
              {
                name: "Request Count",
                data: (ewrVsAgencyChartData || [])
                  .filter((d) => d?.requestCount > 0)
                  .map((d) => d?.requestCount || 0),
              },
            ],
            categories: (ewrVsAgencyChartData || [])
              .filter((d) => d?.requestCount > 0)
              .map((d) => d?.utilityCompany || "Unknown"),
          },
        },

        wardVsEwr: {
          allData: {
            chartName: "Request per Ward",
            series: [
              {
                name: "Request Count",
                data: (wardVsEwrChartData || [])
                  .filter((d) => d?.ward && d?.requestCount > 0)
                  .map((d) => d?.requestCount || 0),
              },
            ],
            categories: (wardVsEwrChartData || [])
              .filter((d) => d?.ward && d?.requestCount > 0)
              .map((d) => d?.ward || "Unknown"),
          },
        },

        emergencyTypeVsEwr: {
          totalCount: totalEmergencyRequests,
          allData: {
            chartName: "Emergency Types",
            series: [
              {
                name: "Request Count",
                data: (emergencyTypeVsEwrChartData || [])
                  .filter((d) => d?.emergencyType && d?.requestCount > 0)
                  .map((d) => d?.requestCount || 0),
              },
            ],
            categories: (emergencyTypeVsEwrChartData || [])
              .filter((d) => d?.emergencyType && d?.requestCount > 0)
              .map((d) => d?.emergencyType || "Unknown"),
          },
        },

        statusVsEwr: {
          allData: {
            chartName: "Inspector Hours",
            series: [
              {
                name: "Request Count",
                data: (statusVsEwrChartData || [])
                  .filter((d) => d?.status && d?.requestCount > 0)
                  .map((d) => d?.requestCount || 0),
              },
            ],
            categories: (statusVsEwrChartData || [])
              .filter((d) => d?.status && d?.requestCount > 0)
              .map((d) => d?.status || "Unknown"),
          },
        },

        inspectorVsEwr:{
          allData: {
            chartName: "Inspector Count",
            series: [
              {
                name: "Request Count",
                data: (inspectorCountChartData || [])
                  .filter((d) => d?.inspectorName && d?.totalInspectCount > 0)
                  .map((d) => d?.totalInspectCount || 0),
              },
            ],
            categories: (inspectorCountChartData || [])
              .filter((d) => d?.inspectorName && d?.totalInspectCount > 0)
              .map((d) => d?.inspectorName || "Unknown"),
          }
        },
        
      };

      setChartData(transformedChartData);
    } catch (error) {
      setChartData({ allData: { series: [], categories: [] } }); // Fallback for errors
    }
  };
  
  useEffect(() => {
    fetchChartData();
  }, [startDate, endDate]);

  useEffect(() => {
    if (selectedRange === "Custom" && customStartDate && customEndDate) {
      setStartDate(customStartDate.toISOString().split("T")[0]);
      setEndDate(customEndDate.toISOString().split("T")[0]);
    }
  }, [customStartDate, customEndDate, selectedRange]);

  return (
      <>
        <CdContainer fluid>
          <CdRow>
            <CdCol sm="12">
              <CdCard>
               
                <CdCardBody>

                <CdRow className="mb-3 align-items-center">
                    <CdCol sm="auto" className="date-filter">
                      <CdDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                        <CdDropdownToggle caret  style={{ width: "180px" }}>
                          {selectedRange === "Custom" ? "Custom Date Range" : selectedRange}
                        </CdDropdownToggle>
                        <CdDropdownMenu>
                          <CdDropdownItem onClick={() => handleDateRangeChange("All Time")}>All Time</CdDropdownItem>
                          <CdDropdownItem onClick={() => handleDateRangeChange("Today")}>Today</CdDropdownItem>
                          <CdDropdownItem onClick={() => handleDateRangeChange("Last 7 Days")}>Last 7 Days</CdDropdownItem>
                          <CdDropdownItem onClick={() => handleDateRangeChange("Last 30 Days")}>Last 30 Days</CdDropdownItem>
                          <CdDropdownItem onClick={() => handleDateRangeChange("Custom")}>Custom</CdDropdownItem>
                        </CdDropdownMenu>
                      </CdDropdown>
                    </CdCol>

                    {selectedRange === "Custom" && (
                      <>
                        <CdCol sm="auto">
                          <CdDatePicker
                            id="customStartDate"
                            className="form-control"
                            selected={customStartDate}
                            onChange={setCustomStartDate}
                            placeholderText="Start Date"
                          />
                        </CdCol>
                        <CdCol sm="auto">
                          <CdDatePicker
                          id="customEndDate"
                            className="form-control"
                            selected={customEndDate}
                            onChange={setCustomEndDate}
                            placeholderText="End Date"
                          />
                        </CdCol>
                      </>
                    )}
                </CdRow>

                      <CdContainer fluid className="p-0 mb-4">
                        <CdRow className="g-0 align-items-stretch"  >
                            <CdCol  className="p-1">
                              <CdStatCard
                                className="flex-fill w-100"
                                textColor="text-dark"
                                description="Total Emergency Work Requests "
                                count={chartData.emergencyTypeVsEwr?.totalCount || 0}
                                linkText="View Requests"
                                onLinkClick={() => console.log("Total Requests Clicked")}
                                style={{ height: "200px", overflow: "hidden" }} //since Bootstrap 5 does not natively support a specific 200px height
                              />
                            </CdCol>
                            <CdCol className="p-1">
                              <CdStatCard
                                className="flex-fill w-100"
                                bgColor="#f8d7da"
                                textColor="text-danger"
                                borderColor="border-danger"
                                description="EWRs without a Construction Permit Application"
                                count={chartData.ewrCountWithoutCP || 0}
                                linkText="View Requests"
                                onLinkClick={() => console.log("Total Requests Clicked")}
                                style={{  height: "200px", overflow: "hidden" }} 
                              />
                            </CdCol>
                            <CdCol className="p-1">
                              <ProgressBarWidget
                                className="flex-fill w-100"
                                title="Requests Status Distribution"
                                subtitle="Total EWR's"
                                segments={chartData.segments || []}
                                style={{ height: "200px", overflow: "hidden" }} 
                              />
                            </CdCol>
                          </CdRow>
                      </CdContainer>

                      
                        
                      <CdRow>
                        <CdCol sm="6" className="mb-3">
                          <CdCard>
                            <CdCardBody>
                              <CdUtilityChart 
                                  chartName={chartData.ewrVsAgency?.allData.chartName}
                                  chartDescription="Emergency Work Requests by Utility Company"
                                  chartData={chartData.ewrVsAgency} 
                                  onFilterChange={setSelectedUtilityFilter}
                                />

                            </CdCardBody>
                          </CdCard>
                        </CdCol>
                      
                        <CdCol sm="6" className="mb-3">
                          <CdCard>
                            <CdCardBody>
                              <CdUtilityChart 
                               chartName={chartData.wardVsEwr?.allData.chartName}
                               chartDescription="Emergency Work Requests by Ward"
                               chartData={chartData.wardVsEwr} 
                               onFilterChange={setSelectedWardFilter}
                               />
                            </CdCardBody>
                          </CdCard>
                        </CdCol>
                      </CdRow>

                      <CdRow>
                        <CdCol sm="6" className="mb-1">
                          <CdCard>
                            <CdCardBody>
                              <CdUtilityChart 
                               chartName={chartData.emergencyTypeVsEwr?.allData.chartName}
                               chartDescription="Emergency Work Requests by Type"
                               chartData={chartData.emergencyTypeVsEwr}
                               onFilterChange={setSelectedEmergencyTypeFilter}
                                />
                               
                            </CdCardBody>
                          </CdCard>
                        </CdCol>
                      
                        <CdCol sm="6" className="mb-1">
                          <CdCard>
                            <CdCardBody>
                              <CdUtilityChart 
                               chartName={chartData.inspectorVsEwr?.allData.chartName}
                               chartDescription="Emergency Work Requests by Inspector"
                               chartData={chartData.inspectorVsEwr}
                               filterEnabled={false} 
                               colors={["#87CEEB"]}
                               
                               />
                            </CdCardBody>
                          </CdCard>
                        </CdCol>

                        <RecentEmergencyWorkRequests 
                          startDate={startDate} 
                          endDate={endDate}
                          utilityFilter={selectedUtilityFilter !== "All" ? selectedUtilityFilter : null}
                          wardFilter={selectedWardFilter !== "All" ? selectedWardFilter : null}
                          emergencyTypeFilter={selectedEmergencyTypeFilter !== "All" ? selectedEmergencyTypeFilter : null}
                          >
                        </RecentEmergencyWorkRequests>
                        
                      </CdRow>
                </CdCardBody>
              </CdCard>
              
            </CdCol>
          </CdRow>
        </CdContainer>
        
      </>
  );
}
