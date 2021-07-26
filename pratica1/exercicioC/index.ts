import { PNG } from "pngjs";
import {
  carregar,
  salvar,
  gerarMatriz,
  inserirMatriz,
} from "../../utils/manipularImagem";

/**
 * Inverte os valores das linhas pares com as linhas ímpares de uma imagem em escala de cinza.
 *
 * @param imagem Uma imagem em escala de cinza do tipo PNG
 *
 * @returns Uma imagem com as linhas pares e ímpares invertidas do tipo PNG
 *
 */
const inverterLinhas = (imagem: PNG): PNG => {
  // Carregando a imagem em formato de matriz
  let matriz = gerarMatriz(imagem);

  // Para inverter os valores das linhas pares com as impares, basta percorrer todas as linhas e, quando forem pares, trocar com as impares
  matriz = matriz.map((linha, index) => {
    if (index % 2 === 0) {
      const proximaLinha = matriz[index + 1];
      matriz[index + 1] = linha;
      return proximaLinha;
    }
    return linha;
  });

  // Percorrendo cada item da matriz (cada pixel) e inserindo-o no canal correspondente
  inserirMatriz(matriz, imagem);

  // Retornando imagem invertida
  return imagem;
};

const exercicioC = async (caminho: string) => {
  // carrega a img png
  let imagem = await carregar(caminho);

  // inverte os valores das linhas pares com impares
  imagem = inverterLinhas(imagem);

  // salvar a imagem
  await salvar(imagem);
};

export default exercicioC;
