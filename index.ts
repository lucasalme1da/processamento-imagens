import * as pratica1 from "./pratica1";
import * as pratica2 from "./pratica2";

interface Argumentos {
  flag: number;
  valor?: string;
}

interface escolha {
  pratica: pratica.PRATICA_1 | pratica.PRATICA_2;
}

enum pratica {
  PRATICA_1 = "PRATICA_1",
  PRATICA_2 = "PRATICA_2",
}

enum operacoes {
  exercicioA = "A",
  exercicioB = "B",
  exercicioC = "C",
  exercicioD = "D",
}

const operacao: Argumentos = {
  flag: process.argv.findIndex((arg) => arg === "-t"),
};

if (operacao.flag === -1) {
  console.error('Argumento operação "-t" não especificado!');
  process.exit(1);
}

operacao.valor = process.argv[operacao.flag + 1];

const caminho: Argumentos = {
  flag: process.argv.findIndex((arg) => arg === "-i"),
};

if (caminho.flag === -1) {
  console.error('Argumento caminho da imagem "-i" não especificado!');
  process.exit(1);
}

caminho.valor = process.argv[caminho.flag + 1];

const tamanhoDaMascara: Argumentos = {
  flag: process.argv.findIndex((arg) => arg === "-m"),
};

if (tamanhoDaMascara.flag === -1) {
  console.error('Argumento tamanho da máscara "-m" não especificado!');
  process.exit(1);
}

tamanhoDaMascara.valor = process.argv[tamanhoDaMascara.flag + 1];

const praticaEscolhida: escolha = { pratica: pratica.PRATICA_2 };

switch (praticaEscolhida.pratica) {
  case pratica.PRATICA_1:
    switch (operacao.valor) {
      case operacoes.exercicioA:
        pratica1.exercicioA(caminho.valor);
        break;
      case operacoes.exercicioB:
        pratica1.exercicioB(caminho.valor);
        break;
      case operacoes.exercicioC:
        pratica1.exercicioC(caminho.valor);
        break;
      case operacoes.exercicioD:
        pratica1.exercicioD(caminho.valor);
        break;
    }
    break;
  case pratica.PRATICA_2:
    switch (operacao.valor) {
      case operacoes.exercicioA:
        pratica2.exercicioA(caminho.valor, parseInt(tamanhoDaMascara.valor));
        break;
      case operacoes.exercicioB:
        pratica2.exercicioB(caminho.valor, parseInt(tamanhoDaMascara.valor));
        break;
      case operacoes.exercicioC:
        pratica2.exercicioC(caminho.valor, parseInt(tamanhoDaMascara.valor));
        break;
      case operacoes.exercicioD:
        pratica2.exercicioD(caminho.valor, parseInt(tamanhoDaMascara.valor));
        break;
    }
    break;
  default:
    process.exit(1);
}
