function imageTemplate(image) {
    let { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;

    return `
            <li class="gallery-item">
              <a class="gallery-link" href="${largeImageURL}">
                 <img
                     class="gallery-image"
                     src="${webformatURL}"
                     data-source="${largeImageURL}"
                     alt="${tags}"
                   />
              </a>
              <div class="gallery-info">
                 <ul class="gallery-info-list">
                     <li>
                         <h3 class="gallery-info-name">Likes</h3>
                         <p class="gallery-info-text">${likes}</p>
                     </li>
                     <li>
                         <h3 class="gallery-info-name">Views</h3>
                         <p class="gallery-info-text">${views}</p>
                     </li>
                     <li>
                         <h3 class="gallery-info-name">Comments</h3>
                         <p class="gallery-info-text">${comments}</p>
                     </li>
                     <li>
                         <h3 class="gallery-info-name">Downloads</h3>
                         <p class="gallery-info-text">${downloads}</p>
                     </li>
                 </ul>
             </div>
         </li>`;
}

export function imagesTemplate(images) {
    return images.map(imageTemplate).join('');
}