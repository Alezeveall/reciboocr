import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import ImgUpload from '../ImgUpload/index.jsx';
import Receipt from '../Receipt/index.js';
import Tesseract from '../Tesseract/index.js';

const steps = [
  'Upload do Recibo',
  'Pré-Validação',
  'Processamento',
  'Resultado',
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [img, setImg] = React.useState();
  const [imgData, setImgData] = React.useState();
  const [controlButton, setControlButton] = React.useState(true);
  const [formData, setFormData] = React.useState();
  const [list, setList] = React.useState([]);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const listFill = (newList = []) => {
    console.log('Teste');
    console.log(newList);
    setList([...newList]);
    console.log(list);
  };
  const getImg = (imgSource) => {
    setImg(imgSource);
    if (imgSource) {
      setControlButton(false);
    }
  };

  const getImgFile = (imgFile) => {
    setImgData(imgFile);
  };

  const getImgForm = (data) => {
    setFormData(data);
  };
  const disableButton = (isDisable = true) => {
    setControlButton(isDisable);
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
    border: '0.1px solid #E0E0E0',
    borderRadius: '7px',
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Opcional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Processamento foi concluído
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reiniciar</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Passo: {activeStep + 1}</Typography>
          {activeStep === 0 && (
            <ImgUpload
              getImg={getImg}
              getImgFile={getImgFile}
              getImgForm={getImgForm}
            />
          )}
          {activeStep === 1 && (
            <Tesseract
              imgDefault={img}
              imgData={imgData}
              formData={formData}
              disableButton={disableButton}
            />
          )}
          {activeStep === 2 && (
            <Receipt
              imgDefault={img}
              imgData={imgData}
              imgForm={formData}
              disableButton={disableButton}
              listFill={listFill}
            />
          )}
          {activeStep === 3 && (
            <List sx={style} component="nav">
              {list.map((listItem, index) => {
                return (
                  <>
                    <ListItem>
                      <ListItemText primary={listItem} />
                    </ListItem>
                    {list.length - 1 !== index && <Divider />}
                  </>
                );
              })}
            </List>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Anterior
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Pular
              </Button>
            )} */}

            <Button disabled={controlButton} onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Fim' : 'Próximo'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
