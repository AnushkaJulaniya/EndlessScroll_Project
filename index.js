const ACCESS_key = "jin8QOE0-8HfTO8IuF-Za5uWebBpFJ1mgH_ktgtOk1g";
const count = 15;//number of photos to fetch in one call
const API_url =  `https://api.unsplash.com/photos/random/?client_id=${ACCESS_key}&count=${count}`;
    // const Secret Key = "A3sS8E8xZ9eBlNnWiJyKPtQERnBlgS-g6D2DFf9BrvE";
let images = [];
let loaded = false;

    const loader = document.querySelector("#loader");
    const imgContainer = document.querySelector("#img-container");


async function getPhotos(){
    loaded = false;
    loader.style.display = "block";
    try{
         const response = await fetch(API_url);
         images = await response.json();//images.push(...await response.json());
        
         console.log(images);
        displayPhotos(images);
    }
    catch(error){
        console.log(error);
    }
}




function displayPhotos(photosArr){
    const fragment = document.createDocumentFragment();
    photosArr.forEach((photo)=>{
        const anchor = document.createElement("a");
        anchor.href = photo.links.html;

        const image = document.createElement("img");
        image.src = photo.urls.regular;
        image.alt = photo.urls.regular;
        image.title = photo.alt_description;

        anchor.append(image);
        fragment.append(anchor);
   
    });
    imgContainer.append(fragment);
    loader.style.display = "none";
    loaded = true;
}
// console.log("window.innerHeight",window.innerHeight);//the viewable height + horizontal scrollbar's height
//console.log("document.body.offsetHeight",document.body.offsetHeight);
//console.log("window.scrollY",window.scrollY)


window.addEventListener("scroll",()=>{
    window.scrollY + window.innerHeight >= document.body.offsetHeight && loaded ? getPhotos() : "";

});

getPhotos(); // Initially 15 photos are loaded
