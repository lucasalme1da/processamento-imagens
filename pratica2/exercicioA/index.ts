import {PNG} from "pngjs";
import {
  acumularHistograma,
  carregar, gerarHistograma, gerarMatriz, inserirMatriz, normalizarHistograma, percorrerMatriz, salvar
} from "../../utils/manipularImagem";

const equalizacaoHistograma = (imagem: PNG) => {
  const matriz = gerarMatriz(imagem)
  const histogramaAcumulado = acumularHistograma(normalizarHistograma(gerarHistograma(matriz)))
  percorrerMatriz(matriz, (valor, linha, coluna) => matriz[linha][coluna] = histogramaAcumulado[valor])
  inserirMatriz(matriz, imagem)
}

const exercicioA = async (caminho: string) => {
  const imagem = await carregar(caminho);
  equalizacaoHistograma(imagem)
  await salvar(imagem);
};

export default exercicioA;
