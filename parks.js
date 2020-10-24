
'use strict';

const apiKey = 'CU2YRsxQEkovXPCUbJXWOkDGMH5Tnp4E4rx6hFO1';
const url = 'https://developer.nps.gov/api/v1/parks'


function watchForm() {
    $('#parks-form').submit(event => {
        event.preventDefault();
        let location = $('#js-area').val();
        let maxlist = $('#js-maxResults').val();
        getParks(location, maxlist);
        
    });
};


function queryFormat(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
    
}


function getParks(location, maxlist) {
    const params = {    
        q: location,
        limit: maxlist,
        'api_key': 'CU2YRsxQEkovXPCUbJXWOkDGMH5Tnp4E4rx6hFO1'
    };
    const queryString = queryFormat(params);
    const searchUrl = url + '?' + queryString;
  
    fetch(searchUrl)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error(response.statusText)
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Something went wrong, Please try again.'));
};


function displayResults(responseJson) {
    $('#result-list').empty();

    for (let i = 0; i < responseJson.data; i++) {
        $('#js-result-list').append(
            `<li>
            <h3>National Park : ${responseJson[i].data.fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <p><a href="${responseJson.data[i].url}">Visit the website</a></p>
            </li>`)
    };
    $('.results').removeAttr('hidden');
};


function all() {
    console.log("The page has loaded");
    watchForm();
};

$(all);