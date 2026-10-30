let galleryUi = {};
let lightboxInitialized = false;
let currentMediaItems = [];
let lightboxVolumeFade = null;

const STD_VOLUME_START = 0.2;
const STD_VOLUME_END = 0.8;
const STD_VOLUME_FADE_MS = 3000;

export function initGallery(mediaItems, ui) {
  galleryUi = ui ?? {};
  currentMediaItems = mediaItems ?? [];
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

export function openSaveTheDate() {
  const index = currentMediaItems.findIndex((item) => item.type === "video");
  openLightbox(index >= 0 ? index : 0, currentMediaItems);
}

function renderMediaItem(item, index) {
  if (item.type === "video") {
    if (item.placeholder) {
      return `
      <figure class="media-card media-card--video media-card--vertical" data-index="${index}">
        <button class="media-trigger" data-lightbox data-index="${index}" aria-label="${galleryUi.playVideo}: ${item.caption}">
          <img src="${item.poster}" alt="" loading="lazy" class="media-thumb" />
          <span class="media-play" aria-hidden="true">▶</span>
          <span class="media-badge">${galleryUi.videoBadge}</span>
        </button>
        <figcaption>${item.caption}</figcaption>
      </figure>`;
    }

    const poster = item.poster
      ? `<img src="${item.poster}" alt="" loading="lazy" class="media-thumb" />`
      : `<span class="media-thumb media-thumb--empty"></span>`;
    return `
      <figure class="media-card media-card--video media-card--vertical" data-index="${index}">
        <button class="media-trigger" data-lightbox data-index="${index}" aria-label="${galleryUi.playVideo}: ${item.caption}">
          ${poster}
          <span class="media-play" aria-hidden="true">▶</span>
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
  const panel = lightbox.querySelector(".lightbox-panel");
  const content = lightbox.querySelector(".lightbox-content");
  const caption = lightbox.querySelector(".lightbox-caption");

  function stopVolumeFade() {
    if (lightboxVolumeFade != null) {
      cancelAnimationFrame(lightboxVolumeFade);
      lightboxVolumeFade = null;
    }
  }

  function fadeVideoVolume(video, from, to, durationMs) {
    stopVolumeFade();
    video.volume = from;
    const started = performance.now();

    function tick(now) {
      const t = Math.min(1, (now - started) / durationMs);
      video.volume = from + (to - from) * t;
      if (t < 1) {
        lightboxVolumeFade = requestAnimationFrame(tick);
      } else {
        lightboxVolumeFade = null;
      }
    }

    lightboxVolumeFade = requestAnimationFrame(tick);
  }

  function close() {
    stopVolumeFade();
    const video = content.querySelector("video");
    if (video) {
      video.pause();
      video.volume = STD_VOLUME_START;
      video.removeAttribute("src");
      video.load();
    }
    lightbox.hidden = true;
    content.innerHTML = "";
    panel?.classList.remove("is-video");
    document.body.style.overflow = "";
  }

  window.openLightbox = (index, mediaItems) => {
    const item = mediaItems[Number(index)];
    if (!item) return;

    stopVolumeFade();
    content.innerHTML = "";
    panel?.classList.toggle("is-video", item.type === "video");

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
        video.volume = STD_VOLUME_START;
        if (item.poster) video.poster = item.poster;
        content.appendChild(video);
        fadeVideoVolume(video, STD_VOLUME_START, STD_VOLUME_END, STD_VOLUME_FADE_MS);
        video.play().catch(() => {});
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
