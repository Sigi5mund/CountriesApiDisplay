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

var displayPopulateInformation = function(previousCountry){
  var result = document.querySelector('#country-results');
  var country = previousCountry;
  result.innerText = `Welcome Back! The FBI have been tracking your activities and they say you were last looking at this country: \n\n Name: ${country.name} \n Population: ${country.population} \n Capital city: ${country.capital}`;
}

var populateInformation = function(previousCountry){
  var previousCountry = previousCountry;
  var result = document.querySelector('#country-results');
  var selected = document.querySelector('select');
  var country = countries[selected.value];
  saveCountry(country);
  result.innerText = `Name: ${country.name} \n Population: ${country.population} \n Capital city: ${country.capital}`;

}

var saveCountry = function(countryToBeSaved){
  var jsonString = JSON.stringify(countryToBeSaved);
  localStorage.setItem('country', jsonString);
}

var app = function(){
  var url = 'https://restcountries.eu/rest/v2';
  makeRequest(url, requestComplete);
  var dropDown = document.querySelector('select');
  dropDown.addEventListener('change', populateInformation)
  var savedCountry = JSON.parse(localStorage.getItem('country'));

  displayPopulateInformation(savedCountry);
}


window.addEventListener('load', app);
