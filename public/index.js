var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function() {
  if (this.status !== 200)
  return;
  var jsonString = this.responseText;
  countries = JSON.parse(jsonString);
  populateList();
}

var populateList = function(){
  var select = document.querySelector('select');
  countries.forEach(function(country, index) {
    var option = document.createElement('option');
    option.textContent = country.name;
    option.value = index;
    select.appendChild(option);
  })
}

var populateInformation = function(){
  var result = document.querySelector('#country-results');
  var selected = document.querySelector('select');
  var country = countries[selected.value]
  result.innerText = `Name: ${country.name} \n Population: ${country.population} \n Capital city: ${country.capital}`


}

var app = function(){
  var url = 'https://restcountries.eu/rest/v2';
  makeRequest(url, requestComplete);
  var dropDown = document.querySelector('select');
  dropDown.addEventListener('change', populateInformation)
}


window.addEventListener('load', app);
