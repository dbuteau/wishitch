// global var
var images = null
var price  = 0
var currentImage = 0
var server
var token

let getting = browser.storage.sync.get();
    getting.then(function(items){
        server = items.server;
        token  = items.token;
    }, reportError);

function prev_image(){
    if( currentImage > 0){
        currentImage = currentImage - 1;
        document.getElementById("gift-image").src = images[currentImage]
    }
}

function next_image(){
    if (currentImage < images.length-1){
        currentImage = currentImage + 1;
        document.getElementById("gift-image").src = images[currentImage]
        document.getElementById("gift-image").alt = images[currentImage]
    }
}

function fill_price(price){
    document.getElementById("gift-price").value = price[0];
}

function fill_image(imagesList){
    images =  imagesList[0]
    document.getElementById("gift-image").src = imagesList[0][0]
}

function fill_form(tabs) {
    currentTab  = tabs[0];
    var tabId   = currentTab.id
    var tabInfo = currentTab.get

    // fill forms with immediatly available content
    document.getElementById("gift-designation").value = currentTab.title.slice(0,70);
    document.getElementById("gift-url").value = currentTab.url;

    // fill form with active tab content: price
    var executing = browser.tabs.executeScript(tabId,{
        file: 'includes/search-price.js'
    });
    executing.then(fill_price, reportError);

    var executing = browser.tabs.executeScript(tabId,{
        file: 'includes/search-image.js'
    });
    executing.then(fill_image, reportError);
}

async function saveToServer(){
    if (!server || !token){
        reportError("Server is not defined in options, please setup the extension")
    }else{
        giftName  = document.getElementById("gift-designation").value.slice(0,70);
        giftPrice = document.getElementById("gift-price").value;
        giftUrl   = document.getElementById("gift-url").value;
        giftImage = document.getElementById("gift-image").src;

        fetch(server + '/api/wishes/', {
            method: 'POST',
            body: JSON.stringify({
                'name'        : giftName,
                'price'       : giftPrice,
                'link'        : giftUrl, 
                'img_link'  : giftImage
            }),
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
        .then( response => response.json() )
        .then( response => reportError(response.message ))
        .catch( error   => reportError(error) );
    }

}

function sleep(milliseconds){
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * Just log the error to the console.
 */
function reportError(error, type='error') {
    if(type=='error'){
        console.error('Could not wishitch('+error.lineNumber+'): ' + error);
    }
    var container = document.getElementById("error-zone")
    container.insertAdjacentText("afterbegin", error);
    sleep(5000).then( () => {
        container.removeChild(container.firstChild);
    })
}

/**
 * Main
 */

browser.tabs.query({active: true, currentWindow: true})
    .then(fill_form)
    .catch(reportError);

document.getElementById("prev").addEventListener("click", prev_image);
document.getElementById("next").addEventListener("click", next_image);
document.getElementById("confirm").addEventListener("click", saveToServer);