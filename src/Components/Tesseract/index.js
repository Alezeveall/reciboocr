import React, { useRef, useState, useCallback, createRef } from 'react';
import './index.css';
import Webcam from 'react-webcam';
import axios from 'axios';
import { Header, Grid, Button, Icon, Message, Loader } from 'semantic-ui-react';

function App({ imgDefault, imgData, disableButton }) {
  const [message, setMessage] = useState('carregando...');
  // const webcamRef = useRef(null);
  // const [imgSrc, setImgSrc] = useState(null);
  // const [textOcr, setTextOcr] = useState(null);
  const [load, setLoad] = useState(false);
  let fileInputRef = createRef();

  React.useEffect(() => {
    upload(imgData);
  });

  React.useEffect(() => {
    if (message) {
      const findNumberIndex = message.search('/000');
      if (findNumberIndex > 0) {
        let findedCnpj = message.substring(
          findNumberIndex - 15,
          findNumberIndex + 10
        );
        findedCnpj = findedCnpj.replace(/[^0-9]/g, '');

        findedCnpj = findedCnpj.replace(
          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          '$1.$2.$3/$4-$5'
        );

        if (findedCnpj.length === 18) {
          setMessage(`CNPJ encontrado: ${findedCnpj}`);
          disableButton(false);
        } else {
          setMessage('CNPJ não encontrado');
          disableButton();
        }
      } else {
        setMessage('CNPJ não encontrado');
        disableButton();
      }
    }
  }, [message]);

  const upload = (file) => {
    // setLoad(true);
    var url = 'http://18.231.114.40:5000/upload';
    var formData = new FormData();
    formData.append('file', file);
    var config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    return axios
      .post(url, formData, config)
      .then((res) => {
        console.log(res.data);
        setMessage(res.data?.text);
        // setTextOcr(res.data.text);
        // setImgSrc(res.data.image);
        // setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <img
        id="imgTesseract"
        style={{ marginLeft: 10, height: '50%' }}
        alt="captured"
        src={imgDefault}
        className="img"
      />
      <form encType="multipart/form-data">
        <input
          type="file"
          hidden
          id="imgTesseractFile"
          name="imgTesseractFileName"
          accept="image/*"
        />
      </form>
      <span>{message}</span>
    </>
  );
}

export default App;
