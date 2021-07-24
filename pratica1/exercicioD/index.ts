import {PNG} from "pngjs";
import {carregar, salvar, percorrerMatriz, Histograma, gerarMatriz, inserirMatriz, gerarHistograma} from "../../utils/manipularImagem";

const gmin = 0
const gmax = 255
const acharFmin = (histograma: Histograma): number => {
  for (let intensidade = 0; intensidade < histograma.length; intensidade++)
    if (histograma[intensidade] !== 0) return intensidade
  return 0
}
const acharFmax = (histograma: Histograma): number => {
  for (let intensidade = histograma.length - 1; intensidade >= 0; intensidade--)
    if (histograma[intensidade] !== 0) return intensidade
  return 0
}
/**
 * Realiza um ajuste de contraste estendendo o histograma para todo
 * o intervalo disponível
 */
const ajusteDeContraste = (imagem: PNG) => {
  const matriz = gerarMatriz(imagem)
  const histograma = gerarHistograma(matriz)
  const fmax = acharFmax(histograma)
  const fmin = acharFmin(histograma)
  percorrerMatriz(matriz, (valor, linha, coluna) => {
    matriz[linha][coluna] = Math.round((((gmax - gmin) / (fmax - fmin)) * (valor - fmin))
      + gmin)
  })

  inserirMatriz(matriz, imagem)
};

const exercicioD = async (caminho: string) => {
  const imagem = await carregar(caminho);
  ajusteDeContraste(imagem)
  await salvar(imagem);
};

export default exercicioD;
