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
  for (country of countries){
    var option = document.createElement('option');
    option.textContent = country.name;
    console.log(country.name);
    select.appendChild(option);
  }
}

var app = function(){
  var url = 'https://restcountries.eu/rest/v2';
  makeRequest(url, requestComplete);

}

window.addEventListener('load', app);
