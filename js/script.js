document.addEventListener("DOMContentLoaded", () => {
    const datetimeDisplay = document.getElementById("datetime-display");
    function updateDateTime() {
        if (!datetimeDisplay) return;
        const now = new Date();
        const options = { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        datetimeDisplay.textContent = now.toLocaleDateString('en-US', options);
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    const bgColorBtn = document.getElementById("bg-color-btn");
    const colors = ["#f8f9fa", "#e9ecef", "#cfe2ff", "#d1e7dd", "#fff3cd", "#f8d7da"];
    let colorIndex = 0;
    if (bgColorBtn) {
        bgColorBtn.addEventListener("click", () => {
            colorIndex = (colorIndex + 1) % colors.length;
            document.body.style.backgroundColor = colors[colorIndex];
        });
    }

    const accordionHeaders = document.querySelectorAll(".accordion-header");
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            const isOpen = header.getAttribute("aria-expanded") === "true";

            accordionHeaders.forEach(h => {
                h.setAttribute("aria-expanded", "false");
                h.nextElementSibling.style.maxHeight = null;
                h.nextElementSibling.style.paddingTop = "0";
                h.nextElementSibling.style.paddingBottom = "0";
            });

            if (!isOpen) {
                header.setAttribute("aria-expanded", "true");
                content.style.maxHeight = content.scrollHeight + 40 + "px";
                content.style.paddingTop = "10px";
                content.style.paddingBottom = "15px";
            }
        });
    });

    const openPopupBtn = document.getElementById("open-popup-btn");
    const popupModal = document.getElementById("popup-modal");
    const closePopupBtn = document.getElementById("close-popup-btn");
    const popupForm = document.getElementById("popup-form");

    if (openPopupBtn && popupModal && closePopupBtn) {
        openPopupBtn.addEventListener("click", () => {
            popupModal.style.display = "flex";
        });
        closePopupBtn.addEventListener("click", () => {
            popupModal.style.display = "none";
        });
        window.addEventListener("click", (e) => {
            if (e.target === popupModal) {
                popupModal.style.display = "none";
            }
        });
    }

    if (popupForm) {
        popupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = document.getElementById("popup-email");
            const status = document.getElementById("popup-status");
            const errorSpan = document.getElementById("popup-email-error");
            
            if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
                errorSpan.textContent = "Please enter a valid email address.";
            } else {
                errorSpan.textContent = "";
                status.style.color = "green";
                status.textContent = "Successfully subscribed!";
                setTimeout(() => {
                    popupModal.style.display = "none";
                    popupForm.reset();
                    status.textContent = "";
                }, 2000);
            }
        });
    }

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById("name");
            const nameError = document.getElementById("name-error");
            if (name && !name.value.trim()) {
                nameError.textContent = "Name is required.";
                isValid = false;
            } else if (nameError) {
                nameError.textContent = "";
            }

            const email = document.getElementById("email");
            const emailError = document.getElementById("email-error");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !email.value.trim()) {
                emailError.textContent = "Email is required.";
                isValid = false;
            } else if (email && !emailRegex.test(email.value)) {
                emailError.textContent = "Please enter a valid email format.";
                isValid = false;
            } else if (emailError) {
                emailError.textContent = "";
            }

            const password = document.getElementById("password");
            const passwordError = document.getElementById("password-error");
            if (password && password.value.length < 6) {
                passwordError.textContent = "Password must be at least 6 characters long.";
                isValid = false;
            } else if (passwordError) {
                passwordError.textContent = "";
            }

            const confirmPassword = document.getElementById("confirm-password");
            const confirmPasswordError = document.getElementById("confirm-password-error");
            if (password && confirmPassword && confirmPassword.value !== password.value) {
                confirmPasswordError.textContent = "Passwords do not match.";
                isValid = false;
            } else if (confirmPasswordError) {
                confirmPasswordError.textContent = "";
            }

            const topic = document.getElementById("topic");
            const topicError = document.getElementById("topic-error");
            if (topic && !topic.value) {
                topicError.textContent = "Please select a topic.";
                isValid = false;
            } else if (topicError) {
                topicError.textContent = "";
            }

            const message = document.getElementById("message");
            const messageError = document.getElementById("message-error");
            if (message && !message.value.trim()) {
                isValid = false;
            } else if (messageError) {
                messageError.textContent = "";
            }

            const formStatus = document.getElementById("form-status");
            if (formStatus) {
                if (isValid) {
                    formStatus.style.color = "green";
                    formStatus.textContent = "Thank you! Your form has been successfully validated and submitted.";
                    contactForm.reset();
                }
            }
        });
    }

    const slides = document.querySelectorAll(".custom-carousel .carousel-item");
    const prevBtn = document.querySelector(".carousel-control-prev");
    const nextBtn = document.querySelector(".carousel-control-next");
    let currentSlide = 0;

    function showSlide(index) {
        if (!slides.length) return;
        slides.forEach(s => s.classList.remove("active"));
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        slides[currentSlide].classList.add("active");
    }

    if (prevBtn && nextBtn && slides.length > 0) {
        prevBtn.addEventListener("click", () => {
            currentSlide--;
            showSlide(currentSlide);
        });
        nextBtn.addEventListener("click", () => {
            currentSlide++;
            showSlide(currentSlide);
        });
    }
});