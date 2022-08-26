const testButton = document.getElementById('uiGetListData');
const searchField = document.getElementById('uiSearchStr');
const searchResult = document.getElementById('uiSearchResult');
const busy = document.getElementById('uiBusyIndicator');

// handle button clicks
function handleClick(event) {

    console.log('button clicked');

    busy.style.display = "block";

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
        busy.style.display = "none";
        throw new Error('Response was not ok.');
    }).then(response => {
        response.json().then(json => {
            console.log('response message: ' + json.message);
            busy.style.display = "none";
            searchResult.innerText = JSON.stringify(JSON.parse(json.payload), null, 2);
        });
    }).catch(error => {
        busy.style.display = "none";
        searchResult.innerText = error.message;
    });
}

testButton.onclick = handleClick;