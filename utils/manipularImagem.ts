import fs from "fs";
import {PNG} from "pngjs";

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

export type Pixel = number
export type Histograma = number[]

/**
 * Insere uma matriz de pixels em níveis de cinza em um objeto PNG
*/
export const inserirMatriz = (matriz: Pixel[][], imagem: PNG) => {
  let offset = 0
  for (let linha = 0; linha < matriz.length; linha++)
    for (let coluna = 0; coluna < matriz[linha].length; coluna++) {
      const pixel = matriz[linha][coluna]
      //R = G = B para níveis de cinza
      imagem.data[offset] = pixel
      imagem.data[offset + 1] = pixel
      imagem.data[offset + 2] = pixel
      imagem.data[offset + 3] = 255
      offset += 4
    }
}
/**
 * Retorna uma matriz de pixels no formato matriz[linha][coluna]
 * Cada pixel é um nível de intensidade em 8bits
 * Somente para imagens em níveis de cinza
*/
export const gerarMatriz = (imagem: PNG): Pixel[][] => {
  const pixels: Pixel[][] = []
  const tamanhoImagemBytes = imagem.width * imagem.height * 4
  let contadorFimDeLinha = 0
  let pixelsDaLinha: Pixel[] = []
  //Cada pixel tem 4 bytes
  for (let offset = 0; offset < tamanhoImagemBytes; offset += 4) {
    const pixel = imagem.data.readUInt8(offset)
    pixelsDaLinha.push(pixel)
    contadorFimDeLinha++
    if (contadorFimDeLinha >= imagem.width) {
      contadorFimDeLinha = 0
      pixels.push([...pixelsDaLinha])
      pixelsDaLinha = []
    }
  }
  return pixels
}

/*
 * Percorre a matriz passando o valor, linha e coluna para uma função de callback
 */
export const percorrerMatriz = (
  matriz: Pixel[][], fn: (valor: number, linha: number, coluna: number) => void) => {
  for (let linha = 0; linha < matriz.length; linha++)
    for (let coluna = 0; coluna < matriz[linha].length; coluna++)
      fn(matriz[linha][coluna], linha, coluna)
}


export const gerarHistograma = (matriz: Pixel[][]): Histograma => {
  const histograma: Histograma = Array(256).fill(0)
  percorrerMatriz(matriz, valor => histograma[valor] += 1)
  return histograma
}

export const carregar = (caminhoImg: string): Promise<PNG> =>
  new Promise((resolve) => {
    const arquivo = fs.createReadStream(caminhoImg);
    arquivo.on("error", (erro) => {
      console.log("Erro ao carregar imagem");
      console.error(erro);
      process.exit(1);
    });
    const png = arquivo.pipe(new PNG({colorType: 0}));
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
