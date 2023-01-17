import Timeout from "./Timeout.js";

export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  index: number;
  activeSlide: Element;
  timeout: Timeout | null;
  pausedTimeout: Timeout | null;
  paused: boolean;
  thumbItens: HTMLElement[] | null;
  activeThumb: HTMLElement | null;

  constructor(
    container: Element,
    slides: Element[],
    controls: Element,
    time: number = 3000
  ) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.time = time;

    this.index = 0;
    this.activeSlide = this.slides[this.index];

    this.timeout = null;
    this.pausedTimeout = null;

    this.paused = false;
    this.thumbItens = null;
    this.activeThumb = null;

    this.init();
  }

  hide(element: Element) {
    element.classList.remove("active");
    if (element instanceof HTMLVideoElement) {
      element.currentTime = 0;
      element.pause();
    }
  }
  show(index: number) {
    this.index = index;
    this.activeSlide = this.slides[index];

    if (this.thumbItens) {
      this.activeThumb = this.thumbItens[this.index];
      this.thumbItens.forEach((item) => item.classList.remove("active"));
      this.activeThumb.classList.add("active");
    }
    this.slides.forEach((item) => this.hide(item));
    this.activeSlide.classList.add("active");
    if (this.activeSlide instanceof HTMLVideoElement) {
      this.autoVideo(this.activeSlide);
    } else this.auto(this.time);
  }
  autoVideo(video: HTMLVideoElement) {
    video.muted = true;
    video.play();
    let firstPlay = true;
    video.addEventListener("playing", () => {
      if (firstPlay) this.auto(video.duration * 1000);
      firstPlay = false;
    });
  }
  auto(time: number) {
    this.timeout?.clear();
    this.timeout = new Timeout(() => this.next(), time);
    if (this.activeThumb) {
      this.activeThumb.style.animationDuration = `${time}ms`;
    }
  }

  prev() {
    if (this.paused) return;
    const prev = this.index <= 0 ? this.slides.length - 1 : this.index - 1;
    this.show(prev);
  }
  next() {
    if (this.paused) return;
    const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
    this.show(next);
  }
  pause() {
    document.body.classList.add("paused");
    this.pausedTimeout = new Timeout(() => {
      this.paused = true;
      this.timeout?.pause();
      this.activeThumb?.classList.add("paused");
      if (this.activeSlide instanceof HTMLVideoElement) {
        this.activeSlide.pause();
      }
    }, 200);
  }
  continue() {
    document.body.classList.remove("paused");
    this.pausedTimeout?.clear();
    if (this.paused) {
      this.paused = false;
      this.timeout?.continue();
      this.activeThumb?.classList.remove("paused");
      if (this.activeSlide instanceof HTMLVideoElement) {
        this.activeSlide.play();
      }
    }
  }
  private addControls() {
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
    prevButton.innerText = "Slide anterior";
    nextButton.innerText = "Próximo slide";
    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);

    this.controls.addEventListener("pointerdown", () => this.pause());
    document.addEventListener("pointerup", () => this.continue());
    document.addEventListener("touchend", () => this.continue());
    nextButton.addEventListener("pointerup", () => this.next());
    prevButton.addEventListener("pointerup", () => this.prev());
  }

  private addThumbItems() {
    const thumbContainer = document.createElement("div");
    thumbContainer.id = "slide-thumb";
    for (let i = 0; i < this.slides.length; i++) {
      thumbContainer.innerHTML += `
      <span><span class="thumb-item"></span></span>
      `;
    }
    this.controls.appendChild(thumbContainer);
    this.thumbItens = Array.from(document.querySelectorAll(".thumb-item"));
  }
  private init() {
    this.addThumbItems();
    this.addControls();
    this.show(this.index);
  }
}
