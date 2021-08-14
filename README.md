### Repositório as práticas relativas ao trabalho final da disciplina de processamentos de imagens, optativa do curso de Engenharia de Computação da UTFPR-CP.

<br/>
<p>Lucas de Almeida - RA: 1996762</p>
<p>Thiago Angelo Martins - RA: 1997513</p>

</br>
<h2>Enunciado</h2>

</br>
<h3>• Prática 1</h3>

<p>Escreva um programa para transformar uma imagem de níveis de cinza na qual cada pixel é
representado por 8 bits (256 níveis de cinza), conforme as seguintes operações:</p>
<p>a) inverter os valores de intensidade da imagem, tal que o valor 255 passa a ser 0, 254 passa a ser 1,
assim por diante;</p>
<p>b) os valores de intensidade da imagem presentes nas colunas pares são trocados com os valores de
intensidade das colunas ímpares;</p>
<p>c) os valores de intensidade da imagem presentes nas linhas pares são trocados com os valores de
intensidade das linhas ímpares;</p>
<p>d) realizar o processo de alargamento de contraste (histogram strechting).</p>

</br>
<h3>• Prática 2</h3>

<p>Escreva um programa para transformar uma imagem de níveis de cinza na qual cada pixel é
representado por 8 bits (256 níveis de cinza), conforme as seguintes operações:</p>
<p>a) Realizar a equalização do histograma;</p>
<p>b) Aplicar filtro da média;</p>
<p>c) Aplicar filtro da mediana;</p>
<p>d) Aplicar filtro gaussiano;</p>

</br>
</br>

<h2>Como testar</h2>

<p>
  Primeiramente, abra o arquivo <code>.env</code> e altere o valor de
  <code>PRATICA</code> para uma das opções abaixo:
</p>

</br>
<p>• Prática 1</p>
<code>PRATICA = PRATICA_1</code>

</br>
</br>
<p>• Prática 2</p>
<code>PRATICA = PRATICA_2</code>

</br>
</br>

<p>
  Em seguida, abra um terminal na raiz do projeto e insira o comando abaixo para instalar as dependencias:
</p>
<code>npm install</code>
</br>
</br>

<p>
  Por fim, basta utilizar o comando <code>npm start --</code> seguido dos parâmetros vistos na tabela abaixo:
</p>
</br>

<table>
  <thead>
    <tr>
      <th>Comando</th>
      <th>Nome</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>-t</td>
      <td>Operação</td>
      <td>Indica qual dos exercícios devem ser aplicados.</td>
    </tr>
    <tr>
      <td>-i</td>
      <td>Caminho da Imagem</td>
      <td>Indica qual o caminho até o arquivo .PNG a ser utilizado.</td>
    </tr>
    <tr>
      <td>-m</td>
      <td><i>(Opcional)</i> Tamanho da máscara</td>
      <td>
        Tamanho da máscara em forma de matriz (m x m) a ser utilizada nas
        filtragens. O valor padrão é 3, resultando numa máscara 3x3.
      </td>
    </tr>
  </tbody>
</table>

<p>
  O resultado da manipulação pode ser visto no arquivo <code>resultado.png</code> gerado na raíz do projeto.
</p>
</br>

<p>
  Exemplo de uso:
</p>
<p>
  Aplicando a <i>filtragem pela média</i> com máscara 5x5 numa imagem PNG chamada teste contida na raiz do projeto:
</p>
<code>
    npm start -- -t B -i .\teste.png -m 5
</code>
</br>

<hr/>
