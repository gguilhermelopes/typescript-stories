export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  index: number;
  activeSlide: Element;

  constructor(
    container: Element,
    slides: Element[],
    controls: Element,
    time: number = 7500
  ) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.time = time;

    this.index = 0;
    this.activeSlide = this.slides[this.index];

    this.show(this.index);
  }
  hide(element: Element) {
    element.classList.remove("active");
  }
  show(index: number) {
    this.index = index;
    this.activeSlide = this.slides[index];
    this.slides.forEach((item) => this.hide(item));
    this.activeSlide.classList.add("active");
  }
}
