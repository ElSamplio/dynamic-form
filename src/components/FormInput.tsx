import React, { useState } from "react";
import { InputBaseComponentProps, TextField, Select, MenuItem, InputLabel } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns'
import styles from '../../styles/Home.module.css';

interface SelectOptions {
    name: string;
    value: number;
}

interface FormInputProps extends InputBaseComponentProps {
    formInputId: number;
    formInputName: string;
    formInputType: string;
    value: string | number | null;
    options: SelectOptions[] | undefined;
    onChangeCb: (fieldId: number, newValue: string | number | null) => void
}

const FormInput: React.FC<FormInputProps> = (formInputProps: FormInputProps) => {

    const [inputValue, setInputValue] = useState(formInputProps.value);

    const inputChangeAction = (newValue: string | number | null) => {
        let valueToSave = newValue
        if (newValue !== null && typeof newValue === 'object') {
            valueToSave = format(newValue, 'MM/dd/yyyy')
        }
        setInputValue(newValue);
        formInputProps.onChangeCb(formInputProps.formInputId, valueToSave)
    }

    switch (formInputProps.formInputType) {
        case 'text':
        case 'number':
            return <>
                <TextField
                    label={formInputProps.formInputName}
                    className={styles.formInput}
                    value={inputValue}
                    onChange={(evt) => inputChangeAction(evt.target.value)} />
            </>
        case 'date':
            return <>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label={formInputProps.formInputName}
                        value={inputValue}
                        onChange={(newValue) => inputChangeAction(newValue)}
                        renderInput={(params) => <TextField {...params}
                            className={styles.formInput} />}
                    />
                </LocalizationProvider>
            </>
        case 'select':
            return <>
                <div>
                    <InputLabel id="select-label">{formInputProps.formInputName}</InputLabel>
                    <Select
                        labelId="select-label"
                        value={inputValue}
                        label={formInputProps.formInputName}
                        className={styles.formInput}
                        onChange={(evt) => inputChangeAction(evt.target.value)}
                    >
                        {
                            formInputProps.options?.map((option, index) =>
                                <MenuItem key={index} value={option.value}>{option.name}</MenuItem>
                            )
                        }
                    </Select>
                </div>
            </>
        default:
            return <>
            </>
    }

}

export default FormInput