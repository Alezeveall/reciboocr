import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AutoGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
      <Grid item xs={6}>
          <Item>Produto</Item>
        </Grid>
        <Grid item xs>
          <Item>Qtde</Item>
        </Grid>        
        <Grid item xs>
          <Item>Valor</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
