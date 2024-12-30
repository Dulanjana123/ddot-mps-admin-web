import CdCard from "@atoms/Card/CdCard";
import { CdButton, CdContainer, CdDateInput, CdModal } from "@atoms/index";
import {
  ewrsAgainstStatus,
  ewrsFiledByEmergencyType,
  ewrsFiledByUc,
  ewrsFiledByWard,
} from "@data/chart-data/ewr-charts";
import { ewrsWithoutCP } from "@data/datagrid-data/ewr-datagrids";
import { ButtonTypes } from "@enums/components/ButtonEnum";
import { ChartType } from "@enums/components/chart-enum";
import { Variant } from "@enums/components/CommonEnum";
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
} from "@enums/components/Container";
import { ModalSize } from "@enums/components/modal-enum";
import { ModalContentType } from "@enums/modal-content-type";
import { zodResolver } from "@hookform/resolvers/zod";
import translatedFormValidation from "@hooks/useTranslatedFormValidation";
import {
  ChartDataSeriesItem,
  EwrDashboardData,
} from "@interfaces/components/chart";
import { DateRangeDto } from "@interfaces/request/date-range-dto";
import { CdChart, CdCounterCard, CdLoadingButton } from "@molecules/index";
import CdDataGrid from "@organisms/DataGrid/CdDataGrid";
import { ewrService } from "@services/api/ewr-service";
import { updateChartCategories } from "@utils/chart-utils";
import {
  dateToYMDFormat,
  firstDateOfCurrentMonth,
} from "@utils/helper/format-date";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Col, Container, Row } from "reactstrap";
import { H2 } from "src/AbstractElements";
import { z } from "zod";

const initForm = () => {
  const QuickDashboardDateSchema = z.object({
    startDate: z.string(),
    endDate: z.string(),
  });

  type FormFields = z.infer<typeof QuickDashboardDateSchema>;

  const initialValues: DateRangeDto = {
    startDate: firstDateOfCurrentMonth(),
    endDate: dateToYMDFormat(new Date()),
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<FormFields>({
    defaultValues: initialValues,
    resolver: zodResolver(QuickDashboardDateSchema),
  });

  return { control, handleSubmit, errors, isSubmitting, setValue, reset };
};

const QuickDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [dateRange, setDateRange] = useState<DateRangeDto>({
    startDate: firstDateOfCurrentMonth(),
    endDate: dateToYMDFormat(new Date()),
  });

  const [dashboardData, setDashboardData] = useState<EwrDashboardData>();

  const [expandedChartDataSeries, setExpandedChartDataSeries] =
    useState<ChartDataSeriesItem[]>();

  const [rows, setRows] = useState([
    {
      id: 1,
      requestNumber: 101,
      location: "sample location 01",
      ward: "ward 01",
      requestedDate: new Date(2021, 6, 8),
      emergencyType: "VIP",
      emergencyCause: "cause 01",
      status: "Active",
      appliedDate: new Date(2021, 6, 8),
      creationDate: new Date(2021, 6, 8),
    },
    {
      id: 2,
      requestNumber: 102,
      location: "sample location 01",
      ward: "ward 01",
      requestedDate: new Date(2021, 6, 8),
      emergencyType: "VIP",
      emergencyCause: "cause 01",
      status: "Active",
      appliedDate: new Date(2021, 6, 8),
      creationDate: new Date(2021, 6, 8),
    },
    {
      id: 3,
      requestNumber: 103,
      location: "sample location 01",
      ward: "ward 01",
      requestedDate: new Date(2021, 6, 8),
      emergencyType: "VIP",
      emergencyCause: "cause 01",
      status: "Active",
      appliedDate: new Date(2021, 6, 8),
      creationDate: new Date(2021, 6, 8),
    },
    {
      id: 4,
      requestNumber: 104,
      location: "sample location 01",
      ward: "ward 01",
      requestedDate: new Date(2021, 6, 8),
      emergencyType: "VIP",
      emergencyCause: "cause 01",
      status: "Active",
      appliedDate: new Date(2021, 6, 8),
      creationDate: new Date(2021, 6, 8),
    },
  ]);

  const [modalContentType, setModalContentType] = useState(
    ModalContentType.Chart
  );

  const [chartType, setChartType] = useState<ChartType>(ChartType.Bar);

  const [modalTitle, setModalTitle] = useState("");

  const [expandedChartOptions, setExpandedChartOptions] = useState<ApexOptions>(
    {}
  );

  const { control, handleSubmit, isSubmitting, reset, errors } = initForm();

  const onDateChangeHandler: SubmitHandler<DateRangeDto> = async (
    changeDatesData
  ) => {
    setDateRange(changeDatesData);
  };

  const updateChartData = async () => {
    setIsLoading(true);
    const response = await ewrService.getDashboardData(dateRange);
    const responseData = response.data;
    if (responseData) {
      setDashboardData({
        totalEwrCount: responseData.totalEwrCount,
        ewrCountWithoutCP: responseData.ewrCountWithoutCP,
        ewrsFiledByUcChartData: {
          categories: (responseData.ewrVsAgencyChartData || []).map(
            (item) => item.utilityCompany
          ),
          series: [
            {
              name: "Total Requests",
              data: (responseData.ewrVsAgencyChartData || []).map(
                (item) => item.requestCount
              ),
            },
          ],
        },
        ewrsFiledByWardChartData: {
          categories: (responseData.wardVsEwrChartData || []).map(
            (item) => item.ward
          ),
          series: [
            {
              name: "Total Requests",
              data: (responseData.wardVsEwrChartData || []).map(
                (item) => item.requestCount
              ),
            },
          ],
        },
        ewrsFiledByEmergencyTypeChartData: {
          categories: (responseData.emergencyTypeVsEwrChartData || []).map(
            (item) => item.emergencyType
          ),
          series: [
            {
              name: "Total Requests",
              data: (responseData.emergencyTypeVsEwrChartData || []).map(
                (item) => item.requestCount
              ),
            },
          ],
        },
        ewrsFiledByStatusChartData: {
          categories: (responseData.statusVsEwrChartData || []).map(
            (item) => item.status
          ),
          series: [
            {
              name: "Total Requests",
              data: (responseData.statusVsEwrChartData || []).map(
                (item) => item.requestCount
              ),
            },
          ],
        },
      });
      setIsLoading(false);
    }
  };

  const handleDateReset = () => {
    reset();
  };

  useEffect(() => {
    updateChartData();
  }, [dateRange]);

  return (
    <>
      <Container fluid>
        <form onSubmit={handleSubmit(onDateChangeHandler)}>
          <CdCard>
            <Row xs="1" md="2" className="d-flex align-items-baseline p-3">
              <CdContainer className="p-0">
                <H2>Quick Dashboard</H2>
                <CdContainer
                  flex
                  alignItems={AlignItems.baseline}
                  justifyContent={JustifyContent.start}
                  flexDirection={FlexDirection.row}
                  gap="10px"
                  className="mt-3"
                >
                  <CdButton
                    color={Variant.secondary}
                    id="reset-btn"
                    onClick={handleDateReset}
                    type={ButtonTypes.submit}
                  >
                    Reset
                  </CdButton>
                  <CdLoadingButton
                    color={Variant.primary}
                    isLoading={isSubmitting || isLoading}
                    text="Apply"
                    type={ButtonTypes.submit}
                    disabled={isSubmitting || isLoading}
                    id={"refresh-button"}
                  />
                </CdContainer>
              </CdContainer>
              <Row xs="1" md="2" className="d-flex align-items-baseline">
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <CdDateInput
                      id="startDate"
                      onChange={(e) => field.onChange(e.target.value)}
                      label="Start Date"
                      value={field.value}
                      invalid={!!errors.startDate}
                      feedback={translatedFormValidation(
                        errors.startDate?.message
                      )}
                      required
                    />
                  )}
                />
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <CdDateInput
                      id="endDate"
                      onChange={(e) => field.onChange(e.target.value)}
                      label="End Date"
                      value={field.value}
                      invalid={!!errors.endDate}
                      feedback={translatedFormValidation(
                        errors.endDate?.message
                      )}
                      required
                    />
                  )}
                />
              </Row>
            </Row>
          </CdCard>
        </form>
        <Row>
          <Col sm="4" className="d-flex flex-column">
            <CdCounterCard
              title="Total of Emergency Work Requests"
              count={dashboardData?.totalEwrCount}
            />
            <CdCounterCard
              title={ewrsWithoutCP.title || ""}
              count={dashboardData?.ewrCountWithoutCP}
              onClick={() => {
                setModalTitle(ewrsWithoutCP.title || "");
                setModalContentType(ModalContentType.Table);
                setModalOpen(true);
              }}
            />
          </Col>
          <Col sm="4" className="d-flex flex-column">
            {dashboardData?.ewrsFiledByUcChartData && (
              <CdChart
                title={ewrsFiledByUc.title}
                options={ewrsFiledByUc.basicChartOptions}
                series={dashboardData.ewrsFiledByUcChartData.series}
                type={ewrsFiledByUc.chartType}
                height={200}
                onClick={() => {
                  setModalTitle(ewrsFiledByUc.title);
                  setChartType(ewrsFiledByUc.chartType);
                  setExpandedChartOptions(
                    updateChartCategories(
                      dashboardData.ewrsFiledByUcChartData.categories,
                      ewrsFiledByUc.expandedChartOptions
                    )
                  );
                  setExpandedChartDataSeries(
                    dashboardData.ewrsFiledByUcChartData?.series
                  );
                  setModalContentType(ModalContentType.Chart);
                  setModalOpen(true);
                }}
              />
            )}
          </Col>
          <Col sm="4" className="d-flex flex-column">
            {dashboardData?.ewrsFiledByWardChartData && (
              <CdChart
                title={ewrsFiledByWard.title}
                options={ewrsFiledByWard.basicChartOptions}
                series={dashboardData.ewrsFiledByWardChartData?.series}
                type={ewrsFiledByWard.chartType}
                onClick={() => {
                  setModalTitle(ewrsFiledByWard.title);
                  setChartType(ewrsFiledByWard.chartType);
                  setExpandedChartOptions(
                    updateChartCategories(
                      dashboardData.ewrsFiledByWardChartData?.categories || [],
                      ewrsFiledByWard.expandedChartOptions
                    )
                  );
                  setExpandedChartDataSeries(
                    dashboardData.ewrsFiledByWardChartData?.series
                  );
                  setModalContentType(ModalContentType.Chart);
                  setModalOpen(true);
                }}
              />
            )}
          </Col>
          <Col sm="6" className="d-flex flex-column">
            {dashboardData?.ewrsFiledByEmergencyTypeChartData && (
              <CdChart
                title={ewrsFiledByEmergencyType.title}
                options={ewrsFiledByEmergencyType.basicChartOptions}
                series={dashboardData.ewrsFiledByEmergencyTypeChartData?.series}
                height={300}
                type={ewrsFiledByEmergencyType.chartType}
                onClick={() => {
                  setModalTitle(ewrsFiledByEmergencyType.title);
                  setChartType(ewrsFiledByEmergencyType.chartType);
                  setExpandedChartOptions(
                    updateChartCategories(
                      dashboardData.ewrsFiledByEmergencyTypeChartData
                        ?.categories || [],
                      ewrsFiledByEmergencyType.expandedChartOptions
                    )
                  );
                  setExpandedChartDataSeries(
                    dashboardData.ewrsFiledByEmergencyTypeChartData?.series
                  );
                  setModalContentType(ModalContentType.Chart);
                  setModalOpen(true);
                }}
              />
            )}
          </Col>
          <Col sm="6" className="d-flex flex-column">
            {dashboardData?.ewrsFiledByStatusChartData && (
              <CdChart
                title={ewrsAgainstStatus.title}
                options={ewrsAgainstStatus.basicChartOptions}
                series={dashboardData.ewrsFiledByStatusChartData?.series}
                height={300}
                type={ewrsAgainstStatus.chartType}
                onClick={() => {
                  setChartType(ewrsAgainstStatus.chartType);
                  setModalTitle(ewrsAgainstStatus.title);
                  setExpandedChartOptions(
                    updateChartCategories(
                      dashboardData.ewrsFiledByStatusChartData?.categories ||
                        [],
                      ewrsAgainstStatus.expandedChartOptions
                    )
                  );
                  setExpandedChartDataSeries(
                    dashboardData.ewrsFiledByStatusChartData?.series
                  );
                  setModalContentType(ModalContentType.Chart);
                  setModalOpen(true);
                }}
              />
            )}
          </Col>
        </Row>
      </Container>
      <CdModal
        size={ModalSize.lg}
        id="modal"
        title={modalTitle}
        isOpen={modalOpen}
        toggle={() => setModalOpen(!modalOpen)}
        showFooter={false}
        body={
          modalContentType === ModalContentType.Table ? (
            <CdDataGrid
              height={400}
              columns={ewrsWithoutCP.columns}
              rows={rows}
              setRows={setRows}
              hideToolbar={true}
            />
          ) : (
            <CdChart
              height={350}
              options={expandedChartOptions}
              series={expandedChartDataSeries || []}
              type={chartType}
            />
          )
        }
      />
    </>
  );
};

export default QuickDashboard;
