(function (global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        exports.BeerSlider = factory();
    } else {
        global.BeerSlider = factory();
    }
})(typeof window !== 'undefined' ? window : this, function () {
    const BeerSlider = (() => {
        class BeerSlider {
            constructor(element, options = {}) {
                const { start = '50', prefix = 'beer' } = options;
                this.start = Math.min(100, Math.max(0, parseInt(start))) || 50;
                this.prefix = prefix;

                if (element && element.children.length === 2) {
                    this.element = element;
                    this.revealContainer = this.element.children[1];
                    if (this.revealContainer.children.length > 0) {
                        this.revealElement = this.revealContainer.children[0];
                        this.range = this.addElement('input', {
                            type: 'range',
                            class: `${this.prefix}-range`,
                            'aria-label': 'Percent of revealed content',
                            'aria-valuemin': '0',
                            'aria-valuemax': '100',
                            'aria-valuenow': this.start,
                            value: this.start,
                            min: '0',
                            max: '100',
                        });
                        this.handle = this.addElement('span', { class: `${this.prefix}-handle` });
                        this.onImagesLoad();
                    }
                }
            }

            init() {
                this.element.classList.add(`${this.prefix}-ready`);
                this.setImgWidth();
                this.move();
                this.addListeners();
            }

            loadingImg(src) {
                return new Promise((resolve, reject) => {
                    if (!src) return resolve();
                    const img = new Image();
                    img.onload = () => resolve();
                    img.onerror = () => reject();
                    img.src = src;
                });
            }

            loadedBoth() {
                const src1 = this.element.children[0].src || this.element.children[0].getAttribute(`data-${this.prefix}-src`);
                const src2 = this.revealElement.src || this.revealElement.getAttribute(`data-${this.prefix}-src`);
                return Promise.all([this.loadingImg(src1), this.loadingImg(src2)]);
            }

            onImagesLoad() {
                this.loadedBoth().then(
                    () => this.init(),
                    () => console.error("Some errors occurred and images are not loaded.")
                );
            }

            addElement(tag, attributes) {
                const element = document.createElement(tag);
                Object.keys(attributes).forEach(key => {
                    element.setAttribute(key, attributes[key]);
                });
                this.element.appendChild(element);
                return element;
            }

            setImgWidth() {
                this.revealElement.style.width = getComputedStyle(this.element).width;
            }

            addListeners() {
                ['input', 'change'].forEach(event => {
                    this.range.addEventListener(event, () => this.move());
                });
                window.addEventListener('resize', () => this.setImgWidth());
            }

            move() {
                this.revealContainer.style.width = `${this.range.value}%`;
                this.handle.style.left = `${this.range.value}%`;
                this.range.setAttribute('aria-valuenow', this.range.value);
            }
        }

        return BeerSlider;
    })();

    return BeerSlider;
});
