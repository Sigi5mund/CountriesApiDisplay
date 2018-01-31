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
    var ul = document.querySelector('#country-list');
    countries.forEach(function(country){
    var li = document.createElement('li');
    li.innerText = country.name;
    ul.appendChild(li);
  })
}

var app = function(){
  var url = 'https://restcountries.eu/rest/v2';
  makeRequest(url, requestComplete);

}

window.addEventListener('load', app);
