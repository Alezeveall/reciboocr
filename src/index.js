import * as React from 'react';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import Stepper from './Components/Stepper/index';
import App  from './App';
//import Auth  from './Auth';
//import Teste from './Components/Teste' 


ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <App />

    <Stepper />   
    
  </StyledEngineProvider>,
  document.querySelector("#root")
);