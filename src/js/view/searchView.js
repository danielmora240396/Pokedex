export const renderSearch = (data) => {
    document.querySelector('.pagination').style.display = "none";
    document.querySelector(".result").innerHTML = "";

    const markup = `<div class='col-sm-12'><div class='close-profile'>X</div></div>
                    <div class="col-sm-6 img-result">
                        <img src="${data.sprites.other.dream_world.front_default}" alt="${data.name}">
                    </div>
                    <div class="col-sm-6 content-result">
                        <h2>${data.name.toUpperCase()} #${data.id}</h2>
                        <div class="description">
                            <div>
                                Type: ${data.types.map(e => {
                                    return `<span class='pokemon-type-${e.type.name}'>${e.type.name}</span>`;
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
    const limit = Math.floor(num/9);
    for (let index = 0; index < limit; index++) {
        const markup = `<a href="#page${index + 1}">${index + 1}</a>`;
        document.querySelector('.pagination').insertAdjacentHTML('beforeend', markup);
    }
}