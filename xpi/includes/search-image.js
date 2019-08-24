const images = document.images;
let i;
let imageList = [];

for ( i = 0; i < images.length; i++ ){
    if ( images[i].offsetWidth >= 60 ){
        imageList.push( images[i].src )
    };
}

imageList;