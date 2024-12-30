import { FC, useEffect, useState } from "react";
import { Accordion, AccordionProps, Card, CardBody, Col } from "reactstrap";
import CdAccordionItem from "@atoms/AccordionItem/AccordionItem";
import CdCard from "@atoms/Card/CdCard";
import CdCol from "@atoms/Base/CdCol";

interface CdAccordionProps extends Omit<AccordionProps, "open" | "toggle"> {
  accordionList: {
    id: string;
    icon: boolean;
    accordionHeaderClass: string;
    accordionHeading: string;
    spanClass: string;
  }[];
}

const CdAccordion: FC<CdAccordionProps> = ({ accordionList }) => {
  const [open, setOpen] = useState<string[]>([]);

  useEffect(() => {
    const allIds = accordionList.map((item) => item.id);
    setOpen(allIds);
  }, [accordionList]);

  const toggle = (id: string) => {
    if (open.includes(id)) {
      setOpen(open.filter((openId) => openId !== id));
    } else {
      setOpen([...open, id]);
    }
  };

  return (
    <CdCol sm="12">
      <CdCard>
        <CardBody>
          <Accordion open={open} toggle={toggle} className="dark-accordion">
            {accordionList.map((data, index) => (
              <CdAccordionItem item={data} key={index} />
            ))}
          </Accordion>
        </CardBody>
      </CdCard>
    </CdCol>
  );
};

export default CdAccordion;
