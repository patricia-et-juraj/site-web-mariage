let galleryUi = {};
let lightboxInitialized = false;

export function initGallery(mediaItems, ui) {
  galleryUi = ui ?? {};
  const grid = document.getElementById("media-grid");
  if (!grid || !mediaItems?.length) return;

  grid.innerHTML = mediaItems
    .map((item, i) => renderMediaItem(item, i))
    .join("");

  grid.querySelectorAll("[data-lightbox]").forEach((el) => {
    el.addEventListener("click", () => openLightbox(el.dataset.index, mediaItems));
  });

  if (!lightboxInitialized) {
    initLightbox();
    lightboxInitialized = true;
  }
}

function renderMediaItem(item, index) {
  if (item.type === "video") {
    const isPlaceholder = item.placeholder;
    return `
      <figure class="media-card media-card--video" data-index="${index}">
        <button class="media-trigger" data-lightbox data-index="${index}" aria-label="${galleryUi.playVideo}: ${item.caption}">
          <img src="${item.poster}" alt="" loading="lazy" class="media-thumb" />
          <span class="media-play" aria-hidden="true">▶</span>
          ${isPlaceholder ? `<span class="media-badge">${galleryUi.videoBadge}</span>` : ""}
        </button>
        <figcaption>${item.caption}</figcaption>
      </figure>`;
  }

  return `
    <figure class="media-card" data-index="${index}">
      <button class="media-trigger" data-lightbox data-index="${index}" aria-label="${galleryUi.enlarge}: ${item.caption}">
        <img src="${item.src}" alt="${item.caption}" loading="lazy" class="media-thumb" />
      </button>
      <figcaption>${item.caption}</figcaption>
    </figure>`;
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const closeBtn = lightbox.querySelector(".lightbox-close");
  const backdrop = lightbox.querySelector(".lightbox-backdrop");
  const content = lightbox.querySelector(".lightbox-content");
  const caption = lightbox.querySelector(".lightbox-caption");

  function close() {
    lightbox.hidden = true;
    content.innerHTML = "";
    document.body.style.overflow = "";
  }

  window.openLightbox = (index, mediaItems) => {
    const item = mediaItems[Number(index)];
    if (!item) return;

    content.innerHTML = "";

    if (item.type === "video") {
      if (item.placeholder) {
        content.innerHTML = `
          <div class="lightbox-placeholder">
            <p>${galleryUi.placeholderLine1} <code>assets/save-the-date/video.mp4</code></p>
            <p>${galleryUi.placeholderLine2} <code>placeholder: false</code> ${galleryUi.placeholderLine2b}</p>
          </div>`;
      } else {
        const video = document.createElement("video");
        video.src = item.src;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        if (item.poster) video.poster = item.poster;
        content.appendChild(video);
      }
    } else {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.caption;
      content.appendChild(img);
    }

    caption.textContent = item.caption;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  };

  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) close();
  });
}

function openLightbox(index, mediaItems) {
  window.openLightbox(index, mediaItems);
}
