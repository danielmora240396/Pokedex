export const renderSearch = (data) => {
    document.querySelector(".result").innerHTML = "";

    const markup = `<div class="col-sm-6 img-result">
                        <img src="${data.sprites.other.dream_world.front_default}" alt="${data.name}">
                    </div>
                    <div class="col-sm-6 content-result">
                        <h2>${data.name.toUpperCase()} #${data.id}</h2>
                        <div class="description">
                            <div>
                                Type: ${ data.types.map(e => {
                                    return e.type.name;
                                })}
                            </div>
                            <div>
                                Height: ${data.height}ft.
                            </div>
                            <div>
                                Weight: ${data.weight}lbs.
                            </div>
                        </div>
                    </div>`;
    console.log(data);
    document.querySelector(".result").insertAdjacentHTML('beforeend', markup);
    
}

export const renderTiles = (data) => {
        const markup = `<div class="col-sm-4">
                            <div id="${data.id}" class="pokemon-card">
                                <div class="name">${data.name.toUpperCase()}</div>
                                <div class="image"><img src="${data.sprites.other.dream_world.front_default}" alt="${data.name}"></div>
                            </div>
                        </div>`;

        document.querySelector(".result").insertAdjacentHTML('beforeend' , markup);

}

export const renderLoader = () => {
    const markup =`<div class="loader">
                        <img src="loader.png" alt="">
                    </div>`;
    document.querySelector(".result").insertAdjacentHTML('beforeend' , markup);
}

export const clearLoader = () => {
    const element = document.querySelector('.loader');
    if (element) {
        element.parentNode.removeChild(element); 
     }
}