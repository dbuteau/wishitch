function filter_dataAttributes(attribute){
    nodeList = document.querySelectorAll('['+attribute+']');
    if(!nodeList){
        return False;
    }else{
        var i;
        for (i = 0; i < nodeList.length; ++i){
            rect = nodeList[i].getBoundingClientRect();
            
            // check if the element is in visible windows
            if( rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) ){
                return nodeList[i].attributes[attribute].value
            }
        }
    }
}

function search_price(){
    var dataAttributes = ["data-price","data-value","data-prix-origine"];
    var currency = document.querySelectorAll('[data-currency]');
    var price;
    if (!currency) {
        console.warn("WishItch: This website don't use data attributes, we can't auto-fill price");
        price = undefined;
    }else{
        dataAttributes.forEach(dataAttribute => {
            price = filter_dataAttributes(dataAttribute);
            if(price){return price}
        });
    }
    return price;
}

var price = search_price();
price