import{a as w,S,i as h}from"./assets/vendor-b0d10f48.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function l(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(e){if(e.ep)return;e.ep=!0;const a=l(e);fetch(e.href,a)}})();async function y(t,r){const l="https://pixabay.com",s="/api/",e=new URLSearchParams({key:"44423384-360ba42c67bb4e928fcac247f",q:t,page:r,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:"true"}),a=`${l}${s}?${e}`;return(await w.get(a)).data}function $(t){let{webformatURL:r,largeImageURL:l,tags:s,likes:e,views:a,comments:i,downloads:v}=t;return`
            <li class="gallery-item">
              <a class="gallery-link" href="${l}">
                 <img
                     class="gallery-image"
                     src="${r}"
                     data-source="${l}"
                     alt="${s}"
                   />
              </a>
              <div class="gallery-info">
                 <ul class="gallery-info-list">
                     <li>
                         <h3 class="gallery-info-name">Likes</h3>
                         <p class="gallery-info-text">${e}</p>
                     </li>
                     <li>
                         <h3 class="gallery-info-name">Views</h3>
                         <p class="gallery-info-text">${a}</p>
                     </li>
                     <li>
                         <h3 class="gallery-info-name">Comments</h3>
                         <p class="gallery-info-text">${i}</p>
                     </li>
                     <li>
                         <h3 class="gallery-info-name">Downloads</h3>
                         <p class="gallery-info-text">${v}</p>
                     </li>
                 </ul>
             </div>
         </li>`}function p(t){return t.map($).join("")}const o={formInput:document.querySelector(".search-images-form"),gallery:document.querySelector(".gallery"),loadImg:document.querySelector(".loader"),btnLoadMore:document.querySelector(".load-more-btn")};let L=new S(".gallery a",{captionsData:"alt",captionDelay:250}),c="",n=1,u=1;const E=15;o.formInput.addEventListener("submit",async t=>{for(t.preventDefault();o.gallery.firstChild;)o.gallery.removeChild(o.gallery.firstChild);if(c=t.target.elements.input.value.trim(),!c){d("Search field is empty");return}n=1,b(),g();try{const r=await y(c,n);if(u=Math.ceil(r.totalHits/E),u===0){d("Sorry, there are no images matching your search query. Please try again!"),f(),m();return}const l=p(r.hits);o.gallery.insertAdjacentHTML("beforeend",l),L.refresh()}catch(r){d(r)}f(),m(),o.formInput.reset()});o.btnLoadMore.addEventListener("click",async()=>{n++,g(),b();try{const t=await y(c,n),r=p(t.hits);o.gallery.insertAdjacentHTML("beforeend",r),P(),L.refresh()}catch(t){d(t)}f(),m()});function d(t){h.error({position:"topRight",backgroundColor:"red",theme:"dark",title:"Error",titleColor:"white",message:t,messageColor:"white",maxWidth:400})}function I(){o.btnLoadMore.classList.remove("visually-hidden")}function g(){o.btnLoadMore.classList.add("visually-hidden")}function m(){n>=u?(g(),u&&h.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):I()}function b(){o.loadImg.classList.remove("visually-hidden")}function f(){o.loadImg.classList.add("visually-hidden")}function P(){const r=o.gallery.children[0].getBoundingClientRect().height;scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
