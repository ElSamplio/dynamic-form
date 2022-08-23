import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import formConfig from '../config.json';
import formData from '../data/data.json';
import { ConfigFieldType } from '../src/types/ConfigFieldType';
import FormInput from '../src/components/FormInput';
import { Box, Grid, Snackbar, Typography } from '@mui/material';
import { FormType } from '../src/types/FormType';
import { DataStructType, DataType } from '../src/types/DataType';
import Button from '@mui/material/Button';
import { format } from 'date-fns';
import useSaveData from '../src/hooks/useSaveData';
import Message from '../src/components/Message';

type SnackbarStatusType = {
  open: boolean,
  message: string,
  severity: 'success' | 'info' | 'warning' | 'error' | '',
}

const Home: NextPage = () => {
  const fields: ConfigFieldType[] = formConfig.fields;
  const data: DataType[] = formData.data;
  const [formFieldsData, setFormFieldsData] = useState<FormType[]>([]);
  const [dataToSave, setDataToSave] = useState<DataType[]>([...data]);
  const [fileData, setFileData] = useState<DataStructType>({ dateSaved: '', data: [] });
  const [snackbarInitialStatus] = useState<SnackbarStatusType>({
    open: false,
    severity: '',
    message: ''
  });
  const [snackbarStatus, setSnackbarStatus] = useState<SnackbarStatusType>(snackbarInitialStatus);
  const [saveData] = useSaveData(fileData)

  useEffect(() => {
    const fData: FormType[] = [];
    fields.forEach(field => {
      const valueArr = data.filter(elem => elem.fieldId === field.id);
      if (valueArr && valueArr.length > 0) {
        const foundValue = valueArr[0];
        const formField: FormType = {
          fieldConfig: { ...field },
          fieldValue: { ...foundValue },
        }
        fData.push(formField);
      }
    })
    setFormFieldsData([...fData]);
  }, [fields, data])

  useEffect(() => {
    if (fileData.data.length > 0) {
      let newSnackbarStatus: SnackbarStatusType = {
        open: true,
        severity: 'error',
        message: '',
      }
      saveData().then((resp: any) => {
        if (resp.message) {
          newSnackbarStatus.message = resp.message;
          newSnackbarStatus.severity = 'success';
        } else {
          newSnackbarStatus.message = 'Error: ' + resp.err;
        }
      }).catch(err => {
        newSnackbarStatus.message = 'Error: ' + err;
      }).finally(() => {
        setSnackbarStatus({ ...newSnackbarStatus });
        setFileData({ dateSaved: '', data: [] });
      });
    }
  }, [fileData, saveData, snackbarInitialStatus])

  const inputCb = (fieldId: number, value: string | number | null) => {
    const toSave = [...dataToSave];
    const changedElemIndex = dataToSave.findIndex(elem => elem.fieldId === fieldId);
    if (changedElemIndex >= 0) {
      const changedElem: DataType = { fieldId, value };
      toSave[changedElemIndex] = changedElem;
      setDataToSave([...toSave]);
    }
  }

  const btnSaveCallback = async () => {
    const fileContents: DataStructType = {
      dateSaved: format(new Date(), 'MM/dd/yyyy'),
      data: dataToSave
    }
    setFileData({ ...fileContents })
  };

  return (
    <Box sx={{ flexGrow: 1 }} className={styles.container}>
      <Typography variant='h3' className={styles.title}>{formConfig.formName}</Typography>
      <Grid container spacing={2}>
        {
          formFieldsData.map(field =>
            <Grid xs={6} key={field.fieldConfig.id}>
              <FormInput
                formInputId={field.fieldConfig.id}
                formInputName={field.fieldConfig.name}
                formInputType={field.fieldConfig.type}
                value={field.fieldValue.value}
                options={field.fieldConfig.options}
                onChangeCb={inputCb} />
            </Grid>
          )
        }
        <Grid xs={6}>
          <Button variant="contained" onClick={btnSaveCallback}>Save</Button>
        </Grid>
      </Grid>
      <Message
        open={snackbarStatus.open}
        autoHideDuration={6000}
        handleClose={() => setSnackbarStatus(snackbarInitialStatus)}
        message={snackbarStatus.message}
      />
    </Box>
  )
}

export default Home
