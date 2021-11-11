var elapsedTime = document.querySelector("#elapsed");
var homeTeamImage = document.querySelector("#homeLogo");
var homeTeamName = document.querySelector("#homeName");
var awayTeamImage = document.querySelector("#awayLogo");
var awayTeamName = document.querySelector("#awayName");
var lastMatchGoal = document.querySelector("#goals");
var matchTable = document.querySelector("#matchTable");
var eventsPlace = document.querySelector('#eventos');
var eventsP = document.querySelector('#eventosP');
var pGameDate = document.querySelector('#pGameDate');
var estadio = document.querySelector('#estadio');
var estadioIcon = document.querySelector('.estadioIcon');



function addMatchTile(data){
    console.log(data)
 
    var matchtile = document.createElement('div');
    matchtile.classList.add("match-tile");

  
    var homeTeam = document.createElement('div');
    homeTeam.classList.add("team");
    

    var homeTileTeamName = document.createElement('p');
    homeTileTeamName.innerHTML = data['teams']['home']['name'];
    var homeTileTeamLogo = document.createElement('img');
    homeTileTeamLogo.src=data['teams']['home']['logo'];
    homeTeam.appendChild(homeTileTeamLogo);
    homeTeam.appendChild(homeTileTeamName);




    var awayTeam = document.createElement('div');
    awayTeam.classList.add("team");

    var awayTileTeamName = document.createElement('p');
    awayTileTeamName.innerHTML = data['teams']['away']['name'];
    var awayTileTeamLogo = document.createElement('img');
    awayTileTeamLogo.src=data['teams']['away']['logo'];
    awayTeam.appendChild(awayTileTeamLogo);
    awayTeam.appendChild(awayTileTeamName);


    var score = document.createElement('p');
    score.innerHTML = data['goals']['home'] + " - " + data['goals']['away'];
    score.style.fontSize = '1.5em';  

    
    var gameDate = document.createElement('p');
    gameDate.classList.add('datasJogos');
    let dateConvert = new Date(data['fixture']['date']);
    //dateConvert.toISOString();
    dateConvert.toLocaleString("pt-BR");
    let dia = dateConvert.getDate();
    let diaSem = dateConvert.getDay();
    let mes = dateConvert.getMonth();
    let hora = dateConvert.getHours();
    let minuto = dateConvert.getMinutes();

    if(minuto === 0){
        minuto = "00";
    }

    var meses = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");
    var semanas = new Array("Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado");

    gameDate.innerHTML = semanas[diaSem] + ", " + dia + " de " + meses[mes] + " " + hora + ":" + minuto;
    gameDate.style.fontWeight = 'bold';


    let localDiv = document.createElement('div');
    localDiv.classList.add = ("localDiv");

    localDiv.style.display = "flex";
    localDiv.style.width = "258px";
    localDiv.style.height = '34px';
    localDiv.style.position = "absolute";
    localDiv.style.top = "10px";
    localDiv.style.justifyContent = "space-evenly";
    localDiv.style.alignItems = "center";
    localDiv.style.margin = "10px 0px 10px 0px";

    let localPartidas = document.createElement('p');
    localPartidas.classList.add('localPartidas');

    let estadio = document.createElement('img');
    estadio.src = "../thescore/images/stadium_black_24dp.svg";
    estadio.style.width = '25px';
    estadio.style.display = 'flex';

    localPartidas.innerHTML = data['fixture']['venue']['name'];
    localPartidas.style.fontSize = '0.75em';
    localPartidas.style.display = 'flex';

  
    localDiv.appendChild(estadio);
    localDiv.appendChild(localPartidas);
    
    matchtile.appendChild(localDiv);
    matchtile.appendChild(gameDate);
    matchtile.appendChild(homeTeam);
    matchtile.appendChild(score);
    matchtile.appendChild(awayTeam);

    matchTable.appendChild(matchtile);
}

fetch("https://v3.football.api-sports.io/fixtures?league=39&season=2021&last=10", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "b5fd9ace06fe64728c81b99adf061751"
	}
})
.then(response => response.json().then(data => {
    var matchesList = data['response'];
    var fixture = matchesList[0]['fixture'];
    var goals = matchesList[0]['goals'];
    var teams = matchesList[0]['teams'];
    var localPartida = matchesList[0]['fixture']['venue']['name'];
    
    let dateConvert = new Date(matchesList[0]['fixture']['date']);
    //dateConvert.toISOString();
    dateConvert.toLocaleString("pt-BR");

    let dia = dateConvert.getDate();
    let diaSem = dateConvert.getDay();
    let mes = dateConvert.getMonth();
    let hora = dateConvert.getHours();
    let minuto = dateConvert.getMinutes();

    var meses = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");
    var semanas = new Array("Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado");

   elapsedTime.innerHTML = " ";
   homeTeamImage.src = teams['home']['logo'];
   homeTeamName.innerHTML = teams['home']['name'];
   awayTeamImage.src = teams['away']['logo'];
   awayTeamName.innerHTML = teams['away']['name'];
   lastMatchGoal.innerHTML = goals['home']+ " - " + goals['away'];
   pGameDate.innerText = semanas[diaSem] + ", " + dia + " de " + meses[mes] + " " + hora + ":" + minuto;
   pGameDate.style.fontSize = '0.75em';
   estadio.innerText = localPartida;
   estadio.style.fontSize = '0.75em';
   



   for(var i = 1; i<matchesList.length;i++){
       addMatchTile(matchesList[i]);
   }


}))
.catch(err => {
    console.log(err);
});