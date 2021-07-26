import { PNG } from "pngjs";
import { carregar, salvar } from "../../utils/manipularImagem";

/**
 * Generates a new `Query` object ordered by key.
 *
 * Sorts the results of a query by their (ascending) key values.
 *
 * You can read more about `orderByKey()` in
 * {@link
 *  https://firebase.google.com/docs/database/web/lists-of-data#sort_data
 *  Sort data}.
 *
 * @example
 * ```javascript
 * var ref = firebase.database().ref("dinosaurs");
 * ref.orderByKey().on("child_added", function(snapshot) {
 *   console.log(snapshot.key);
 * });
 * ```
 */
const inverterValores = (matriz: PNG): PNG => {
  return matriz;
};

const exercicioA = async (caminho: string, tamanhoDaMascara: number) => {
  // carregar png
  // inverter os valores
  // salvar png

  // Exemplo

  // carrega a img png
  const img = await carregar(caminho);

  // manipula a imagem
  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.width; x++) {
      var idx = (img.width * y + x) << 2;
      // invert color
      img.data[idx] = 255 - img.data[idx];
      img.data[idx + 1] = 255 - img.data[idx + 1];
      img.data[idx + 2] = 255 - img.data[idx + 2];
      // and reduce opacity
      img.data[idx + 3] = img.data[idx + 3] >> 1;
    }
  }

  // salvar a imagem
  await salvar(img);
};

export default exercicioA;
