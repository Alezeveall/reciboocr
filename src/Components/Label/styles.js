import { alpha, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    alignItems: "center",
    borderRadius: 2,
    display: "inline-flex",
    flexGrow: 0,
    whiteSpace: "nowrap",
    cursor: "default",
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightMedium,
    height: 20,
    justifyContent: "center",
    letterSpacing: 0.5,
    minWidth: 20,
    padding: theme.spacing(0.5, 1),
    textTransform: "uppercase",
  },
  primary: {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
  secondary: {
    color: theme.palette.secondary.main,
    backgroundColor: alpha(theme.palette.secondary.main, 0.08),
  },
  error: {
    color: theme.palette.error.main,
    backgroundColor: alpha(theme.palette.error.main, 0.08),
  },
  success: {
    color: theme.palette.success.main,
    backgroundColor: alpha(theme.palette.success.main, 0.08),
  },
  warning: {
    color: theme.palette.warning.main,
    backgroundColor: alpha(theme.palette.warning.main, 0.08),
  },
  info: {
    color: theme.palette.info.main,
    backgroundColor: alpha(theme.palette.info.main, 0.08),
  },
  draft: {
    color: theme.palette.grey[600],
    backgroundColor: alpha(theme.palette.grey[600], 0.08),
  },
  approved: {
    color: "#00d631",
    fontSize: "12px",
    backgroundColor: alpha(theme.palette.grey[900], 0.8),
    padding: "2px",
    paddingLeft: "8px",
    paddingRight: "8px",
    borderRadius: "8px",
  },

  waitApproved: {
    color: "#fff600",
    fontSize: "12px",
    backgroundColor: alpha(theme.palette.grey[900], 0.8),
    padding: "2px",
    paddingLeft: "8px",
    paddingRight: "8px",
    borderRadius: "8px",
  },

  disapproved: {
    color: "#ff0000",
    fontSize: "12px",
    backgroundColor: alpha(theme.palette.grey[900], 0.8),
    padding: "2px",
    paddingLeft: "8px",
    paddingRight: "8px",
    borderRadius: "8px",
  },
}));
