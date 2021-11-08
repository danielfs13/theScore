var elapsedTime = document.querySelector("#elapsed");
var homeTeamImage = document.querySelector("#homeLogo");
var homeTeamName = document.querySelector("#homeName");
var awayTeamImage = document.querySelector("#awayLogo");
var awayTeamName = document.querySelector("#awayName");
var lastMatchGoal = document.querySelector("#goals");
var matchTable = document.querySelector("#matchTable");
var eventsPlace = document.querySelector('#eventos');
var eventsP = document.querySelector('#eventosP')
var pGameDate = document.querySelector('#pGameDate')
var estadio = document.querySelector('#estadio')

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
    score.innerHTML = "x";

    
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

    var meses = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");
    var semanas = new Array("Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado");

    gameDate.innerHTML = semanas[diaSem] + ", " + dia + " de " + meses[mes] + " " + hora + ":" + minuto;
    gameDate.style.fontWeight = 'bold';

    let localPartidas = document.createElement('p');
    localPartidas.classList.add('localPartidas');
    localPartidas.innerHTML = data['fixture']['venue']['name'];

    matchtile.appendChild(localPartidas);
    matchtile.appendChild(gameDate);
    matchtile.appendChild(homeTeam);
    matchtile.appendChild(score);
    matchtile.appendChild(awayTeam);

    matchTable.appendChild(matchtile);
}


fetch("https://v3.football.api-sports.io/fixtures?league=39&season=2021&next=10", {
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
   lastMatchGoal.innerHTML = "X";
   pGameDate.innerHTML = semanas[diaSem] + ", " + dia + " de " + meses[mes] + " " + hora + ":" + minuto;
   pGameDate.style.fontSize = '0.75em';
   estadio.innerHTML = localPartida;
   estadio.style.fontSize = '0.75em';
   



   for(var i = 1; i<matchesList.length;i++){
       addMatchTile(matchesList[i]);
   }


}))
.catch(err => {
    console.log(err);
});