document.addEventListener("DOMContentLoaded", function () {
    // Handle adding items to cart
    const addButtons = document.querySelectorAll(".add-btn");
    addButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Item added to cart!");
        });
    });

    // Handle carousel functionality
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const carouselContainer = document.querySelector(".carousel-container");
const foodCards = document.querySelectorAll(".food-card");

if (prevBtn && nextBtn && carouselContainer && foodCards.length > 0) {
    let scrollAmount = 0;
    const cardWidth = foodCards[0].offsetWidth + 16; // Adding margin/gap between cards
    const maxScroll = carouselContainer.scrollWidth - carouselContainer.clientWidth;
    let autoScrollInterval;

    const autoScroll = () => {
        scrollAmount += cardWidth;
        if (scrollAmount > maxScroll) scrollAmount = 0;
        carouselContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
    };

    autoScrollInterval = setInterval(autoScroll, 2500);

    carouselContainer.addEventListener("mouseenter", () => clearInterval(autoScrollInterval));
    carouselContainer.addEventListener("mouseleave", () => {
        autoScrollInterval = setInterval(autoScroll, 3000);
    });

    prevBtn.addEventListener("click", function () {
        clearInterval(autoScrollInterval);
        scrollAmount = Math.max(scrollAmount - cardWidth, 0);
        carouselContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
        autoScrollInterval = setInterval(autoScroll, 3000);
    });

    nextBtn.addEventListener("click", function () {
        clearInterval(autoScrollInterval);
        scrollAmount = Math.min(scrollAmount + cardWidth, maxScroll);
        carouselContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
        autoScrollInterval = setInterval(autoScroll, 3000);
    });
}
    // Request dish modal functionality
    const requestButton = document.querySelector("[data-action='request-dish']");
    const modal = document.getElementById("requestDishModal");
    const closeButton = document.querySelector(".close");
    const cancelButton = document.querySelector(".cancel");
    const submitButton = document.getElementById("submitRequest");
    const successMessage = document.getElementById("successMessage");

    if (requestButton && modal) {
        requestButton.addEventListener("click", () => modal.style.display = "block");
        closeButton.addEventListener("click", closeModal);
        cancelButton.addEventListener("click", closeModal);
        window.addEventListener("click", event => event.target === modal && closeModal());

        submitButton.addEventListener("click", function () {
            const dishName = document.getElementById("dishName").value.trim();
            if (!dishName) {
                alert("Please enter the name of the dish.");
                return;
            }
            successMessage.style.display = "block";
            setTimeout(() => {
                successMessage.style.display = "none";
                closeModal();
            }, 2000);
        });

        function closeModal() {
            modal.style.display = "none";
            document.getElementById("dishName").value = "";
            document.getElementById("dishImage").value = "";
        }
    }

    // Video autoplay and click-to-unmute
    const video = document.getElementById("promo-video");
    if (video) {
        video.play().catch(error => console.error("Autoplay prevented:", error));
        video.addEventListener("click", () => {
            if (video.muted) {
                video.muted = false;
                video.volume = 0.5;
            }
        });
    }

    // Form validation
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = form.querySelector("input[type='text']").value.trim();
            const email = form.querySelector("input[type='email']").value.trim();
            const message = form.querySelector("textarea").value.trim();

            if (!name || !email || !message) {
                alert("Please fill out all fields.");
                return;
            }
            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }
            alert("Form submitted successfully!");
            form.reset();
        });
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Cart modal functionality
    const cartIcon = document.querySelector(".cart-icon");
    const cartModal = document.getElementById("cart-modal");
    const closeModalBtn = document.querySelector(".close-btn");
    const backToMenuBtn = document.getElementById("close-cart");

    if (cartIcon && cartModal) {
        cartIcon.addEventListener("click", () => cartModal.classList.add("show"));
        closeModalBtn.addEventListener("click", closeCartModal);
        backToMenuBtn.addEventListener("click", closeCartModal);
        window.addEventListener("click", event => event.target === cartModal && closeCartModal());
    }

    function closeCartModal() {
        cartModal.classList.remove("show");
    }
});
