const testButton = document.getElementById('uiGetListData');
const searchField = document.getElementById('uiSearchStr');
const searchResult = document.getElementById('uiSearchResult');

// handle button clicks
function handleClick(event) {
    // send request to server extension
    fetch('http://localhost:8764/getGraphData', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({searchStr: searchField.value})
    }).then(response => {
        console.log('response received');
        console.log(response);
        if (response.ok) {
            return response;
        }
        throw new Error('Response was not ok.');
    }).then(response => {
        response.json().then(json => {
            console.log('response: ' + json.message);
            searchResult.innerText = json.payload;
        });
    }).catch(error => {
        searchResult.innerText = error.message;
    });
}

testButton.onclick = handleClick;