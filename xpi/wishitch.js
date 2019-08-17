// global var
var images = null
var price  = 0
var currentImage = 0
var server
var token
let getting = browser.storage.sync.get();
    getting.then(function(items){server = items.server;token = items.token;}, reportError);

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
    document.getElementById("gift-designation").value = currentTab.title;
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
        const response = await fetch(server + '/api/wish', {
        method: 'POST',
        body: JSON.stringify({
            name        = gift-designation, 
            price       = gift-price, 
            link        = gift-link, 
            image_link  = gift-image
        }),
        headers: {
            'Content-Type': 'application/json',
            'token': token
            }
        });
        const myJson = await response.json();
    }

}

function sleep(milliseconds){
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * Just log the error to the console.
 */
function reportError(error) {
    console.error(`Could not wishitch: ${error}`);
    document.getElementById("error-zone").innerHTML = error;
    sleep(5000).then( () => {
        document.getElementById("error-zone").innerHTML = "";
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
document.querySelector("form").addEventListener("submit", saveToServer);