import { PNG } from "pngjs";
import {
  carregar,
  gerarMatriz,
  inserirMatriz,
  salvar,
  gerarMascaraPassaBaixa,
  convolucionar,
  emoldurar,
  desenmoldurar,
} from "../../utils/manipularImagem";

/**
 * Aplica um filtro de média na imagem passada como argumento.
 *
 * @param imagem Uma imagem em escala de cinza do tipo PNG
 *
 * @returns Uma imagem filtrada pela média, do tipo PNG
 *
 */
const aplicarFiltragemMedia = (imagem: PNG, tamanhoDaMascara: number): PNG => {
  // Carregando a imagem em formato de matriz e uma copia disso para usar nas manipulações do resultado final
  let matriz = gerarMatriz(imagem);
  let matrizResultante = gerarMatriz(imagem);

  // Calculando quantos pixels devem se distanciar da borda da imagem
  const threshold = (tamanhoDaMascara - 1) / 2 - 1; // Subtrai 1 no final por causa do indice do array começar em 0

  // Criando mascara passa-baixa (coeficientes igual a 1)
  const mascara = gerarMascaraPassaBaixa(tamanhoDaMascara);

  // Criando "moldura" ao redor da imagem para evitar que os pixels na borda deixem de ser alterados
  // A espessura dessa borda sera o valor do threshold (limiar) da borda da imagem referente à mascara criada
  matriz = emoldurar(matriz, threshold);
  matrizResultante = emoldurar(matrizResultante, threshold);

  matriz.map((linha, idxLinha) => {
    if (idxLinha > threshold && idxLinha < matriz.length - threshold - 1) {
      return linha.map((pixel, idxPixel) => {
        /* Para cada pixel, precisamos colocar o threshold (limiar) em pratica, ignorando os pixels dessa regiao
         * As regras são:
         *
         *  - Não deve ser menor nem maior que o threshold da linha
         *  - Não deve ser menor nem maior que o threshold da coluna
         *
         * se a regra for respeitada, substitui o valor daquele pixel pela convolução da matriz com a máscara
         * caso contrário, mantem o valor dos pixels
         */
        if (idxPixel > threshold && idxPixel < linha.length - threshold - 1) {
          // Selecionar apenas o quadro da matriz referente ao tamanho da mascara escolhida
          const quadroDaMatriz = matriz
            .slice(idxLinha - (threshold + 1), idxLinha + (threshold + 1) + 1)
            .map((linha) =>
              linha.slice(
                idxPixel - (threshold + 1),
                idxPixel + (threshold + 1) + 1
              )
            );

          matrizResultante[idxLinha][idxPixel] = convolucionar(
            quadroDaMatriz,
            mascara
          );
        } else {
          matrizResultante[idxLinha][idxPixel] = pixel;
        }
      });
    } else {
      return linha;
    }
  });

  // Desenmoldurando a matrizResultante para criar a imagem final
  matrizResultante = desenmoldurar(matrizResultante, threshold);

  // Percorrendo cada item da matriz (cada pixel) e inserindo-o no canal correspondente
  inserirMatriz(matrizResultante, imagem);

  // Retornando imagem invertida
  return imagem;
};

const exercicioB = async (caminho: string, tamanhoDaMascara: number) => {
  // carregar a imagem png
  const imagem = await carregar(caminho);

  // manipular a imagem
  aplicarFiltragemMedia(imagem, tamanhoDaMascara);

  // salvar a imagem
  await salvar(imagem);
};

export default exercicioB;
