let h2 = document.querySelector('h2');//Selecionei a tag h2
var map;

//Se tiver sucesso na localização vai executar essa função
function success(pos){
    console.log(pos.coords.latitude, pos.coords.longitude);//Vai me trazer só latitude e longitude
    h2.textContent = `Latitude:${pos.coords.latitude}, Longitude:${pos.coords.longitude}`;

    if (map === undefined){
        map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 13);//setView Vai receber a latitude e a Longitude e o número  13 é o tamanho do zoom que queremos
    } else {
        map.remove();
        map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 13);
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {// a função tileLayer renderiza a parte visual do mapa, as ruas e etc. recebe o parametro a API openstreetmap
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map) // Nesse código ele cria o pino onde vai marcar a localização
        .bindPopup('Eu estou aqui')
        .openPopup();
}


//Vamos supor que o usuário não permita acessar a localização dele
function error(err){
    console.log(err);
}

//Para conseguir pegar a localização do usuário e sempre que mudar a localização, tem que fazer o código a baixo:
var watchID = navigator.geolocation.watchPosition(success, error, { //Criar a variavel
    enableHighAccuracy: true,
    timeout: 5000
});

//navigator.geolocation.clearWatch(watchID);


//Para conseguir pegar a localização do usuário, tem que fazer o código a baixo:
//navigator.geolocation.getCurrentPosition(success);