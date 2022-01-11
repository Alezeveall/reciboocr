import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { Component } from 'react';
// import './index.css';
import mainImg from '../../assets/images/no-image-found-360x250.png';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import urltoFile from '../../helpers/converUrlToFile';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default class App extends Component {
  state = {
    img: mainImg,
    analyzing: false,
    notify: false,
    date: '',
    amount: '',
    name: '',
    accNo: '',
    open: false,
  };

  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ img: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    this.setState({
      analyzing: true,
      notify: false,
      date: '',
      amount: '',
      name: '',
      accNo: '',
    });

    let formData = new FormData();
    formData.append('file', e.target.files[0], this.state.img);
    let url = 'http://18.231.114.40:3005/api/analyze/';
    axios
      .post(url, formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        this.setState({ analyzing: false });
        console.log(res);
        let rec = res.data.output[0].fields;
        this.setState({
          //** date: rec.date.value + "/" + rec.month.value + "/" + rec.year.value,
          //** amount: rec.Amount.value,
          //** name: rec.Name.value,
          //** accNo: rec.AccountNo.value,
          //** notify: true,
          name: rec.MerchantName.value,
          date: rec.TransactionTime.value,
          amount: rec.Total.value,
          accNo: rec.MerchantAddress.value,
          notify: true,
        });
      });
  };

  findItem = (fields) => {
    let items = undefined;
    for (const fieldName in fields) {
      // each field is of type FormField
      const field = fields[fieldName];
      console.log(
        `Field ${fieldName} has value '${field.value}' with a confidence score of ${field.confidence}`
      );
      console.log('----------------> ITEM <----------------');
      // console.log(typeof field.value);
      if (typeof field.value === 'object') {
        items = field.value;
      }

      // console.log(JSON.stringify(field.value));
      // console.log('Teste');
      // console.log(JSON.stringify(fieldName));
    }
    console.log(items);
    let newItem = [];
    if (typeof items === 'object') {
      if (items.length > 0) {
        for (const item in items) {
          newItem.push({
            item: items[item]?.value?.Name?.value,
            price: items[item]?.value?.Price.value,
          });
        }
        console.log(newItem);
        this.props.listFill(newItem);
      }
    }
  };

  async componentDidMount() {
    //  const teste = (async () => {
    this.setState({ ...this.state, open: true });
    this.props.disableButton(true);

    const dataFile = await urltoFile(
      this.props.imgDefault,
      'hello.txt',
      'multipart/form-data'
    );
    let formData = new FormData();
    formData.append('file', dataFile, this.state.img);
    let url = 'http://18.231.114.40:3005/api/analyze/';

    axios
      .post(url, formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.output[0].fields.MerchantName.value);
        this.setState({ analyzing: false });
        console.log(res);
        let rec = res.data.output[0].fields;
        this.findItem(rec);
        console.log(rec.Total?.valueData?.text);
        this.setState({
          //** date: rec.date.value + "/" + rec.month.value + "/" + rec.year.value,
          //** amount: rec.Amount.value,
          //** name: rec.Name.value,
          //** accNo: rec.AccountNo.value,
          //** notify: true,
          name: rec.MerchantName?.value || 'Não encontrado',
          date: rec?.TransactionDate?.valueData?.text || 'Não encontrado',
          amount: rec.Total?.valueData?.text || '0',
          accNo: rec.MerchantAddress?.value || 'Não encontrado',
          notify: true,
          open: false,
        });
        console.log(this.state);
        this.props.disableButton(false);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ ...this.state, open: false });
      });
  }

  render() {
    const { analyzing, name, accNo, date, amount, notify } = this.state;
    console.log(this.state.name);
    return (
      <>
        <Grid container spacing={3} justifyContent="center">
          <Card>
            <CardContent>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item>
                    <TransactionForm
                      accNo={accNo}
                      amount={`R$: ${amount}`}
                      date={date}
                      name={name}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      spacing={2}
                    >
                      <Grid item>
                        <Scanning analyzing={analyzing} />
                        <img
                          style={{ height: '200px' }}
                          alt="Form"
                          src={this.props.imgDefault}
                        />
                        <Alerts notify={notify} />
                      </Grid>
                      {this.state.open && (
                        <Grid item>
                          <CircularProgress sx={{ color: '#1976D2' }} />
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </>
    );
  }
}

function Scanning(props) {
  if (props.analyzing === true) {
    return <div id="scanner"></div>;
  }
  return <div id="empty"></div>;
}

function TransactionForm(props) {
  const classes = useStyles();

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container direction="row" spacing={3}>
          <Grid item>
            <label>Recibo</label>
          </Grid>
          <Grid item>
            <TextField
              id="name"
              label="Empresa"
              size="small"
              value={props.name}
              variant="outlined"
              color="secondary"
            />
          </Grid>
          <Grid item>
            <TextField
              id="accountNo"
              label="Endereço"
              value={props.accNo}
              size="small"
              variant="outlined"
              color="secondary"
            />
          </Grid>
          <Grid item>
            <TextField
              id="date"
              label="Data da Despesa"
              value={props.date}
              size="small"
              variant="outlined"
              color="secondary"
            />
          </Grid>
          <Grid item>
            <TextField
              id="amount"
              label="Valor da Despesa"
              value={props.amount}
              size="small"
              variant="outlined"
              color="secondary"
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
}

function Alerts(props) {
  if (props.notify === true) {
    return (
      <Alert id="alertt" variant="filled" severity="success">
        Análise de Recibo realizada com sucesso !
      </Alert>
    );
  }
  return <div id="empty"></div>;
}
