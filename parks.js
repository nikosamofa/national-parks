
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
            else { throw new Error(response.statusText) }
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Something went wrong, Please try again.'));
};


function displayResults(responseJson) {

    $('#js-result-list').empty();
    if (responseJson.data.length == 0) {
        $('#js-result-list').append(
            `<li>            
            <p>No results</p>
            </li>`)
    }
    else {
        for (let i = 0; i < responseJson.data.length; i++) {
            $('#js-result-list').append(
                `<li>
    
                <h3> ${responseJson.data[i].fullName}</h3>
                <img src="${responseJson.data[i].images[0].url}">
                <p>${responseJson.data[i].description}</p>
                <p>visite: <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
                </hr>
                </li>`)
        }
    }
    $('.results').removeAttr('hidden');
};


function all() {
    console.log("The page has loaded");
    watchForm();
};

$(all);