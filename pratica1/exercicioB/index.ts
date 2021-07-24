import {PNG} from "pngjs";
import {carregar, salvar, gerarMatriz, percorrerMatriz, inserirMatriz, Pixel} from "../../utils/manipularImagem";

/**
 * Troca os valores de intesidade das colunas pares da imagem com as colunas impares
 */
const trocarColunas = (imagem: PNG): PNG => {
  const matriz = gerarMatriz(imagem)
  let pixelPar: Pixel = 0
  percorrerMatriz(matriz, (valor, linha, coluna) => {
    if (coluna % 2 === 0 && (coluna + 1) < matriz[linha].length) {
      pixelPar = valor
      matriz[linha][coluna] = matriz[linha][coluna + 1]
    }
    else matriz[linha][coluna] = pixelPar
  })
  inserirMatriz(matriz, imagem)
  return imagem;
};

const exercicioB = async (caminho: string) => {
  // carregar png
  // inverter os valores
  // salvar png

  // carrega a img png
  let imagem = await carregar(caminho);

  imagem = trocarColunas(imagem)

  // salvar a imagem
  await salvar(imagem);
};

export default exercicioB;
