import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryRef = document.querySelector('.gallery');

createMurkup(galleryItems);

const lightbox = new SimpleLightbox('.gallery a', {captionDelay: 250});



//--------Functions-----------------------------------------
function createMurkup(items) {
    return galleryRef.innerHTML = items.map(item =>
        `<li>
            <a class="gallery__item" href=${item.original}>
                <img
                    class="gallery__image"
                    src=${item.preview} 
                    alt=${item.description}
                    title=${item.description}
                />
            </a>
        </li>`).join(" ");    
}
console.log(galleryItems);
