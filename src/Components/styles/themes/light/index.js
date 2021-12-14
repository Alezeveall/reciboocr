import { createTheme } from "@material-ui/core/styles";

//para criar tema, verificar https://material-ui.com/pt/customization/default-theme/
const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#005882",
      // secondary: "#BFD72D",
    },
    secondary: {
      main: "#BFD72D",
      contrastText: "#005882",
    },
    type: "light",
  },
});

export default lightTheme;
