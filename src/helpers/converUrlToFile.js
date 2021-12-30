const urltoFile = (url, filename, mimeType) => {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
};

//Usage example:
// urltoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.txt','text/plain')
// .then(function(file){ console.log(file);});

export default urltoFile;
