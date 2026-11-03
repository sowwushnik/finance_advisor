const FinanceApp = {
    title: "Finance Advising Platform",
    version: "2.1",
    
    getGreetingByTime(hour) {
        let period = "";
        if (hour >= 5 && hour < 12) {
            period = "morning";
        } else if (hour >= 12 && hour < 18) {
            period = "afternoon";
        } else if (hour >= 18 && hour < 23) {
            period = "evening";
        } else {
            period = "night";
        }

        switch (period) {
            case "morning":
                return "Good morning!";
            case "afternoon":
                return "Good afternoon!";
            case "evening":
                return "Good evening!";
            case "night":
            default:
                return "Good night!";
        }
    },

    calculateBudget(income) {
        return {
            needs: Math.round(income * 0.50),
            wants: Math.round(income * 0.30),
            savings: Math.round(income * 0.20)
        };
    }
};

$(document).ready(function () {
    console.log("jQuery is ready!");

    function playClickSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(520, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.06);

            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.06);
        } catch (e) {
        }
    }

    $(document).on("click", "button, .btn, .nav-links a", function () {
        playClickSound();
    });

    const $greetingElement = $("#hero-greeting");
    if ($greetingElement.length) {
        const currentHour = new Date().getHours();
        $greetingElement.text(FinanceApp.getGreetingByTime(currentHour));
    }

    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach((link, index) => {
        link.addEventListener("keydown", function (e) {
            switch (e.key) {
                case "ArrowRight":
                case "ArrowDown":
                    e.preventDefault();
                    const nextIndex = (index + 1) % navLinks.length;
                    navLinks[nextIndex].focus();
                    break;
                case "ArrowLeft":
                case "ArrowUp":
                    e.preventDefault();
                    const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
                    navLinks[prevIndex].focus();
                    break;
            }
        });
    });

    const ratingStars = document.querySelectorAll(".rating-star-btn");
    const ratingFeedback = document.getElementById("rating-feedback");
    if (ratingStars.length) {
        ratingStars.forEach((star, index) => {
            star.addEventListener("click", function () {
                const selectedValue = index + 1;
                ratingStars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add("active");
                    } else {
                        s.classList.remove("active");
                    }
                });

                if (ratingFeedback) {
                    ratingFeedback.textContent = `You rated ${selectedValue} of 5 stars. Thank you!`;
                }

                showToast(`Rating submitted: ${selectedValue}/5 stars`);
            });
        });
    }

    const resetFormBtn = document.getElementById("reset-form-btn");
    if (resetFormBtn) {
        resetFormBtn.addEventListener("click", function () {
            document.querySelectorAll("#contact-form input, #contact-form textarea").forEach(input => {
                input.value = "";
            });
            const topicSelect = document.getElementById("topic");
            if (topicSelect) topicSelect.selectedIndex = 0;
            document.querySelectorAll(".error-message").forEach(span => {
                span.textContent = "";
            });
            showToast("Form fields reset");
        });
    }

    function updateDateTime() {
        const $badge = $("#datetime-display");
        if (!$badge.length) return;
        const now = new Date();
        const formatted = now.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
        $badge.text(formatted);
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    if (localStorage.getItem("theme") === "dark") {
        $("body").addClass("dark-mode");
    }

    $("#bg-color-btn").on("click", function () {
        $("body").toggleClass("dark-mode");
        const isDark = $("body").hasClass("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");

        showToast(isDark ? "Dark theme enabled" : "Light theme enabled");
    });

    window.showToast = function (message, type = "success") {
        if (!$("#toast-container").length) {
            $("body").append('<div id="toast-container"></div>');
        }

        const isError = type === "error";
        const $toast = $(`
            <div class="toast ${isError ? "toast-error" : ""}">
                <span>${message}</span>
            </div>
        `);

        $("#toast-container").append($toast);
        $toast.fadeIn(250).delay(2400).fadeOut(350, function () {
            $(this).remove();
        });
    };

    $(window).on("scroll", function () {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        $("#scroll-progress-bar").css("width", scrollPercent + "%");
    });

    function animateCounters() {
        $(".counter-number").each(function () {
            const $this = $(this);
            const target = +$this.data("target");
            const suffix = $this.data("suffix") || "";
            const prefix = $this.data("prefix") || "";

            if ($this.hasClass("animated")) return;

            const rect = this.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                $this.addClass("animated");
                $({ count: 0 }).animate({ count: target }, {
                    duration: 1800,
                    easing: "swing",
                    step: function () {
                        $this.text(prefix + Math.floor(this.count).toLocaleString() + suffix);
                    },
                    complete: function () {
                        $this.text(prefix + target.toLocaleString() + suffix);
                    }
                });
            }
        });
    }

    $(window).on("scroll load", animateCounters);
    animateCounters();

    $(document).on("click", ".copy-btn", function () {
        const $btn = $(this);
        let textToCopy = $btn.siblings(".copy-text").text();
        if (!textToCopy && $btn.data("copy")) {
            textToCopy = $btn.data("copy");
        }
        if (!textToCopy) {
            textToCopy = $btn.closest(".copy-snippet-card").find(".copy-text").text();
        }

        if (!textToCopy) return;

        navigator.clipboard.writeText(textToCopy.trim()).then(function () {
            const originalText = $btn.html();

            $btn.html("Copied!").css("color", "var(--primary)");

            const $tooltip = $btn.siblings(".copy-tooltip");
            if ($tooltip.length) {
                $tooltip.addClass("show");
            }

            showToast("Copied: " + textToCopy.trim(), "success");

            setTimeout(function () {
                $btn.html(originalText).css("color", "");
                if ($tooltip.length) {
                    $tooltip.removeClass("show");
                }
            }, 2000);
        }).catch(function () {
            showToast("Could not copy text", "error");
        });
    });

    function lazyLoadImages() {
        $(".lazy-img[data-src]").each(function () {
            const $img = $(this);
            if (!$img.is(":visible")) return;

            const offset = $img.offset();
            if (!offset) return;

            const imgTop = offset.top;
            const winBottom = $(window).scrollTop() + $(window).height();

            if (winBottom >= imgTop - 80) {
                const dataSrc = $img.attr("data-src");
                if (dataSrc) {
                    $img.attr("src", dataSrc);
                    $img.removeAttr("data-src");
                    $img.addClass("loaded");
                }
            }
        });
    }

    $(window).on("scroll resize load", lazyLoadImages);
    lazyLoadImages();

    const articlesData = [
        {
            id: 1,
            title: "Budgeting 101: Master Your Cash Flow",
            category: "Budgeting",
            readTime: "3 min",
            excerpt: "Learn how the 50/30/20 framework helps you allocate monthly expenses with clarity."
        },
        {
            id: 2,
            title: "Stocks vs Bonds: Where Should You Invest?",
            category: "Investing",
            readTime: "5 min",
            excerpt: "Understand market risk, long-term returns, and diversification principles."
        },
        {
            id: 3,
            title: "Emergency Funds: Your First Safety Net",
            category: "Budgeting",
            readTime: "4 min",
            excerpt: "Why having 3 to 6 months of living expenses protects your peace of mind."
        },
        {
            id: 4,
            title: "Retirement Planning Principles for Beginners",
            category: "Retirement",
            readTime: "4 min",
            excerpt: "Start early to maximize compound interest and build long-term security."
        },
        {
            id: 5,
            title: "Market Risk & Digital Assets Explained",
            category: "Investing",
            readTime: "6 min",
            excerpt: "A beginner guide to volatility, portfolio balance, and smart risk allocation."
        },
        {
            id: 6,
            title: "Building an Excellent Credit Score in College",
            category: "Student Life",
            readTime: "4 min",
            excerpt: "Simple habits that boost your credit score without accumulating high-interest debt."
        },
        {
            id: 7,
            title: "Compound Interest: Long-Term Growth Dynamics",
            category: "Investing",
            readTime: "5 min",
            excerpt: "See how starting to invest in your early twenties accelerates future wealth."
        },
        {
            id: 8,
            title: "Student Loan Repayment Strategies",
            category: "Student Life",
            readTime: "5 min",
            excerpt: "Avalanche vs Snowball method: choose the most effective payoff path."
        }
    ];

    let currentCategory = "All";

    function renderArticles(list, highlightQuery = "") {
        const $container = $("#dynamic-articles-container");
        if (!$container.length) return;

        if (list.length === 0) {
            $container.html(`
                <div class="bento-card" style="grid-column: 1/-1; text-align: center; padding: 2.5rem;">
                    <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 0;">
                        No articles found matching "<strong>${highlightQuery}</strong>". Please try another search term.
                    </p>
                </div>
            `);
            return;
        }

        const html = list.map(art => {
            let titleHtml = art.title;
            let excerptHtml = art.excerpt;

            if (highlightQuery) {
                const escaped = highlightQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                const regex = new RegExp(`(${escaped})`, "gi");
                titleHtml = titleHtml.replace(regex, '<mark class="highlight">$1</mark>');
                excerptHtml = excerptHtml.replace(regex, '<mark class="highlight">$1</mark>');
            }

            return `
                <article class="bento-card article-card">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                            <span class="feature-badge">${art.category}</span>
                            <span style="color: var(--text-muted); font-size: 0.8rem;">${art.readTime}</span>
                        </div>
                        <h3 class="article-title" style="font-size: 1.15rem; margin-bottom: 0.5rem;">${titleHtml}</h3>
                        <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 1.25rem;">${excerptHtml}</p>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 0.85rem;">
                        <span style="font-size: 0.82rem; font-weight: 600; color: var(--primary);">Read Guide &rarr;</span>
                        <button class="btn btn-outline copy-btn" data-copy="${art.title}" type="button" style="padding: 0.35rem 0.65rem; font-size: 0.78rem;">
                            Copy Title
                        </button>
                    </div>
                </article>
            `;
        }).join("");

        $container.html(html);
    }

    renderArticles(articlesData);

    $(".filter-btn").on("click", function () {
        $(".filter-btn").removeClass("active");
        $(this).addClass("active");
        currentCategory = $(this).data("category");

        const searchQuery = $("#blog-search-input").val()?.toLowerCase().trim() || "";
        filterAndDisplayArticles(searchQuery, currentCategory);
        showToast("Category: " + currentCategory);
    });

    function filterAndDisplayArticles(query, category) {
        const filtered = articlesData.filter(art => {
            const matchesCategory = category === "All" || art.category === category;
            const matchesQuery = !query ||
                art.title.toLowerCase().indexOf(query) > -1 ||
                art.category.toLowerCase().indexOf(query) > -1 ||
                art.excerpt.toLowerCase().indexOf(query) > -1;
            return matchesCategory && matchesQuery;
        });

        renderArticles(filtered, query);
    }

    $("#blog-search-input").on("keyup input", function () {
        const query = $(this).val().toLowerCase().trim();
        const $dropdown = $("#autocomplete-results");

        filterAndDisplayArticles(query, currentCategory);

        if (query.length > 0) {
            const matches = articlesData.filter(art =>
                art.title.toLowerCase().indexOf(query) > -1 ||
                art.category.toLowerCase().indexOf(query) > -1
            );

            if (matches.length > 0) {
                const dropHtml = matches.slice(0, 5).map(m => `
                    <div class="autocomplete-item" data-title="${m.title}">
                        <span>${m.title}</span>
                        <span class="autocomplete-badge">${m.category}</span>
                    </div>
                `).join("");
                $dropdown.html(dropHtml).show();
            } else {
                $dropdown.hide();
            }
        } else {
            $dropdown.hide();
        }
    });

    $(document).on("click", ".autocomplete-item", function () {
        const selectedTitle = $(this).data("title");
        $("#blog-search-input").val(selectedTitle);
        $("#autocomplete-results").hide();
        filterAndDisplayArticles(selectedTitle.toLowerCase(), currentCategory);
    });

    $(document).on("click", function (e) {
        if (!$(e.target).closest(".search-box-wrapper").length) {
            $("#autocomplete-results").hide();
        }
    });

    $("#calc-btn").on("click", function () {
        const income = parseFloat($("#monthly-income-input").val());
        if (isNaN(income) || income <= 0) {
            showToast("Please enter a valid monthly income number.", "error");
            $("#monthly-income-input").focus();
            return;
        }

        const budget = FinanceApp.calculateBudget(income);

        $("#calc-needs-val").text("$" + budget.needs.toLocaleString());
        $("#calc-wants-val").text("$" + budget.wants.toLocaleString());
        $("#calc-savings-val").text("$" + budget.savings.toLocaleString());

        const summaryText = `Budget Breakdown ($${income.toLocaleString()}): Needs: $${budget.needs}, Wants: $${budget.wants}, Savings: $${budget.savings}`;
        $("#calc-summary-text").text(summaryText);

        $("#calc-results-box").slideDown(250);
        showToast("Budget breakdown calculated");
    });

    $("#faq-search-input").on("keyup input", function () {
        const query = $(this).val().toLowerCase().trim();

        $(".accordion-item").each(function () {
            const $item = $(this);
            const $header = $item.find(".accordion-header");
            const $body = $item.find(".accordion-content p");
            const originalTitle = $header.data("orig") || $header.text();
            const originalBody = $body.data("orig") || $body.text();

            if (!$header.data("orig")) $header.data("orig", originalTitle);
            if (!$body.data("orig")) $body.data("orig", originalBody);

            if (!query) {
                $header.text(originalTitle);
                $body.text(originalBody);
                $item.show();
                return;
            }

            const matchTitle = originalTitle.toLowerCase().indexOf(query) > -1;
            const matchBody = originalBody.toLowerCase().indexOf(query) > -1;

            if (matchTitle || matchBody) {
                $item.show();
                const escaped = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                const regex = new RegExp(`(${escaped})`, "gi");

                $header.html(originalTitle.replace(regex, '<mark class="highlight">$1</mark>'));
                $body.html(originalBody.replace(regex, '<mark class="highlight">$1</mark>'));

                $header.attr("aria-expanded", "true");
                const $content = $item.find(".accordion-content");
                $content.css({
                    maxHeight: $content[0].scrollHeight + 30 + "px",
                    paddingTop: "10px",
                    paddingBottom: "15px"
                });
            } else {
                $item.hide();
            }
        });
    });

    $(".accordion-header").on("click", function () {
        const $header = $(this);
        const $content = $header.next(".accordion-content");
        const isOpen = $header.attr("aria-expanded") === "true";

        $(".accordion-header").attr("aria-expanded", "false");
        $(".accordion-content").css({ maxHeight: "", paddingTop: "", paddingBottom: "" });

        if (!isOpen) {
            $header.attr("aria-expanded", "true");
            $content.css({
                maxHeight: $content[0].scrollHeight + 30 + "px",
                paddingTop: "10px",
                paddingBottom: "15px"
            });
        }
    });

    $("#popup-form").on("submit", function (e) {
        e.preventDefault();
        const $form = $(this);
        const $email = $("#popup-email");
        const emailVal = $email.val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailVal)) {
            $("#popup-email-error").text("Please enter a valid email address.");
            return;
        }
        $("#popup-email-error").text("");

        const $btn = $form.find('button[type="submit"]');
        const originalText = $btn.html();

        $btn.prop("disabled", true).html('<span class="spinner-border"></span> Please wait...');

        setTimeout(function () {
            $btn.prop("disabled", false).html(originalText);
            showToast("Subscribed successfully!");
            $form[0].reset();
            $("#popup-modal").fadeOut(200);
        }, 1500);
    });

    $("#contact-form").on("submit", function (e) {
        e.preventDefault();
        const $form = $(this);

        $(".error-message").text("");

        let isValid = true;

        const nameVal = $("#name").val()?.trim() || "";
        const emailVal = $("#email").val()?.trim() || "";
        const passwordVal = $("#password").val() || "";
        const confirmVal = $("#confirm-password").val() || "";
        const topicVal = $("#topic").val() || "";
        const messageVal = $("#message").val()?.trim() || "";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameVal) {
            $("#name-error").text("Name is required.");
            isValid = false;
        }

        if (!emailVal || !emailRegex.test(emailVal)) {
            $("#email-error").text("Please provide a valid email address.");
            isValid = false;
        }

        if (passwordVal.length < 6) {
            $("#password-error").text("Password must be at least 6 characters.");
            isValid = false;
        }

        if (passwordVal !== confirmVal) {
            $("#confirm-password-error").text("Passwords do not match.");
            isValid = false;
        }

        if (!topicVal) {
            $("#topic-error").text("Please select a topic.");
            isValid = false;
        }

        if (!messageVal) {
            $("#message-error").text("Please enter your message.");
            isValid = false;
        }

        if (!isValid) {
            showToast("Please fill in all required fields correctly.", "error");
            return;
        }

        const $btn = $form.find('button[type="submit"]');
        const originalText = $btn.html();

        $btn.prop("disabled", true).html('<span class="spinner-border"></span> Please wait...');

        setTimeout(function () {
            $btn.prop("disabled", false).html(originalText);
            showToast("Your message has been sent successfully.");
            $form[0].reset();
        }, 1500);
    });

    $("#contact-form input, #contact-form select, #contact-form textarea").on("input change", function () {
        const fieldId = $(this).attr("id");
        $(`#${fieldId}-error`).text("");
    });

    $("#open-popup-btn").on("click", function () {
        $("#popup-modal").css("display", "flex").hide().fadeIn(200);
        $("#popup-email").focus();
    });

    $("#close-popup-btn, #popup-modal").on("click", function (e) {
        if (e.target === this) {
            $("#popup-modal").fadeOut(200);
        }
    });

    const $slides = $(".custom-carousel .carousel-item");
    let currentSlide = 0;

    function showSlide(index) {
        if (!$slides.length) return;
        $slides.removeClass("active");
        if (index >= $slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = $slides.length - 1;
        else currentSlide = index;

        const $targetSlide = $slides.eq(currentSlide);
        $targetSlide.addClass("active");

        const $img = $targetSlide.find(".lazy-img[data-src]");
        if ($img.length) {
            $img.attr("src", $img.attr("data-src")).removeAttr("data-src").addClass("loaded");
        }
    }

    $(".carousel-control-prev").on("click", function () {
        currentSlide--;
        showSlide(currentSlide);
    });

    $(".carousel-control-next").on("click", function () {
        currentSlide++;
        showSlide(currentSlide);
    });

    if ($slides.length) {
        showSlide(0);
    }
});
