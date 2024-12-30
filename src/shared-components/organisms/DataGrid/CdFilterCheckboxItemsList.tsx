import { CdBadge, CdCheckboxInput } from '@atoms/index';
import { SoftVariant } from '@enums/components/CommonEnum';
import { CdSearchBox } from '@molecules/index';
import { FormControlLabel, FormGroup } from '@mui/material';
import { FC, useState } from 'react';

export interface FilterOnCheckedModel {
  key: string;
  name: string;
  checked: boolean;
  variant?: SoftVariant;
}

type FilterCheckboxItemProps = {
  filterCheckedModel: FilterOnCheckedModel[];
  setFilterOnCheckedModel: (args: any) => void;
  searchBoxEnable?: boolean;
  searchBoxPlaceholder?: string;
  enableBadgeLabal?: boolean;
  enableSorting?: boolean;
};

const CdFilterCheckboxItemsList: FC<FilterCheckboxItemProps> = ({
  filterCheckedModel,
  setFilterOnCheckedModel,
  searchBoxEnable = false,
  searchBoxPlaceholder,
  enableBadgeLabal = false,
  enableSorting = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFilterOnChecked = (key: string) => {
    setFilterOnCheckedModel((prevState: FilterOnCheckedModel[]) =>
      prevState.map((item) => (item.key === key ? { ...item, checked: !item.checked } : item)),
    );
  };

  const filteredItems = filterCheckedModel
    .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => (enableSorting ? Number(b.checked) - Number(a.checked) : 0)) // Conditional sorting
    .slice(0, 5);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <FormGroup>
      {searchBoxEnable && (
        <CdSearchBox id="search-box" onChange={handleSearchChange} placeHolder={searchBoxPlaceholder} />
      )}
      {filteredItems.map((item: FilterOnCheckedModel, index: number) => {
        return (
          <FormControlLabel
            key={index}
            control={
              <CdCheckboxInput
                className="ms-2 my-2"
                id="check-box"
                checked={item.checked}
                onChange={() => toggleFilterOnChecked(item.key)}
              />
            }
            label={enableBadgeLabal ? <CdBadge className="py-2 px-2" id="badge-lable" text={item.name} color={item.variant} /> : item.name}
          />
        );
      })}
    </FormGroup>
  );
};

export default CdFilterCheckboxItemsList;
