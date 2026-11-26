// DIY Submarine — site behaviour. Plain JavaScript, no external libraries.
(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  // ---------- GitHub repository links ----------
  // On https://<user>.github.io/<repo>/ the repository is https://github.com/<user>/<repo>.
  // Markdown docs are linked to their rendered GitHub page; locally the relative path is kept.
  function repoUrl() {
    const host = location.hostname;
    if (!host.endsWith(".github.io")) {
      return null;
    }
    const user = host.replace(".github.io", "");
    const repo = location.pathname.split("/").filter(Boolean)[0] || host;
    return "https://github.com/" + user + "/" + repo;
  }

  const repo = repoUrl();
  if (repo) {
    $$("a.doc-link").forEach((link) => {
      link.href = repo + "/blob/main/" + link.getAttribute("href");
    });
    const repoLink = $("#repo-link");
    if (repoLink) {
      repoLink.href = repo;
    }
  }

  // ---------- toast ----------
  const toast = $("#toast");
  let toastTimer = null;
  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 2400);
  }

  // ---------- theme ----------
  const themeToggle = $("#theme-toggle");
  const themeText = $("#theme-text");
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeText.textContent = theme === "dark" ? "Light" : "Dark";
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    const meta = $('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#0a1119" : "#ffffff");
    }
  }
  applyTheme(document.documentElement.getAttribute("data-theme") || "dark");
  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("diysub-theme", next);
    } catch (e) {
      // storage unavailable; theme still applies for this visit
    }
  });

  // ---------- share ----------
  $("#share-button").addEventListener("click", async () => {
    const data = { title: document.title, url: location.href };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch (e) {
        // user cancelled
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(location.href);
      showToast("Link copied");
    } catch (e) {
      showToast(location.href);
    }
  });

  // ---------- presentation mode ----------
  const presentationToggle = $("#presentation-toggle");
  presentationToggle.addEventListener("click", () => {
    const on = document.body.classList.toggle("presentation");
    presentationToggle.setAttribute("aria-pressed", String(on));
    showToast(on ? "Presentation mode on" : "Presentation mode off");
  });

  // ---------- mobile menu ----------
  const menuToggle = $("#menu-toggle");
  const nav = $("#main-nav");
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  $$("a", nav).forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // ---------- scroll progress ----------
  const bar = $("#scroll-progress-bar");
  function updateProgress() {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
  }
  addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // ---------- anatomy ----------
  const PARTS = {
    hull: {
      status: "Built",
      name: "Hull — uPVC pipe",
      text: "White uPVC pressure pipe forming a sealed, air-filled body. Its displaced volume sets the buoyancy, so it floats on its own; ballast inside brings it towards neutral. Diameter and length still to be recorded."
    },
    endcap: {
      status: "Built",
      name: "Fixed end cap",
      text: "Permanent uPVC end cap closing one end of the hull. Joint sealed to keep water out."
    },
    access: {
      status: "Built",
      name: "Threaded access cap",
      text: "Grey threaded adapter with a white screw-in plug. Unscrews to reach the inside of the hull for ballast or internal parts, then closes again. Thread seal to be leak-tested under water."
    },
    thruster: {
      status: "Built",
      name: "Thruster pod",
      text: "Small DC motor in a short PVC sleeve, open end packed with sealant, driving a red four-blade propeller. Strapped under the hull in the tank test; reversing polarity reverses thrust. Motor rating to be recorded."
    },
    straps: {
      status: "Built",
      name: "Straps and wire ties",
      text: "Wire ties wrapped around the hull hold the thruster pods and keep the cable tidy along the hull."
    },
    tether: {
      status: "Built",
      name: "Tether cable",
      text: "Carries motor power and switching from the surface, so no battery or electronics need sealing inside the hull. Also a safety line for retrieving the vehicle."
    }
  };

  const anatomy = $("#anatomy");
  if (anatomy) {
    const statusEl = $("#part-status");
    const nameEl = $("#part-name");
    const textEl = $("#part-text");

    function selectPart(id) {
      $$(".a-part", anatomy).forEach((el) => {
        el.classList.toggle("is-selected", el.dataset.part === id);
      });
      anatomy.classList.toggle("dim-others", Boolean(id));
      if (!id) {
        statusEl.textContent = "Select a part";
        nameEl.textContent = "DIY Submarine";
        textEl.textContent = "Tap the hull, either end cap, the thruster pod, the straps or the tether.";
        return;
      }
      const part = PARTS[id];
      statusEl.textContent = part.status;
      nameEl.textContent = part.name;
      textEl.textContent = part.text;
    }

    $$(".a-part", anatomy).forEach((el) => {
      el.addEventListener("click", () => selectPart(el.dataset.part));
      el.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectPart(el.dataset.part);
        }
      });
    });

    $$("[data-toggle]", anatomy).forEach((button) => {
      button.addEventListener("click", () => {
        const on = anatomy.classList.toggle("show-" + button.dataset.toggle);
        button.setAttribute("aria-pressed", String(on));
      });
    });
    $('[data-action="clear"]', anatomy).addEventListener("click", () => selectPart(null));
  }

  // ---------- buoyancy lab ----------
  const G = 9.81;
  const fields = ["d", "l", "m"];

  function linkInputs(key) {
    const range = $("#in-" + key + "-range");
    const number = $("#in-" + key);
    range.addEventListener("input", () => {
      number.value = range.value;
      computeBuoyancy();
    });
    number.addEventListener("input", () => {
      range.value = number.value;
      computeBuoyancy();
    });
  }

  function computeBuoyancy() {
    const diameterM = parseFloat($("#in-d").value) / 1000;
    const lengthM = parseFloat($("#in-l").value) / 1000;
    const massKg = parseFloat($("#in-m").value);
    const rho = parseFloat($("#in-rho").value);
    if (!(diameterM > 0 && lengthM > 0 && massKg > 0)) {
      return;
    }
    const volume = Math.PI * diameterM * diameterM * lengthM / 4;
    const buoyancyN = rho * G * volume;
    const weightN = massKg * G;
    const ballastKg = rho * volume - massKg;

    $("#out-v").textContent = (volume * 1000).toFixed(2) + " L";
    $("#out-fb").textContent = buoyancyN.toFixed(1) + " N";
    $("#out-w").textContent = weightN.toFixed(1) + " N";
    $("#out-ballast").textContent = ballastKg > 0 ? ballastKg.toFixed(2) + " kg" : "none";

    const verdict = $("#out-verdict");
    const ratio = weightN / buoyancyN;
    verdict.classList.remove("floats", "sinks", "neutral");
    if (Math.abs(ratio - 1) <= 0.02) {
      verdict.classList.add("neutral");
      verdict.textContent = "≈ Neutral: within 2 % of neutral buoyancy — fine-trim in the tank.";
    } else if (ratio < 1) {
      verdict.classList.add("floats");
      const floatPct = (1 - ratio) * 100;
      verdict.textContent = "Floats: weight is " + (ratio * 100).toFixed(0) + " % of full-submersion buoyancy. Add about " + ballastKg.toFixed(2) + " kg low and centred to approach neutral.";
      if (floatPct > 50) {
        verdict.textContent += " (Like tank test 01: top of the hull rides above the water.)";
      }
    } else {
      verdict.classList.add("sinks");
      verdict.textContent = "Sinks: weight exceeds buoyancy by " + (weightN - buoyancyN).toFixed(1) + " N — remove ballast or add flotation.";
    }
    $("#gauge-fill").style.width = Math.min(ratio, 1.5) / 1.5 * 100 + "%";
    $("#gauge-mark").style.left = 100 / 1.5 + "%";
  }

  if ($("#in-d")) {
    fields.forEach(linkInputs);
    $("#in-rho").addEventListener("change", computeBuoyancy);
    computeBuoyancy();
  }

  // ---------- gallery + lightbox ----------
  const gallery = window.GALLERY || [];
  const categories = window.GALLERY_CATEGORIES || [];
  const byId = Object.fromEntries(gallery.map((item) => [item.id, item]));

  const dialog = $("#photo-dialog");
  const dialogImage = $("#dialog-image");
  const dialogWrap = $("#dialog-image-wrap");
  const zoomButton = $("#dialog-zoom");

  function openPhoto(id) {
    const item = byId[id];
    if (!item) {
      return;
    }
    dialogImage.src = item.full;
    dialogImage.alt = item.title;
    $("#dialog-title").textContent = item.title;
    $("#dialog-kind").textContent = item.kind;
    $("#dialog-description").textContent = item.caption;
    dialogWrap.classList.remove("is-zoomed");
    zoomButton.setAttribute("aria-pressed", "false");
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      window.open(item.full, "_blank");
    }
  }

  zoomButton.addEventListener("click", () => {
    const on = dialogWrap.classList.toggle("is-zoomed");
    zoomButton.setAttribute("aria-pressed", String(on));
  });
  $("#dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-open]");
    if (trigger) {
      openPhoto(trigger.dataset.open);
    }
  });

  const grid = $("#gallery-grid");
  const filterBox = $("#gallery-filters");
  const countEl = $("#gallery-count");

  function renderGallery(filter) {
    const items = gallery.filter((item) => filter === "all" || item.category === filter);
    grid.innerHTML = "";
    items.forEach((item) => {
      const fig = document.createElement("figure");
      fig.className = "gallery-item";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "image-button";
      button.dataset.open = item.id;
      button.setAttribute("aria-label", "Open " + item.title);
      const img = document.createElement("img");
      img.src = item.thumb;
      img.alt = item.caption;
      img.loading = "lazy";
      button.appendChild(img);
      const caption = document.createElement("figcaption");
      const kind = document.createElement("small");
      kind.textContent = item.kind;
      caption.appendChild(kind);
      caption.appendChild(document.createTextNode(item.title));
      fig.appendChild(button);
      fig.appendChild(caption);
      grid.appendChild(fig);
    });
    countEl.textContent = items.length + " of " + gallery.length + " images";
  }

  if (grid) {
    [{ id: "all", label: "All" }].concat(categories).forEach((cat, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "gallery-filter" + (index === 0 ? " is-active" : "");
      button.dataset.filter = cat.id;
      button.textContent = cat.label;
      button.setAttribute("aria-pressed", String(index === 0));
      button.addEventListener("click", () => {
        $$(".gallery-filter", filterBox).forEach((b) => {
          b.classList.toggle("is-active", b === button);
          b.setAttribute("aria-pressed", String(b === button));
        });
        renderGallery(cat.id);
      });
      filterBox.appendChild(button);
    });
    renderGallery("all");
  }
})();
