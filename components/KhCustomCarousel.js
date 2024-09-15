class KhCustomCarousel extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        this.shadowRoot.innerHTML =  `
                    <style>
                        :host {
                            display: block;
                            width: 100%;
                            max-width: 100%;
                            margin: auto;
                            overflow: hidden;
                            position: relative;
                        }

                        .carousel-container {
                            display: flex;
                            transition: transform 0.5s ease-in-out;
                            width: 100%;
                        }

                        .carousel-slide {
                            min-width: 100%;
                            box-sizing: border-box;
                        }

                        img {
                            width: 100%;
                            display: block;
                        }

                        .prev, .next {
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            background-color: rgba(0, 0, 0, 0.5);
                            color: white;
                            border: none;
                            font-size: 24px;
                            cursor: pointer;
                            width: 50px;
                            height: 50px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border-radius: 50%;
                            z-index: 1;
                        }

                        .prev {
                            left: 20px;
                        }

                        .next {
                            right: 20px;
                        }

                        .dots {
                            text-align: center;
                            padding: 10px;
                        }

                        .dot {
                            height: 15px;
                            width: 15px;
                            margin: 0 5px;
                            background-color: #bbb;
                            border-radius: 50%;
                            display: inline-block;
                            cursor: pointer;
                        }

                        .dot.active {
                            background-color: #717171;
                        }
                    </style>

                    <div class="carousel">
                        <button class="prev">&#10094;</button>
                        <div class="carousel-container">
                            <slot></slot> <!-- Slot for images -->
                        </div>
                        <button class="next">&#10095;</button>
                    </div>
                    <div class="dots"></div>
                `;

        this.carouselContainer = this.shadowRoot.querySelector('.carousel-container');
        this.slides = this.querySelectorAll('img');
        this.totalSlides = this.slides.length;
        this.index = 0;

        // Create dots
        this.createDots();

        // Add event listeners for buttons
        this.shadowRoot.querySelector('.prev').addEventListener('click', () => this.prevSlide());
        this.shadowRoot.querySelector('.next').addEventListener('click', () => this.nextSlide());

        // Display the first slide
        this.showSlide(this.index);
    }

    createDots() {
        const dotsContainer = this.shadowRoot.querySelector('.dots');
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => this.showSlide(i));
            dotsContainer.appendChild(dot);
        }
        this.dots = dotsContainer.querySelectorAll('.dot');
    }

    showSlide(n) {
        // Wrap around index
        if (n >= this.totalSlides) {
            this.index = 0;
        } else if (n < 0) {
            this.index = this.totalSlides - 1;
        } else {
            this.index = n;
        }

        // Move the carousel
        this.carouselContainer.style.transform = `translateX(-${this.index * 100}%)`;

        // Update active dot
        this.dots.forEach(dot => dot.classList.remove('active'));
        this.dots[this.index].classList.add('active');
    }

    prevSlide() {
        this.showSlide(this.index - 1);
    }

    nextSlide() {
        this.showSlide(this.index + 1);
    }
}

export default KhCustomCarousel;