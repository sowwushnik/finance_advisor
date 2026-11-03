# Finance Advising - Web Development Project

## Team Members & Responsibilities
* **Meirkhan Kulantayev** (Pages: `blog.html`, `contact.html`, Dynamic Article Filtering, Lazy Loading Grid, Form Validation, Reset Action & Submit Spinner)
* **Nurzhan Zeinulla** (Pages: `index.html`, `about.html`, Scroll Progress Bar, Animated Number Counters, 50/30/20 Budget Calculator, Rating Component, Toast Notifications)

---

## Project Overview
A responsive and interactive educational web platform designed to help university students build sound personal finance habits, covering budgeting, index investing, emergency funds, and student debt management.

---

## Technical Features & Implementation

### DOM Manipulation & Advanced JavaScript Structure
* **Application Object**: Centralized `FinanceApp` namespace object with modular methods (`getGreetingByTime`, `calculateBudget`).
* **Switch Statements**:
  * Time-of-day greeting evaluation (`morning`, `afternoon`, `evening`, `night`).
  * Keyboard arrow navigation mapping (`ArrowRight`, `ArrowLeft`, `ArrowUp`, `ArrowDown`).
* **Keyboard Event Handling**:
  * Navigation links support full arrow-key traversal (`keydown`), shifting focus across menu items.
* **Interactive Rating Component**:
  * User rating widget with star buttons that update selection state and inline feedback via `querySelectorAll` and class toggling.
* **Form Reset Action**:
  * Form reset button clearing input fields and error messages dynamically via `querySelectorAll`.
* **Sound Effects**:
  * Synthesized Web Audio API click tone triggered on button and navigation clicks.

### Search & Filtering
* **Real-time Search & Live Filter**:
  * Live search on `blog.html` filtering articles by keyword, category, and excerpt as the user types using `.filter()` and `.on('keyup input')`.
  * Keyword filter on `index.html` for frequently asked questions.
* **Autocomplete Search Suggestions**:
  * Dropdown menu (`#autocomplete-results`) rendering suggested article titles as the user types.
* **Search Highlighting**:
  * Regex replacement highlighting matching query terms with `<mark class="highlight">` in article titles, excerpts, and FAQ questions.

### UX Engagement Elements
* **Scroll Progress Bar**:
  * Clean green horizontal progress bar (`#scroll-progress-bar`) dynamically tracking vertical scroll percentage.
* **Animated Number Counter**:
  * Smooth count-up numbers using jQuery `$({ count: 0 }).animate({ count: target }, ...)` triggering when scrolled into view.
* **Loading Spinner on Submit**:
  * Submit buttons display a spinner and `"Please wait..."` text, disabling during simulated server requests.

### Web Application Functionality
* **Notification System (Toast Notifications)**:
  * Non-blocking temporary toast notifications (`showToast(message, type)`) with smooth `.fadeIn()` and `.fadeOut()` confirming user interactions.
* **Copied to Clipboard Button**:
  * "Copy" buttons next to text snippets (promo code, budget plan, formulas, contact emails) updating to `"Copied!"` with an inline tooltip bubble.
* **Image Lazy Loading**:
  * High-resolution gallery images utilize `data-src` and `.lazy-img`, loading dynamically as they enter the viewport via `scroll()`, `.offset().top`, and `$(window).scrollTop()`.
* **Interactive 50/30/20 Budget Calculator**:
  * Generates instant allocations for Needs (50%), Wants (30%), and Savings (20%) with a copyable plan summary.
* **Dark / Light Theme Switcher**:
  * Persisted via `localStorage` with green accents and calm contrast across both modes.

---

## Deployment & Repository
* **Live Website URL**: https://sowwushnik.github.io/finance_advisor/
* **Technologies Used**: HTML5, CSS3, JavaScript (ES6), jQuery 3.7.1
