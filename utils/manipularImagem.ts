import fs from "fs";
import { PNG } from "pngjs";

export const carregar = (caminhoImg: string): Promise<PNG> =>
  new Promise((resolve) => {
    const arquivo = fs.createReadStream(caminhoImg);
    arquivo.on("error", (erro) => {
      console.log("Erro ao carregar imagem");
      console.error(erro);
      process.exit(1);
    });
    const png = arquivo.pipe(new PNG());
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
