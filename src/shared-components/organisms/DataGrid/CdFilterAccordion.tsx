import { CdTypography } from '@atoms/index';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { FC } from 'react';

export interface CdAccordionItem {
  header: string;
  body: React.ReactNode;
}

export interface FilterAccordionProps {
  items: CdAccordionItem[];
}

const CdFilterAccordion: FC<FilterAccordionProps> = ({ items = [] }) => {
  return items.map((item: CdAccordionItem, index: number) => {
    return (
      <Accordion
        key={index}
        sx={{
          border: 'none', // Remove the default accordion border
          boxShadow: 'none', // Remove box shadow
          minWidth: 320,
        }}
      >
        <AccordionSummary
          sx={{
            flexDirection: 'row-reverse', // Move icon to the left
            justifyContent: 'flex-start', // Align content properly
            gap: 1,
            borderBottom: '1px solid #ccc', // Add bottom border
          }}
          expandIcon={<ExpandMoreIcon sx={{ fontSize: 25 }} />}
        >
          <CdTypography className="h6 mt-1">{item.header}</CdTypography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            pb:0,
            border: 'none', // Remove the default accordion border
          }}
        >
          {item.body}
        </AccordionDetails>
      </Accordion>
    );
  });
};

export default CdFilterAccordion;
