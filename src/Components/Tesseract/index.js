import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';

function App({ imgDefault, imgData, disableButton }) {
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setLoading(true);
    upload(imgData);
  }, []);

  React.useEffect(() => {
    if (message) {
      console.log(message.search('CNPJ encontrado:'));
      // const findNumberIndex = message.search('/000');
      let findNumberIndex = 0;
      const typeCnpj = message.search('CNPJ');
      const typeCnpj1 = message.search('C N P J');
      const typeCnpj2 = message.search('C.N.P.J.');
      const cnpjsType = [typeCnpj, typeCnpj1, typeCnpj2];
      cnpjsType.forEach((cnpjType) => {
        if (cnpjType > 0) {
          findNumberIndex = cnpjType;
        }
      });
      console.log(findNumberIndex);
      if (findNumberIndex > 0) {
        let findedCnpj = message.substring(
          findNumberIndex - 10,
          findNumberIndex + 30
        );
        findNumberIndex = findedCnpj.search('/0');
        findedCnpj = findedCnpj.substring(
          findNumberIndex - 15,
          findNumberIndex + 10
        );

        findedCnpj = findedCnpj.replace(/[^0-9]/g, '');

        findedCnpj = findedCnpj.replace(
          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          '$1.$2.$3/$4-$5'
        );
        if (findedCnpj.length === 18) {
          setMessage(`Empresa identificada CNPJ: ${findedCnpj}`);
          disableButton(false);
        } else {
          setMessage('CNPJ não encontrado1');
          setLoading(false);
          disableButton();
        }
      } else if (message.search('CNPJ encontrado:') === -1) {
        setMessage('Atenção: Não foi possível identificar a Empresa, o processamento pode apresentar problemas!');
        disableButton(false);
      }
    }
  }, [message]);

  const upload = async (file) => {
    try {
      let url = 'http://18.231.114.40:5000/upload';
      let formData = new FormData();
      formData.append('file', file);
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const res = await axios.post(url, formData, config);
      setTimeout(() => {}, 1000);
      setMessage(res.data?.text);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage('Não foi possível validar o seu cupom');
    }
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
      {loading ? (
        <div>
          <div>Identificando Empresa...</div>
          <div>
            <LinearProgress />
          </div>
        </div>
      ) : (
        <span>{message}</span>
      )}
    </>
  );
}

export default App;
