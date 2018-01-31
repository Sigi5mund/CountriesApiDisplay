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
}

var populateList = function(){
  var select = document.querySelector('select');
  countries.forEach(function(country){
    var option = document.createElement('option');
    option.innerText = country.name;
    select.appendChild(option);
  })
}

var app = function(){
  var url = 'https://restcountries.eu/rest/v2';
  makeRequest(url, requestComplete);

}

window.addEventListener('load', app);
