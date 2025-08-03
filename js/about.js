// About page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Animate skill ratings
  const skillItems = document.querySelectorAll(".skill-item")

  const animateStars = (skillItem) => {
    const stars = skillItem.querySelectorAll(".star.filled")
    stars.forEach((star, index) => {
      setTimeout(() => {
        star.style.transform = "scale(1.2)"
        star.style.color = "#fbbf24"
        setTimeout(() => {
          star.style.transform = "scale(1)"
        }, 200)
      }, index * 100)
    })
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")

        // Animate stars when skill item comes into view
        if (entry.target.classList.contains("skill-item")) {
          setTimeout(() => animateStars(entry.target), 300)
        }

        // Animate timeline items
        if (entry.target.classList.contains("timeline-item")) {
          entry.target.style.transform = "translateX(0)"
          entry.target.style.opacity = "1"
        }
      }
    })
  }, observerOptions)

  // Observe elements
  skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`
    observer.observe(item)
  })

  // Timeline animation
  const timelineItems = document.querySelectorAll(".timeline-item")
  timelineItems.forEach((item, index) => {
    item.style.transform = "translateX(-30px)"
    item.style.opacity = "0"
    item.style.transition = "all 0.6s ease"
    item.style.transitionDelay = `${index * 0.2}s`
    observer.observe(item)
  })

  // Interest items hover effects
  const interestItems = document.querySelectorAll(".interest-item")
  interestItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const icon = item.querySelector(".interest-icon")
      icon.style.transform = "scale(1.2) rotate(10deg)"
      icon.style.transition = "transform 0.3s ease"
    })

    item.addEventListener("mouseleave", () => {
      const icon = item.querySelector(".interest-icon")
      icon.style.transform = "scale(1) rotate(0deg)"
    })
  })

  // Location pin animation
  const locationPin = document.querySelector(".location-pin")
  if (locationPin) {
    setInterval(() => {
      locationPin.style.transform = "translate(-50%, -50%) scale(1.1)"
      setTimeout(() => {
        locationPin.style.transform = "translate(-50%, -50%) scale(1)"
      }, 200)
    }, 3000)
  }

  // Parallax effect for world map
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const mapImage = document.querySelector(".map-image")
    if (mapImage) {
      const rate = scrolled * -0.1
      mapImage.style.transform = `translateY(${rate}px)`
    }
  })

  // Add typing effect to quote
  const quote = document.querySelector(".about-quote blockquote")
  if (quote) {
    const text = quote.textContent
    quote.textContent = ""
    let i = 0

    const typeWriter = () => {
      if (i < text.length) {
        quote.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 30)
      }
    }

    // Start typing effect when quote comes into view
    const quoteObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(typeWriter, 500)
            quoteObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    quoteObserver.observe(quote)
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Animate page elements
  const pageTitle = document.querySelector(".page-title")
  if (pageTitle) {
    pageTitle.classList.add("fade-in")
  }

  const aboutQuote = document.querySelector(".about-quote")
  if (aboutQuote) {
    aboutQuote.classList.add("fade-in-delay")
  }
})

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

