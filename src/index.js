import React from 'react';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
let theme = createTheme({
  components: {
    Grid: {
      backgroundColor: '#181818',
      textColor: '#FFFFFF',
    },
    Table: {
      primary: '#000000',
      secondary:'#FFFFFF'
    },
    Row: {
      primary: '#FFFFFF',
      selected:'#808080'
    },
    Search: {
      backgroundColor: '#121212',
      borderColor: '#444D56',
      textColor: '#FFFFFF',
    },
    Button:{
      backgroundColor:'#EE1520',  
      textColor:'#FFFFFF'
    },
  }
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
