import { saveAs } from "file-saver";

export const downloadAsCSV = (
  data: any[],
  headers: { label: string; key: string }[],
  columnsVisibility: { [key: string]: boolean },
  fileName: string
) => {
  // Filter headers based on columnsVisibility
  const visibleHeaders = headers.filter(
    (header) => columnsVisibility[header.key]
  );

  // Extract the labels for the CSV headers
  const headerLabels = visibleHeaders.map((header) => header.label);

  // Extract the keys for data mapping
  const headerKeys = visibleHeaders.map((header) => header.key);

  // Map data rows to the visible headers
  const rows = data.map((row) => headerKeys.map((key) => row[key] || ""));

  // Combine headers and rows into CSV format
  const csvContent = [
    headerLabels.join(","), // CSV header row
    ...rows.map((row) => row.join(",")), // CSV data rows
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `${fileName}.csv`);
};
