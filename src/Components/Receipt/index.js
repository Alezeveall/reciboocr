import { Button, Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { Component } from 'react';
import './index.css';
import mainImg from '../../assets/images/no-image-found-360x250.png';
import axios from 'axios';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
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
          newItem.push(items[item]?.value?.Name?.value);
        }
        console.log(newItem);
        this.props.listFill(newItem);
      }
    }
  };

  async componentDidMount() {
    //  const teste = (async () => {
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
        this.setState({ analyzing: false });
        console.log(res);
        let rec = res.data.output[0].fields;
        this.findItem(rec);
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
        this.props.disableButton(false);
      });
  }

  render() {
    const { img, analyzing, name, accNo, date, amount, notify } = this.state;
    return (
      <div className="page">
        <Card className="card">
          <CardHeader
            title="Recibo para Reembolso"
            subheader="Detalhando informações"
          ></CardHeader>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                {/* <Button
                  variant="contained"
                  color="default"
                  startIcon={<CloudUploadIcon />}
                  component="label"
                >
                  Upload File
                  <input
                    type="file"
                    name="image-upload"
                    id="input"
                    onChange={this.imageHandler}
                    hidden
                  />
                </Button>
                <br /> */}
                <TransactionForm
                  accNo={accNo}
                  amount={amount}
                  date={date}
                  name={name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Scanning analyzing={analyzing} />
                <img
                  className="imgMain"
                  alt="Form"
                  src={this.props.imgDefault}
                />
                <Alerts notify={notify} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
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
    <form className={classes.root} noValidate autoComplete="off">
      <label>Recibo</label>
      <br></br>
      <TextField
        id="name"
        label="Empresa"
        size="small"
        value={props.name}
        variant="outlined"
        color="secondary"
      />
      <TextField
        id="accountNo"
        label="Endereço"
        value={props.accNo}
        size="small"
        variant="outlined"
        color="secondary"
      />
      <TextField
        id="date"
        label="Data da Despesa"
        value={props.date}
        size="small"
        variant="outlined"
        color="secondary"
      />
      <TextField
        id="amount"
        label="Valor da Despesa"
        value={props.amount}
        size="small"
        variant="outlined"
        color="secondary"
      />
    </form>
  );
}

function Alerts(props) {
  const classes = useStyles();

  if (props.notify === true) {
    return (
      <Alert id="alertt" variant="filled" severity="success">
        Análise de Recibo realizada com sucesso !
      </Alert>
    );
  }
  return <div id="empty"></div>;
}
