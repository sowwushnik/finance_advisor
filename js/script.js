document.addEventListener("DOMContentLoaded", () => {


    function playClickSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = "sine";
            osc.frequency.setValueAtTime(600, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);
            
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.08);
        } catch (e) {
            console.log("Audio Context prevented by browser policy.");
        }
    }

    document.querySelectorAll("button, .btn, .nav-links a").forEach(element => {
        element.addEventListener("click", () => playClickSound());
    });

    const FinanceApp = {
        title: "Finance Advising Platform",
        version: "2.0",
        
        getGreetingByTime() {
            const hour = new Date().getHours();
            let timeOfDay;
            
            switch (true) {
                case (hour >= 5 && hour < 12):
                    timeOfDay = "Morning";
                    break;
                case (hour >= 12 && hour < 18):
                    timeOfDay = "Afternoon";
                    break;
                default:
                    timeOfDay = "Evening";
                    break;
            }
            return `Good ${timeOfDay}! Welcome to ${this.title}`;
        }
    };

    console.log(FinanceApp.getGreetingByTime());

    const articlesData = [
        { title: "Budgeting 101: Master Your Cash Flow", category: "Budgeting", readTime: "3 min" },
        { title: "Stocks vs Bonds: Where to Invest?", category: "Investing", readTime: "5 min" },
        { title: "401k & Retirement Tips for Beginners", category: "Retirement", readTime: "4 min" },
        { title: "Crypto Risks & Market Trends Explained", category: "Investing", readTime: "6 min" }
    ];

    function displayFilteredArticles(category = "All") {
        const container = document.getElementById("dynamic-articles-container");
        if (!container) return;

        const filtered = category === "All" 
            ? articlesData 
            : articlesData.filter(item => item.category === category);

        container.innerHTML = filtered.map(art => `
            <article class="bento-card" style="animation: fadeIn 0.4s ease;">
                <div>
                    <span style="color: var(--accent); font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">${art.category}</span>
                    <h3 style="font-size: 1.2rem; margin: 0.5rem 0;">${art.title}</h3>
                    <p style="color: var(--text-muted); font-size: 0.85rem;">Read time: ${art.readTime}</p>
                </div>
            </article>
        `).join("");
    }

    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterButtons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            const category = e.target.getAttribute("data-category");
            displayFilteredArticles(category);
        });
    });

    displayFilteredArticles("All");

    const datetimeDisplay = document.getElementById("datetime-display");
    function updateDateTime() {
        if (!datetimeDisplay) return;
        const now = new Date();
        const options = { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        datetimeDisplay.textContent = now.toLocaleDateString('en-US', options);
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    const themeBtn = document.getElementById("bg-color-btn");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
            
            themeBtn.style.transform = "scale(1.1) rotate(5deg)";
            setTimeout(() => {
                themeBtn.style.transform = "scale(1) rotate(0deg)";
            }, 200);
        });
    }

    const accordionHeaders = document.querySelectorAll(".accordion-header");
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            const isOpen = header.getAttribute("aria-expanded") === "true";

            accordionHeaders.forEach(h => {
                h.setAttribute("aria-expanded", "false");
                if (h.nextElementSibling) {
                    h.nextElementSibling.style.maxHeight = null;
                    h.nextElementSibling.style.paddingTop = "0";
                    h.nextElementSibling.style.paddingBottom = "0";
                }
            });

            if (!isOpen) {
                header.setAttribute("aria-expanded", "true");
                content.style.maxHeight = content.scrollHeight + 40 + "px";
                content.style.paddingTop = "10px";
                content.style.paddingBottom = "15px";
            }
        });
    });

    const navItems = document.querySelectorAll(".nav-links a");
    let currentNavIndex = 0;

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            currentNavIndex = (currentNavIndex + 1) % navItems.length;
            navItems[currentNavIndex].focus();
        } else if (e.key === "ArrowLeft") {
            currentNavIndex = (currentNavIndex - 1 + navItems.length) % navItems.length;
            navItems[currentNavIndex].focus();
        } else if (e.key === "Escape") {
            const popupModal = document.getElementById("popup-modal");
            if (popupModal && popupModal.style.display === "flex") {
                popupModal.style.display = "none";
            }
        }
    });

    const openPopupBtn = document.getElementById("open-popup-btn");
    const popupModal = document.getElementById("popup-modal");
    const closePopupBtn = document.getElementById("close-popup-btn");
    const popupForm = document.getElementById("popup-form");

    if (openPopupBtn && popupModal && closePopupBtn) {
        openPopupBtn.addEventListener("click", () => {
            popupModal.style.display = "flex";
            const container = popupModal.querySelector(".modal-container");
            if (container) container.style.transform = "scale(1)";
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

    function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
    }

    if (popupForm) {
    popupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailInput = document.getElementById("popup-email");
        const status = document.getElementById("popup-status");
        const errorSpan = document.getElementById("popup-email-error");
        
        if (!isValidEmail(emailInput.value)) {
            if (errorSpan) errorSpan.textContent = "Please enter a valid email address (e.g. name@example.com).";
            if (status) status.textContent = "";
        } else {
            if (errorSpan) errorSpan.textContent = "";
            status.style.color = "var(--accent)";
            status.textContent = "Successfully subscribed!";
            setTimeout(() => {
                popupModal.style.display = "none";
                popupForm.reset();
                status.textContent = "";
            }, 1500);
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
                if (nameError) nameError.textContent = "Name is required.";
                isValid = false;
            } else if (nameError) {
                nameError.textContent = "";
            }

            const email = document.getElementById("email");
            const emailError = document.getElementById("email-error");
            if (email && !email.value.trim()) {
                if (emailError) emailError.textContent = "Email is required.";
                    isValid = false;
                } else if (email && !isValidEmail(email.value)) {
                if (emailError) emailError.textContent = "Please enter a valid email address (e.g. name@example.com).";
                    isValid = false;
                } else if (emailError) {
                    emailError.textContent = "";
                }

            const formStatus = document.getElementById("form-status");
            if (formStatus && isValid) {
                formStatus.style.color = "var(--accent)";
                formStatus.textContent = "Thank you! Your form has been successfully submitted.";
                contactForm.reset();
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