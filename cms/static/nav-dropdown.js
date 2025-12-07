// rework/static/nav-dropdown.js
// Generic dropdown script for navigation\
(function () {
  document.querySelectorAll(".nav-dropdown-parent").forEach(function (parent) {
    const trigger = parent.querySelector("button");
    const dropdown = parent.querySelector('div[id$="dropdown"]');
    const chevron = parent.querySelector('svg[id$="chevron"]');
    let open = false;

    function showDropdown() {
      dropdown.classList.remove("hidden");
      if (chevron) chevron.classList.add("rotate-180");
      trigger.setAttribute("aria-expanded", "true");
      open = true;
    }

    function hideDropdown() {
      dropdown.classList.add("hidden");
      if (chevron) chevron.classList.remove("rotate-180");
      trigger.setAttribute("aria-expanded", "false");
      open = false;
    }

    // Hover events
    // trigger.addEventListener('mouseenter', showDropdown);
    // parent.addEventListener('mouseleave', hideDropdown);

    // Click event - toggle dropdown
    trigger.addEventListener("click", function (_) {
      //e.stopPropagation(); // Prevent event bubbling
      if (open) {
        hideDropdown();
      } else {
        showDropdown();
      }
    });

    // Close dropdown on click outside
    window.addEventListener("click", function (e) {
      if (!parent.contains(e.target)) {
        hideDropdown();
      }
    });

    // Keyboard support
    trigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (open) {
          hideDropdown();
        } else {
          showDropdown();
        }
      } else if (e.key === "Escape") {
        hideDropdown();
      }
    });
  });
})();
