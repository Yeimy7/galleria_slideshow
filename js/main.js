'use strict'
window.addEventListener('load', () => {
    const hero = document.getElementById('hero-image');
    const hero_title = document.getElementById('hero-title');
    const hero_autor = document.getElementById('hero-autor');
    const autor = document.getElementById('image-autor');
    const year = document.getElementById('year');
    const description = document.getElementById('description');
    const go_source = document.getElementById('go-source');
    const footer_title = document.getElementById('footer-title');
    const footer_autor = document.getElementById('footer-autor');
    const progress = document.getElementById('progress');

    let dataPicture = {}
    dataPicture.hero;
    dataPicture.title;
    dataPicture.autor;
    dataPicture.imageAutor;
    dataPicture.year;
    dataPicture.desc;
    dataPicture.go;

    var url = window.location.href;
    url = unescape(url);
    url = url.toUpperCase();

    function obtener_valor(variable) {
        var variable_may = variable.toUpperCase(); var variable_pos = url.indexOf(variable_may);

        if (variable_pos != -1) {
            var pos_separador = url.indexOf("&", variable_pos);

            if (pos_separador != -1) {
                return url.substring(variable_pos + variable_may.length + 1, pos_separador);
            } else {
                return url.substring(variable_pos + variable_may.length + 1, url.length);
            }
        } else {
            return "NO_ENCONTRADO";
        }
    }
    var valor = obtener_valor("verinfo");
    if (valor !== 'NO_ENCONTRADO') {
        fetch('http://localhost:5500/db/data.json')
            .then(response => response.json())
            .then(data => {
                dataPicture.hero = data[valor].images.hero.large;
                dataPicture.title = data[valor].name;
                dataPicture.autor = data[valor].artist.name;
                dataPicture.imageAutor = data[valor].artist.image;
                dataPicture.year = data[valor].year;
                dataPicture.desc = data[valor].description;
                dataPicture.go = data[valor].source;
                drawData();
            })
    }

    function drawData() {
        hero.style.backgroundImage = `url('${dataPicture.hero}')`;
        hero_title.innerHTML = dataPicture.title;
        hero_autor.innerHTML = dataPicture.autor;
        autor.style.backgroundImage = `url('${dataPicture.imageAutor}')`;
        year.innerHTML = dataPicture.year;
        description.innerHTML = dataPicture.desc;
        go_source.href = dataPicture.go;
        footer_title.innerHTML = dataPicture.title;
        footer_autor.innerHTML = dataPicture.autor;
        progress.value = 6.6 * (valor + 1);

    }

});