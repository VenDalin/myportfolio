// Projects page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      button.classList.add("active")

      const filterValue = button.getAttribute("data-filter")

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category")

        if (filterValue === "all" || cardCategory === filterValue) {
          card.classList.remove("hidden")
          card.style.display = "block"
        } else {
          card.classList.add("hidden")
          setTimeout(() => {
            if (card.classList.contains("hidden")) {
              card.style.display = "none"
            }
          }, 300)
        }
      })
    })
  })

  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe project cards
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
    observer.observe(card)
  })

  // Add hover effects for project cards
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })

  // Smooth scroll for project links
  document.querySelectorAll(".project-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      // Add your project link functionality here
      console.log("Project link clicked:", link.textContent)
    })
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Animate page title
  const pageTitle = document.querySelector(".page-title")
  if (pageTitle) {
    pageTitle.classList.add("fade-in")
  }

  // Animate page subtitle
  const pageSubtitle = document.querySelector(".page-subtitle")
  if (pageSubtitle) {
    pageSubtitle.classList.add("fade-in-delay")
  }
})

