document.getElementById('buscarBtn').addEventListener('click', async () => {
    const nome = document.getElementById('pokemonInput').value.trim().toLowerCase();
    const card = document.getElementById('resultado');
  
    if (!nome) {
      alert('Digite o nome de um Pokémon!');
      return;
    }
  
    try {
      const resposta = await fetch(`/api/pokemon/${nome}`);
      if (!resposta.ok) throw new Error('Pokémon não encontrado!');
      
      const poke = await resposta.json();
  
      // Conversões de altura e peso
      const alturaMetros = (poke.height * 0.1).toFixed(2);
      const pesoKilos = (poke.weight * 0.1).toFixed(1);
  
      // Tradução dos tipos e inicial maiúscula
      const tiposTraduzidos = poke.types
        .map(t => capitalize(traduzirTipo(t.type.name)))
        .join(', ');
  
      // Atualiza elementos
      document.getElementById('pokeImg').src = poke.sprites.other['official-artwork'].front_default || poke.sprites.front_default;
      document.getElementById('pokeNome').textContent = poke.name.toUpperCase();
      document.getElementById('pokeId').textContent = poke.id;
      document.getElementById('pokeTipo').textContent = tiposTraduzidos;
      document.getElementById('pokeAltura').textContent = `${alturaMetros} m`;
      document.getElementById('pokePeso').textContent = `${pesoKilos} kg`;
  
      card.classList.remove('oculto');
    } catch (erro) {
      alert('Erro: ' + erro.message);
      card.classList.add('oculto');
    }
  });
  
  function traduzirTipo(tipo) {
    const tipos = {
      normal: "normal",
      fire: "fogo",
      water: "água",
      electric: "elétrico",
      grass: "grama",
      ice: "gelo",
      fighting: "lutador",
      poison: "veneno",
      ground: "terrestre",
      flying: "voador",
      psychic: "psíquico",
      bug: "inseto",
      rock: "pedra",
      ghost: "fantasma",
      dragon: "dragão",
      dark: "noturno",
      steel: "aço",
      fairy: "fada"
    };
    return tipos[tipo] || tipo;
  }
  
  function capitalize(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  document.getElementById('pokemonInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      document.getElementById('buscarBtn').click();
    }
  });
  

  