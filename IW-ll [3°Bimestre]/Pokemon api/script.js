function callAPI() {
    const numero = Number(document.getElementById("numero").value);
    const imagem = document.getElementById("imagem");
    const nome = document.getElementById("nome");

    if (!Number.isInteger(numero) || numero < 1 || numero > 1025) {
        alert("Digite um número entre 1 e 1025.");
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon não encontrado.");
            }
            return response.json();
        })
        .then(data => {
            nome.textContent = data.name;
            imagem.src = data.sprites.front_default;


            const tipoNome = data.types[0].type.name;
            document.getElementById("tipo").textContent = "Tipo: " + tipoNome;
            document.body.className = tipoNome; 

            const btnShiny = document.getElementById("btnShiny");
            btnShiny.onclick = () => {
                const isShiny = imagem.src === data.sprites.front_shiny;
                imagem.src = isShiny ? data.sprites.front_default : data.sprites.front_shiny;
            };
        })
        .catch(error => {
            console.error(error);
            alert("Não foi possível carregar os dados do Pokémon.");
        });
}
