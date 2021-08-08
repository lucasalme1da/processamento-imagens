import {PNG} from "pngjs";
import {carregar, gerarMatriz, inserirMatriz, percorrerMatriz, salvar} from "../../utils/manipularImagem";

const tamanhoFiltro = [5, 5]

const aplicarFiltroMediana = (imagem: PNG) => {

  const matriz = gerarMatriz(imagem)
  const filtro: number[][] = Array(tamanhoFiltro[0]).fill(Array(tamanhoFiltro[1]).fill(0))
  const meio = Math.floor(tamanhoFiltro[0] / 2)
  percorrerMatriz(matriz, (valor, linha, coluna) => {
    //Adicionando os valores correspondentes da matriz no filtro
    percorrerMatriz(filtro, (valorFiltro, linhaFiltro, colunaFiltro) => {
      const linhaMatriz = linha - meio + linhaFiltro
      const colunaMatriz = coluna - meio + colunaFiltro
      if (matriz[linhaMatriz] === undefined || matriz[linhaMatriz][colunaMatriz] === undefined)
        filtro[linhaFiltro][colunaFiltro] = 0
      else
        filtro[linhaFiltro][colunaFiltro] = matriz[linhaMatriz][colunaMatriz]
    })
    //Substituindo o pixel pela mediana dos vizinhos
    const valoresFiltroOrdenados = filtro.flat().sort((a, b) => a - b)
    const mediana = valoresFiltroOrdenados[Math.floor(valoresFiltroOrdenados.length / 2)]
    matriz[linha][coluna] = mediana
  })
  inserirMatriz(matriz, imagem)
}
const exercicioC = async (caminho: string) => {
  const imagem = await carregar(caminho);
  aplicarFiltroMediana(imagem)
  await salvar(imagem);
};

export default exercicioC;
