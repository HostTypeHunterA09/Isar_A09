(() => {
  "use strict";

  // DOM elements
  const pwView = document.getElementById("passwordView");
  const galleryView = document.getElementById("galleryView");
  const pwInput = document.getElementById("passwordInput");
  const enterBtn = document.getElementById("enterBtn");
  const pwError = document.getElementById("pwError");
  const userIdSpan = document.getElementById("userId");
  const photoGrid = document.getElementById("photoGrid");
  const tabs = document.querySelectorAll(".tabs .tab");
  const searchInput = document.getElementById("searchInput");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalNotes = document.getElementById("modalNotes");
  const saveNoteBtn = document.getElementById("saveNote");
  const closeModalBtn = document.getElementById("closeModal");
  const modalPrevBtn = document.getElementById("modalPrev");
  const modalNextBtn = document.getElementById("modalNext");
  const toast = document.getElementById("toast");

  // Password (set your password here)
  const PASSWORD = "Isar_A09";

  // Track current filter & search
  let activeCategory = "all";
  let searchTerm = "";

  // For modal
  let currentIndex = null;

  // Select all photo cards in the grid
  const photoCards = Array.from(photoGrid.querySelectorAll(".photo-card"));

  // Password check
  enterBtn.addEventListener("click", () => {
    const enteredPw = pwInput.value.trim();
    if (enteredPw === PASSWORD) {
      pwError.style.display = "none";
      pwView.style.display = "none";
      galleryView.style.display = "block";
      userIdSpan.textContent = "BHAIRAVA_A09"; // example user ID
      pwInput.value = "";
      filterAndSearch();
    } else {
      pwError.style.display = "block";
      pwInput.focus();
    }
  });

  pwInput.addEventListener("keydown", e => {
    if (e.key === "Enter") enterBtn.click();
  });

  // Filter function
  function filterAndSearch() {
    const term = searchTerm.toLowerCase();

    photoCards.forEach(card => {
      const cat = card.dataset.category;
      const tags = card.dataset.tags.toLowerCase();
      const title = card.dataset.title.toLowerCase();

      // Check category
      const categoryMatch = activeCategory === "all" || cat === activeCategory;

      // Check search term in title or tags
      const searchMatch = term === "" || title.includes(term) || tags.includes(term);

      if (categoryMatch && searchMatch) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Tabs click handler
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeCategory = tab.dataset.category;
      filterAndSearch();
    });
  });

  // Search input handler
  searchInput.addEventListener("input", e => {
    searchTerm = e.target.value.trim();
    filterAndSearch();
  });

  // Modal open/close logic
  function openModal(index) {
    currentIndex = index;
    const card = photoCards[currentIndex];
    if (!card) return;

    modalImg.src = card.querySelector("img").src;
    modalImg.alt = card.dataset.title;
    modalTitle.textContent = card.dataset.title;
    modalCategory.textContent = card.dataset.category.charAt(0).toUpperCase() + card.dataset.category.slice(1);
    modalNotes.value = localStorage.getItem(card.dataset.id) || "";

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    modalNotes.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  // Save notes to localStorage
  saveNoteBtn.addEventListener("click", () => {
    if (currentIndex === null) return;
    const card = photoCards[currentIndex];
    localStorage.setItem(card.dataset.id, modalNotes.value);
    showToast("Note saved successfully!");
  });

  // Show toast message
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2300);
  }

  closeModalBtn.addEventListener("click", closeModal);

  // Prev/Next modal navigation
  modalPrevBtn.addEventListener("click", () => {
    if (currentIndex === null) return;
    do {
      currentIndex = (currentIndex - 1 + photoCards.length) % photoCards.length;
    } while(photoCards[currentIndex].style.display === "none");
    openModal(currentIndex);
  });

  modalNextBtn.addEventListener("click", () => {
    if (currentIndex === null) return;
    do {
      currentIndex = (currentIndex + 1) % photoCards.length;
    } while(photoCards[currentIndex].style.display === "none");
    openModal(currentIndex);
  });

  // Close modal on overlay click (optional)
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  // Keyboard navigation
  window.addEventListener("keydown", e => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "ArrowLeft") modalPrevBtn.click();
    if (e.key === "ArrowRight") modalNextBtn.click();
    if (e.key === "Escape") closeModal();
  });

  // Open modal when clicking note button or photo card
  photoCards.forEach((card, idx) => {
    card.querySelector(".note-btn").addEventListener("click", e => {
      e.stopPropagation();
      openModal(idx);
    });
    card.addEventListener("click", () => openModal(idx));
  });

})();
