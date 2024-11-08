const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Criando a interface para capturar dados do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para perguntar ao usuário e validar a entrada
function pergunta(prompt) {
  return new Promise((resolve, reject) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

// Função para salvar os dados do candidato
async function salvarDados() {
  try {
    const nome = await pergunta('Digite seu nome: ');
    const idade = parseInt(await pergunta('Digite sua idade: '));
    const telefone = await pergunta('Digite seu telefone: ');
    const endereco = await pergunta('Digite seu endereço: ');
    const profissao = await pergunta('Digite sua profissão: ');

    // Validação dos dados
    if (!nome || !idade || !telefone || !endereco || !profissao) {
      console.log('Por favor, preencha todos os campos.');
      return;
    }

    if (isNaN(idade) || idade <= 0) {
      console.log('Idade inválida. A idade deve ser um número positivo.');
      return;
    }

    // Caminho da pasta de currículos
    const curriculosDir = './Currículos';

    // Verificando se a pasta Currículos existe
    if (!fs.existsSync(curriculosDir)) {
      fs.mkdirSync(curriculosDir, { recursive: true });
      console.log('Pasta "Currículos" criada!');
    }

    // Caminho da pasta da profissão
    const profissaoDir = path.join(curriculosDir, profissao);

    // Verificando se a pasta da profissão existe
    if (!fs.existsSync(profissaoDir)) {
      fs.mkdirSync(profissaoDir, { recursive: true });
      console.log(`Pasta para a profissão "${profissao}" criada!`);
    }

    // Caminho do arquivo do candidato
    const candidatoFile = path.join(profissaoDir, `${nome}.txt`);

    // Preparando os dados do candidato
    const dados = `
Nome: ${nome}
Idade: ${idade}
Telefone: ${telefone}
Endereço: ${endereco}
Profissão: ${profissao}
`;

    // Escrevendo os dados no arquivo
    fs.writeFileSync(candidatoFile, dados, 'utf8');
    console.log(`Currículo de ${nome} salvo com sucesso na profissão ${profissao}!`);
  } catch (err) {
    console.error('Erro ao processar os dados do candidato:', err);
  } finally {
    rl.close();
  }
}

// Testar com pelo menos 5 submissões
async function executar() {
  for (let i = 0; i < 5; i++) {
    console.log(`\nSubmissão #${i + 1}`);
    await salvarDados();
  }
}

executar();
