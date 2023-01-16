import Timeout from "./Timeout.js";

export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  index: number;
  activeSlide: Element;
  timeout: Timeout | null;

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

    this.init();
  }

  hide(element: Element) {
    element.classList.remove("active");
  }
  show(index: number) {
    this.index = index;
    this.activeSlide = this.slides[index];
    this.slides.forEach((item) => this.hide(item));
    this.activeSlide.classList.add("active");
    this.auto(this.time);
  }

  auto(time: number) {
    this.timeout?.clear();
    this.timeout = new Timeout(() => this.next(), time);
  }

  prev() {
    const prev = this.index <= 0 ? this.slides.length - 1 : this.index - 1;
    this.show(prev);
  }
  next() {
    const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
    this.show(next);
  }
  private addControls() {
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
    prevButton.innerText = "Slide anterior";
    nextButton.innerText = "Próximo slide";
    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);
    nextButton.addEventListener("pointerup", () => this.next());
    prevButton.addEventListener("pointerup", () => this.prev());
  }

  private init() {
    this.addControls();
    this.show(this.index);
  }
}
