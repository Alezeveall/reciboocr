import React from "react";
import clsx from "clsx";
import { useStyles } from "./styles";

// Type of colors
// 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'draft' | 'info'

const Label = ({ children, color = "secondary" }) => {
  const classes = useStyles();
  return <span className={clsx([classes[color]])}>{children}</span>;
};

export default Label;
