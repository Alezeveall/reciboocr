import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    color: theme.palette.primary,
    margin: 10,
  },
  input: {
    display: "none",
  },
  img: {
    width: "330px",
    height: "230px",
  },
  imgUpload: {
    position: "absolute",
    maxHeight: "230px",
    maxWidth: "330px",
    justifyContent: "center",
    alignItems: "center",
  },
  positionBtnUpload: {
    bottom: "-165px",
    right: "-270px",
    zIndex: 999,
  },
  btnColor: {
    backgroundColor: "#4182A1",
  },
  divOpacity: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 999,
    width: "330px",
    height: "230px",
    backgroundColor: "rgba(255,255,255,0.4)",
    // backgroundColor: "rgba(0,0,0,0.3)",
  },
  backDropImg: {
    position: "absolute",
    paddingLeft: "10px",
    paddingRight: "10px",
    borderRadius: "3px",
    backgroundColor: "#D5D5D5",
    fontWeight: 600,
  },
  container: {
    width: "330px",
    height: "230px",
  },
}));
