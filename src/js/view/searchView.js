export const renderSearch = (data) => {
    document.querySelector('.pagination').style.display = "none";
    document.querySelector(".result").innerHTML = "";
    const types = data.types.map(e => {
        return `<span class='pokemon-type-${e.type.name}'>${e.type.name}</span>`;
    })
    const markup = `<div id='pokemon'></div>
                <div class='col-sm-12'><div class='close-profile'>X</div></div>
                    <div class="col-sm-4 img-result">
                        <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}">
                    </div>
                    <div class="col-sm-8 content-result">
                        <h2><strong>${data.name.toUpperCase()} #${data.id}</strong></h2>
                        <div class="description">
                            <div>
                                Type: ${types.join(' ')}
                            </div>
                            <div>
                                Height: ${data.height}ft.
                            </div>
                            <div>
                                Weight: ${data.weight}lbs.
                            </div>
                            <hr>
                            <div class='row'>
                                <div class='col-sm-6'>
                                    <div>${data.stats[0].stat.name.toUpperCase()}: ${data.stats[0].base_stat}</div>
                                    <div>${data.stats[1].stat.name.toUpperCase()}: ${data.stats[1].base_stat}</div>
                                    <div>${data.stats[2].stat.name.toUpperCase()}: ${data.stats[3].base_stat}</div>
                                </div>
                                <div class='col-sm-6'>
                                    <div>${data.stats[3].stat.name.toUpperCase()}: ${data.stats[3].base_stat}</div>
                                    <div>${data.stats[4].stat.name.toUpperCase()}: ${data.stats[4].base_stat}</div>
                                    <div>${data.stats[5].stat.name.toUpperCase()}: ${data.stats[5].base_stat}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-sm-12 pokemon-evolution-headline'><strong><h2>Evolution Chain</h2></strong></div>`;

    document.querySelector(".result").insertAdjacentHTML('beforeend', markup);
    
}

export const renderEvolutions = (styleClass, pokemon) => {
    const types = pokemon.types.map(e => {
        return `<span class='pokemon-type-${e.type.name}'>${e.type.name}</span>`;
    })

    const markup = `<div class='col-sm-${styleClass}'>
    <div id='${pokemon.id}'  class='pokemon-evolution'>
        <div class='evolution-name'>${pokemon.name.toUpperCase()}</div>
        <div class="imageEvolution"><img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}"></div>
        <div class='type'>${types.join(' ')}</div>
        </div>
    </div>`;
    document.querySelector(".result").insertAdjacentHTML('beforeend', markup);
}

export const renderTiles = (data) => {
        const types = data.types.map(e => {
            return `<span class='pokemon-type-${e.type.name}'>${e.type.name}</span>`;
        })
        const markup = `<div class="col-sm-4 col-md-6 col-lg-4">
                            <div id="${data.id}" class="pokemon-card">
                                <div class="name">${data.name.toUpperCase()}</div>
                                <div class="image"><img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}"></div>
                                <div class='type'>
                                    ${types.join(' ')}
                                </div>
                            </div>
                        </div>`;

        document.querySelector(".result").insertAdjacentHTML('beforeend' , markup);

}

export const renderLoader = () => {
    document.querySelector(".loader").style.display = 'block';
}

export const clearLoader = () => {
    const element = document.querySelector('.loader');
    if (element) {
        document.querySelector(".loader").style.display = 'none'; 
     }
}

export const renderPagination = (num) =>{
    document.querySelector('.pagination').style.display = "block";
    document.querySelector('.pagination').innerHTML = "";
    const limit = Math.floor(num/27) + 1;
    for (let index = 0; index < limit; index++) {
        const markup = `<a href="#page${index + 1}">${index + 1}</a>`;
        document.querySelector('.pagination').insertAdjacentHTML('beforeend', markup);
    }

    return limit;
}

