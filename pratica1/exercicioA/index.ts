import { PNG } from "pngjs";
import {
  carregar,
  salvar,
  gerarMatriz,
  inserirMatriz,
} from "../../utils/manipularImagem";

/**
 * Inverte os valores dos pixels de uma imagem em escala de cinza.
 *
 * @param imagem Uma imagem em escala de cinza do tipo PNG
 *
 * @returns Uma imagem invertida (também chamada de negativa) do tipo PNG
 *
 */
const inverterValores = (imagem: PNG): PNG => {
  // Carregando a imagem em formato de matriz
  let matriz = gerarMatriz(imagem);

  // Para inverter os valores, basta percorrer todas as posições e subtrair o valor maximo (255) do valor original e substituí-lo
  matriz = matriz.map((linha) => linha.map((pixel) => 255 - pixel));

  // Percorrendo cada item da matriz (cada pixel) e inserindo-o no canal correspondente
  inserirMatriz(matriz, imagem);

  // Retornando imagem invertida
  return imagem;
};

const exercicioA = async (caminho: string) => {
  // carrega a img png
  let imagem = await carregar(caminho);

  // inverte os valores dos pixels
  imagem = inverterValores(imagem);

  // salvar a imagem
  await salvar(imagem);
};

export default exercicioA;
