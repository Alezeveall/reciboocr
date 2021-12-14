import { makeStyles } from "@material-ui/core/styles";

export const GlobalPageStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  cardHeader: {
    borderBottom: "2px solid #EEEEEE",
    margin: 15,
    marginTop: 20,
  },
  title: {
    marginBottom: 10,
  },
  marginCard: {
    marginBottom: 15,
  },
}));
