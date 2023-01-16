export default class Slide {
    container;
    slides;
    controls;
    time;
    index;
    activeSlide;
    constructor(container, slides, controls, time = 7500) {
        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.time = time;
        this.index = 0;
        this.activeSlide = this.slides[this.index];
        this.show(this.index);
    }
    hide(element) {
        element.classList.remove("active");
    }
    show(index) {
        this.index = index;
        this.activeSlide = this.slides[index];
        this.slides.forEach((item) => this.hide(item));
        this.activeSlide.classList.add("active");
    }
}
//# sourceMappingURL=Slide.js.map