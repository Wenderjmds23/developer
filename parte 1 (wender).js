const fs = require('fs');
const path = require('path');

// Caminhos
const filePath = './texto.txt';
const destinoDir = './destino';
const destinoFile = path.join(destinoDir, 'texto.txt');

// Criação do arquivo texto.txt
fs.writeFile(filePath, 'Conteúdo inicial do arquivo texto.txt.', (err) => {
  if (err) {
    return console.error('Erro ao criar o arquivo texto.txt:', err);
  }
  console.log('Arquivo texto.txt criado com sucesso!');

  // Criação da pasta destino (caso não exista)
  fs.mkdir(destinoDir, { recursive: true }, (err) => {
    if (err) {
      return console.error('Erro ao criar a pasta destino:', err);
    }
    console.log('Pasta destino criada com sucesso!');

    // Copiar o arquivo texto.txt para a pasta destino
    fs.copyFile(filePath, destinoFile, (err) => {
      if (err) {
        return console.error('Erro ao copiar o arquivo:', err);
      }
      console.log('Arquivo texto.txt copiado com sucesso para a pasta destino!');
    });
  });
});
