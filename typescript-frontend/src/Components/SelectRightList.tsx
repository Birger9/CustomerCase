import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SetStateAction } from "react";

// Own files.
import {Colors} from '../Assets/Colors';


interface Props {
  id: string;
  labelId: string;
  value: string;
  valueList: string[];
  setValue: (value: SetStateAction<string>) => void;
}

export const SelectRightList: React.FC<Props> = ({ id, labelId, value, valueList, setValue }) => {

    const handleChange = (event: SelectChangeEvent) => {
      setValue(event.target.value);
    };

    return (
      <Select
        labelId={id}
        id={labelId}
        value={value}
        onChange={handleChange}
        sx={{backgroundColor: Colors.transparentWhite, maxWidth: '400px'}}
      >
        {valueList.map((item: string)=> (
            <MenuItem
              key={item}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
    </Select>
    );
}