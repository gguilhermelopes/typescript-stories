import Timeout from "./Timeout.js";
export default class Slide {
    container;
    slides;
    controls;
    time;
    index;
    activeSlide;
    timeout;
    constructor(container, slides, controls, time = 3000) {
        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.time = time;
        this.index = 0;
        this.activeSlide = this.slides[this.index];
        this.timeout = null;
        this.init();
    }
    hide(element) {
        element.classList.remove("active");
    }
    show(index) {
        this.index = index;
        this.activeSlide = this.slides[index];
        this.slides.forEach((item) => this.hide(item));
        this.activeSlide.classList.add("active");
        this.auto(this.time);
    }
    auto(time) {
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
    addControls() {
        const prevButton = document.createElement("button");
        const nextButton = document.createElement("button");
        prevButton.innerText = "Slide anterior";
        nextButton.innerText = "Próximo slide";
        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);
        nextButton.addEventListener("pointerup", () => this.next());
        prevButton.addEventListener("pointerup", () => this.prev());
    }
    init() {
        this.addControls();
        this.show(this.index);
    }
}
//# sourceMappingURL=Slide.js.map