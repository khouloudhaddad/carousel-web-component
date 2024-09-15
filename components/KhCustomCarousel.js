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
                            max-width: 600px;
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
                            padding: 10px;
                        }

                        .prev {
                            left: 10px;
                        }

                        .next {
                            right: 10px;
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
    }
}

export {KhCustomCarousel}