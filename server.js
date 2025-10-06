const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/api/pokemon/:nome', async (req, res) => {
  const nome = req.params.nome.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;

  try {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      return res.status(404).json({ erro: 'Pokémon não encontrado!' });
    }
    const dados = await resposta.json();
    res.json(dados);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
