// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }),
  )
}

// Smooth scrolling for navigation links (for anchor links)
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

// Form submission handler
const contactForm = document.querySelector(".contact-form form")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Simple validation
    const name = this.querySelector('input[type="text"]').value
    const email = this.querySelector('input[type="email"]').value
    const phone = this.querySelector('input[type="tel"]').value
    const route = this.querySelector("select").value
    const date = this.querySelector('input[type="date"]').value

    if (!name || !email || !phone || !route || !date) {
      alert("Mohon lengkapi semua field yang wajib diisi.")
      return
    }

    // Simulate form submission
    alert("Terima kasih! Pesan Anda telah dikirim. Tim kami akan segera menghubungi Anda.")
    this.reset()
  })
}

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.backdropFilter = "blur(10px)"
    } else {
      header.style.background = "#fff"
      header.style.backdropFilter = "none"
    }
  }
})

// Set active navigation link based on current page
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active")
    }
  })
})

// Carousel functionality
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const dots = document.querySelectorAll(".dot")

  if (!track || !prevBtn || !nextBtn) return

  let currentSlide = 0
  const totalSlides = 8
  let slideWidth = 720 // Updated to match new card width (700px + 20px gap)

  // Auto-play functionality
  let autoPlayInterval

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      nextSlide()
    }, 4000) // Slightly slower for larger images
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval)
  }

  function updateCarousel() {
    const translateX = -currentSlide * slideWidth
    track.style.transform = `translateX(${translateX}px)`

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide)
    })
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides
    updateCarousel()
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
    updateCarousel()
  }

  // Event listeners
  nextBtn.addEventListener("click", () => {
    stopAutoPlay()
    nextSlide()
    startAutoPlay()
  })

  prevBtn.addEventListener("click", () => {
    stopAutoPlay()
    prevSlide()
    startAutoPlay()
  })

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoPlay()
      currentSlide = index
      updateCarousel()
      startAutoPlay()
    })
  })

  // Touch/swipe support for mobile
  let startX = 0
  let isDragging = false

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX
    isDragging = true
    stopAutoPlay()
  })

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return
    e.preventDefault()
  })

  track.addEventListener("touchend", (e) => {
    if (!isDragging) return

    const endX = e.changedTouches[0].clientX
    const diffX = startX - endX

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }

    isDragging = false
    startAutoPlay()
  })

  // Mouse drag support for desktop
  let mouseStartX = 0
  let isMouseDragging = false

  track.addEventListener("mousedown", (e) => {
    mouseStartX = e.clientX
    isMouseDragging = true
    stopAutoPlay()
    track.style.cursor = "grabbing"
  })

  track.addEventListener("mousemove", (e) => {
    if (!isMouseDragging) return
    e.preventDefault()
  })

  track.addEventListener("mouseup", (e) => {
    if (!isMouseDragging) return

    const endX = e.clientX
    const diffX = mouseStartX - endX

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }

    isMouseDragging = false
    track.style.cursor = "grab"
    startAutoPlay()
  })

  track.addEventListener("mouseleave", () => {
    if (isMouseDragging) {
      isMouseDragging = false
      track.style.cursor = "grab"
      startAutoPlay()
    }
  })

  // Pause auto-play on hover
  track.addEventListener("mouseenter", stopAutoPlay)
  track.addEventListener("mouseleave", startAutoPlay)

  // Initialize
  track.style.cursor = "grab"
  startAutoPlay()
  updateCarousel()

  // Responsive adjustments for slideWidth
  function adjustSlideWidth() {
    if (window.innerWidth <= 480) {
      slideWidth = 370 // For small mobile (350px + 20px gap)
    } else if (window.innerWidth <= 768) {
      slideWidth = 520 // For mobile (500px + 20px gap)
    } else {
      slideWidth = 720 // Default for larger screens (700px + 20px gap)
    }
    updateCarousel()
  }

  // Call adjustSlideWidth on load and resize
  adjustSlideWidth()
  window.addEventListener("resize", adjustSlideWidth)
})

// Bus Promo Card functionality
document.addEventListener("DOMContentLoaded", () => {
  const busPromoCard = document.querySelector(".bus-promo-card")

  if (busPromoCard) {
    // Add smooth hover effects
    busPromoCard.addEventListener("mouseenter", () => {
      busPromoCard.style.transform = "translateY(-3px)"
      busPromoCard.style.transition = "all 0.3s ease"
    })

    busPromoCard.addEventListener("mouseleave", () => {
      busPromoCard.style.transform = "translateY(0)"
    })

    // Add click handler for future booking functionality
    busPromoCard.addEventListener("click", () => {
      console.log("Bus promo card clicked - siap untuk fungsi booking!")
      // Bisa ditambahkan modal atau redirect ke halaman booking
      // window.location.href = "/booking.html"
    })

    // Lazy loading untuk performa yang lebih baik
    const busPromoImage = busPromoCard.querySelector(".bus-promo-image")
    if (busPromoImage && "IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.style.opacity = "0"
            img.style.transition = "opacity 0.5s ease"

            // Add loading effect
            setTimeout(() => {
              img.style.opacity = "1"
            }, 100)

            observer.unobserve(img)
          }
        })
      })

      imageObserver.observe(busPromoImage)
    }

    // Touch support for mobile
    let touchStartY = 0
    let touchEndY = 0

    busPromoCard.addEventListener("touchstart", (e) => {
      touchStartY = e.changedTouches[0].screenY
    })

    busPromoCard.addEventListener("touchend", (e) => {
      touchEndY = e.changedTouches[0].screenY

      // Simple tap detection (no significant vertical movement)
      if (Math.abs(touchEndY - touchStartY) < 10) {
        console.log("Bus promo card tapped on mobile!")
        // Add haptic feedback if supported
        if (navigator.vibrate) {
          navigator.vibrate(50)
        }
      }
    })

    // Add loading state
    const busPromoImage2 = busPromoCard.querySelector(".bus-promo-image")
    if (busPromoImage2) {
      busPromoImage2.addEventListener("load", () => {
        busPromoCard.classList.add("loaded")
      })

      busPromoImage2.addEventListener("error", () => {
        console.log("Failed to load bus promo image")
        // Add fallback or retry logic here
      })
    }
  }
})

// Additional utility functions for bus promo
function showBusPromoModal() {
  // Function to show booking modal
  console.log("Showing bus promo modal...")
  // Implementation for modal popup
}

function redirectToBooking() {
  // Function to redirect to booking page
  window.location.href = "/booking.html"
}

// Scroll animations for better UX
window.addEventListener("scroll", () => {
  const busPromoSection = document.querySelector(".bus-promo-section")

  if (busPromoSection) {
    const rect = busPromoSection.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0

    if (isVisible) {
      busPromoSection.classList.add("in-view")
    }
  }
})

// Performance optimization
document.addEventListener("DOMContentLoaded", () => {
  // Preload critical images
  const criticalImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ua0UVAOWQNsg6LjQlw6RXizrNksCrN.png",
  ]

  criticalImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })

  // Add loading states
  const allImages = document.querySelectorAll("img")
  allImages.forEach((img) => {
    if (!img.complete) {
      img.style.opacity = "0"
      img.addEventListener("load", () => {
        img.style.transition = "opacity 0.3s ease"
        img.style.opacity = "1"
      })
    }
  })
})

// Error handling
window.addEventListener("error", (e) => {
  console.log("JavaScript error:", e.error)
  // Add error reporting here if needed
})

// Resize handler for responsive adjustments
window.addEventListener("resize", () => {
  // Debounce resize events
  clearTimeout(window.resizeTimeout)
  window.resizeTimeout = setTimeout(() => {
    // Recalculate layouts if needed
    const busPromoCard = document.querySelector(".bus-promo-card")
    if (busPromoCard) {
      // Force reflow for proper sizing
      busPromoCard.style.display = "none"
      busPromoCard.offsetHeight // Trigger reflow
      busPromoCard.style.display = ""
    }
  }, 250)
})
