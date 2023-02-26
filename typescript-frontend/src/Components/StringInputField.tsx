import { OutlinedInput } from '@mui/material';
import { SetStateAction } from 'react';

// Own files.
import {Colors} from '../Assets/Colors';

interface Props {
    id: string;
    strValue: string;
    setStr: (value: SetStateAction<string>) => void;
}

export const StringInputField: React.FC<Props> = (props) => {

    const handleInputtedStr = (event: { target: { value: string }; }) => {
        props.setStr(event.target.value);
    };

    return (
        <OutlinedInput
            id={props.id}
            value={props.strValue}
            onChange={handleInputtedStr}
            sx={{backgroundColor: Colors.transparentWhite, maxWidth: '400px'}}
        />
    );
}