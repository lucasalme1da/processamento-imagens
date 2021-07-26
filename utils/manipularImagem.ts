import fs from "fs";
import { PNG } from "pngjs";

// IMAGENS COLORIDAS
// export interface Pixel {
//   vermelho: number
//   verde: number
//   azul: number
//   opacidade: number
// }

//export const gerarMatriz = (imagem: PNG): Pixel[][] => {
//  const pixels: Pixel[][] = []
//  const tamanhoImagemBytes = imagem.width * imagem.height * 4
//  let contadorFimDeLinha = 0
//  let pixelsDaLinha: Pixel[] = []
//  //Cada pixel tem 4 bytes
//  for (let offset = 0; offset < tamanhoImagemBytes; offset += 4) {
//    const vermelho = imagem.data.readUInt8(offset)
//    const verde = imagem.data.readUInt8(offset + 1)
//    const azul = imagem.data.readUInt8(offset + 2)
//    const opacidade = imagem.data.readUInt8(offset + 3)
//    pixelsDaLinha.push({vermelho, verde, azul, opacidade})
//    contadorFimDeLinha++
//    if (contadorFimDeLinha >= imagem.width) {
//      contadorFimDeLinha = 0
//      pixels.push([...pixelsDaLinha])
//      pixelsDaLinha = []
//    }
//  }
//  return pixels
//}

export type Pixel = number;
export type Histograma = number[];

/**
 * Insere uma matriz de pixels em níveis de cinza em um objeto PNG
 */
export const inserirMatriz = (matriz: Pixel[][], imagem: PNG) => {
  let offset = 0;
  for (let linha = 0; linha < matriz.length; linha++)
    for (let coluna = 0; coluna < matriz[linha].length; coluna++) {
      const pixel = matriz[linha][coluna];
      //R = G = B para níveis de cinza
      imagem.data[offset] = pixel;
      imagem.data[offset + 1] = pixel;
      imagem.data[offset + 2] = pixel;
      imagem.data[offset + 3] = 255;
      offset += 4;
    }
};
/**
 * Retorna uma matriz de pixels no formato matriz[linha][coluna]
 * Cada pixel é um nível de intensidade em 8bits
 * Somente para imagens em níveis de cinza
 */
export const gerarMatriz = (imagem: PNG): Pixel[][] => {
  const pixels: Pixel[][] = [];
  const tamanhoImagemBytes = imagem.width * imagem.height * 4;
  let contadorFimDeLinha = 0;
  let pixelsDaLinha: Pixel[] = [];
  //Cada pixel tem 4 bytes
  for (let offset = 0; offset < tamanhoImagemBytes; offset += 4) {
    const pixel = imagem.data.readUInt8(offset);
    pixelsDaLinha.push(pixel);
    contadorFimDeLinha++;
    if (contadorFimDeLinha >= imagem.width) {
      contadorFimDeLinha = 0;
      pixels.push([...pixelsDaLinha]);
      pixelsDaLinha = [];
    }
  }
  return pixels;
};

/*
 * Percorre a matriz passando o valor, linha e coluna para uma função de callback
 */
export const percorrerMatriz = (
  matriz: Pixel[][],
  fn: (valor: number, linha: number, coluna: number) => void
) => {
  for (let linha = 0; linha < matriz.length; linha++)
    for (let coluna = 0; coluna < matriz[linha].length; coluna++)
      fn(matriz[linha][coluna], linha, coluna);
};

export const gerarHistograma = (matriz: Pixel[][]): Histograma => {
  const histograma: Histograma = Array(256).fill(0);
  percorrerMatriz(matriz, (valor) => (histograma[valor] += 1));
  return histograma;
};

/**
 * Gera uma máscara passa baixa
 *
 * @param tamanhoDaMascara O tamanho n x n da mascara a ser criada
 *
 * @returns Uma matriz n x n composta por coeficientes '1'
 *
 * @example
 * const mascara3x3 = gerarMascaraPassaBaixa(3)
 *
 * // mascara:
 * // |1  1  1|
 * // |1  1  1|
 * // |1  1  1|
 *
 * const mascara5x5 = gerarMascaraPassaBaixa(5)
 *
 * // mascara:
 * // |1  1  1  1  1|
 * // |1  1  1  1  1|
 * // |1  1  1  1  1|
 * // |1  1  1  1  1|
 * // |1  1  1  1  1|
 *
 * ```
 *
 */
export const gerarMascaraPassaBaixa = (
  tamanhoDaMascara: number
): number[][] => {
  let linhaDaMascara = Array.from({ length: tamanhoDaMascara }, () => 1);
  return Array.from({ length: tamanhoDaMascara }, () => linhaDaMascara);
};

export const gerarTrianguloDePascal = (n: number): number[][] => {
  let i = 0;
  let triangulo: number[][] = [[1]];

  // Percorre um for em formato de triangulo (cada iteração aumenta o limite de i com base no número passado por parâmetro)
  for (i = 1; i < n; i++) {
    triangulo.push(Array.from({ length: 2 }, () => 1));
    if (i >= 2)
      triangulo[i].splice(
        1,
        0,
        ...Array.from(
          { length: i - 1 },
          (_, k) => triangulo[i - 1][k + 1] + triangulo[i - 1][k]
        )
      );
  }
  return triangulo;
};

export const gerarMascaraGaussiana = (tamanhoDaMascara: number): number[][] => {
  let nTriangulo =
    gerarTrianguloDePascal(tamanhoDaMascara)[tamanhoDaMascara - 1];

  let kTriangulo = nTriangulo.map((v) => [v]);

  let mascara: number[][] = kTriangulo.map((linha) =>
    nTriangulo.map((v) => v * linha[0])
  );

  return mascara;
};

/**
 * Convoluciona duas matrizes e devolve o resultado dividido pelo fator de normalização
 *
 * @param entrada A matriz de entrada
 * @param mascara A matriz de máscara
 *
 * @returns Um número correspondente à convolução da entrada com a saida, dividido pelo fator de normalização,
 * representado pela média entre os coeficientes da máscara.
 *
 */
export const convolucionar = (
  entrada: number[][],
  mascara: number[][]
): number => {
  const fatorDeNormalizacao = mascara.reduce(
    (a, b) => a + b.reduce((a, b) => a + b),
    0
  );
  let total = 0;
  entrada.forEach((linha, idxLinha) =>
    linha.forEach((pixel, idxPixel) => {
      total += (pixel * mascara[idxLinha][idxPixel]) | 0;
    })
  );

  return total / fatorDeNormalizacao;
};

/**
 * Insere uma 'moldura' ao redor de uma matriz
 *
 * @param matriz A matriz a ser emoldurada
 * @param espessura A espessura da moldura
 * @param pixelDeSubstituição [opcional] O pixel que sera usado na moldura
 *
 * @returns Uma matriz emoldurada
 *
 * @example
 *
 * ```
 *
 * const matriz3x3emoldurada = emoldurar(matriz3x3, 1)
 *
 * //  matriz3x3emoldurada:
 * //
 * //  |1  1  1|      |0  0  0  0  0|
 * //  |1  1  1|      |0  1  1  1  0|
 * //  |1  1  1|  =>  |0  1  1  1  0|
 * //                 |0  1  1  1  0|
 * //                 |0  0  0  0  0|
 *
 *
 * const matriz2x2emoldurada = emoldurar(matriz3x3, 1, 5)
 *
 * //  matriz2x2emoldurada:
 * //
 * //  |2  2|      |5  5  5  5|
 * //  |2  2|      |5  2  2  5|
 * //          =>  |5  2  2  5|
 * //              |5  5  5  5|
 *
 *
 * ```
 *
 */
export const emoldurar = (
  matriz: number[][],
  espessura: number,
  pixelDeSubstituição?: number
): number[][] => {
  const linhasDaMoldura = Array.from(
    { length: matriz[0].length },
    () => pixelDeSubstituição || 0
  );
  const colunasDaMoldura = Array.from(
    { length: espessura + 1 },
    () => pixelDeSubstituição || 0
  );

  // Adiciona linhas no inicio e no fim da matriz baseado na espessura da moldura
  Array.from({ length: espessura + 1 }, () => {
    matriz = [linhasDaMoldura, ...matriz, linhasDaMoldura];
  });

  // Adiciona colunas no inicio e no fim da matriz baseado na espessura da moldura
  matriz = matriz.map((linha) => [
    ...colunasDaMoldura,
    ...linha,
    ...colunasDaMoldura,
  ]);

  return matriz;
};

/**
 * Remove uma 'moldura' ao redor de uma matriz
 *
 * @param matriz A matriz a ser desenmoldurada
 * @param espessura A espessura da moldura a ser removida
 *
 * @returns Uma matriz desenmoldurada
 *
 * @example
 *
 * ```
 *
 * const matriz2x2desenmoldurada = desenmoldurar(matriz3x3, 1)
 *
 * //  matriz2x2emoldurada:
 * //
 * //  |5  5  5  5|     |2  2|
 * //  |5  2  2  5|     |2  2|
 * //  |5  2  2  5|  =>
 * //  |5  5  5  5|
 *
 * ```
 *
 */
export const desenmoldurar = (
  matriz: number[][],
  espessura: number
): number[][] => {
  // Removendo linhas no inicio e no fim da matriz baseado na espessura da moldura
  matriz = matriz.slice(espessura, matriz.length - espessura);

  // Removendo colunas no inicio e no fim da matriz baseado na espessura da moldura
  matriz = matriz.map((linha) =>
    linha.slice(espessura + 1, linha.length - espessura - 1)
  );

  return matriz;
};

export const carregar = (caminhoImg: string): Promise<PNG> =>
  new Promise((resolve) => {
    const arquivo = fs.createReadStream(caminhoImg);
    arquivo.on("error", (erro) => {
      console.log("Erro ao carregar imagem");
      console.error(erro);
      process.exit(1);
    });
    const png = arquivo.pipe(new PNG({ colorType: 0 }));
    png.on("parsed", function () {
      console.log("Imagem carregada com sucesso");
      resolve(this);
    });
  });

export const salvar = (png: PNG): Promise<void> =>
  new Promise((resolve) => {
    try {
      png.pack().pipe(fs.createWriteStream("resultado.png"));
      console.log("Imagem salva com sucesso!");
      resolve();
    } catch (erro) {
      console.log("Erro ao salvar imagem");
      console.error(erro);
      process.exit(1);
    }
  });
