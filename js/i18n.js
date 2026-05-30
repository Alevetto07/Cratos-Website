(function () {
  const STORAGE_KEY = "cratos-lang";
  const store = new Map();

  const EN = {
    "meta.description":
      "Team Cratos — ESERO CanSat Italy. Pressure and temperature telemetry, VLF mission with four custom PCBs.",
    "page.title": "Cratos — CanSat ESERO",
    "skip": "Skip to content",
    "brand.aria": "Cratos — overview",
    "nav.aria": "Sections",
    "nav.overview": "Overview",
    "nav.primary": "Primary",
    "nav.secondary": "Secondary",
    "nav.structure": "Structure",
    "nav.power": "Power",
    "nav.pcb": "PCB",
    "nav.components": "Components",
    "nav.data": "Data",
    "nav.flight": "Flight",
    "nav.team": "Team",
    "nav.cdr": "CDR",
    "meta.team": "Team Cratos",
    "meta.school": "Liceo Scientifico Enrico Fermi · Padova",
    "meta.form": "Soda-can form factor 66 × 115 mm",
    "intro.body":
      'Documentation for a soda-can satellite: primary mission (atmospheric telemetry) and secondary mission (VLF spectroscopy), four custom circular PCBs, deployable solenoid antenna, and swappable CR5 battery packs from the base. Rules: <a href="https://www.esero.it/cansat/">esero.it/cansat</a>.',
    "primary.title": "Primary mission",
    "primary.p1":
      "Competition requirement: measure <strong>pressure</strong> and <strong>temperature</strong> of the air and transmit to the ground station at least <strong>1 sample per second</strong>.",
    "primary.h3chain": "Data path",
    "primary.chain":
      "<strong>Integrated sensor</strong> → <strong>Arduino Nano 33 BLE</strong> → <strong>APC220</strong> → <strong>Ground receiver</strong> → GNU Octave",
    "primary.li1": "Single MCU with onboard BMP — less wiring and volume",
    "primary.li2": "APC220 radio downlink to the team ground station",
    "primary.li3": "Firmware: sampling, framing, periodic transmit ≥ 1 Hz",
    "primary.dt1": "MCU / sensors",
    "primary.dd1": "Arduino Nano 33 BLE",
    "primary.dt2": "Telemetry",
    "primary.dd2": "APC220 radio module",
    "primary.dt3": "Constraint",
    "primary.dd3": "≥ 1 Hz for P and T until payload recovery",
    "primary.toggle": "Hardware images — primary mission",
    "secondary.title": "Secondary mission",
    "secondary.p1":
      "Acquisition of ambient EM signals in <strong>10 kHz – 100 kHz</strong> (below antenna resonance ~120 kHz). Target: phenomena such as <em>whistlers</em>. Weak signal → analog chain on 4 PCBs → Teensy 4.1 ADC → microSD → GNU Octave.",
    "secondary.h3chain": "Signal path",
    "secondary.chain":
      "<strong>Deployed coil</strong> → <strong>PCB1</strong> → <strong>PCB2</strong> → <strong>PCB3</strong> → protection → <strong>Teensy ADC</strong> → <strong>microSD</strong>",
    "secondary.h3ant": "Antenna",
    "secondary.li1": "Solenoid: <strong>200 m</strong> AWG30, <strong>100 turns</strong>",
    "secondary.li2": "Lower bay; in-flight deploy by servo at target altitude",
    "secondary.li3": "Binary SD logging for throughput and time integrity",
    "secondary.dt1": "Acquisition",
    "secondary.dd1": "Teensy 4.1",
    "secondary.dt2": "Storage",
    "secondary.dd2": "3.3 V microSD module + Kingston 32 GB",
    "secondary.dt3": "Deploy",
    "secondary.dd3": "Servo · antenna mechanism",
    "secondary.toggle": "Hardware images — secondary mission",
    "structure.title": "Structure & CAD",
    "structure.p1":
      "Mechanical design in Fusion 360: 3D-printed structure with a mix of <strong>PLA</strong> and <strong>PETG</strong>. Upper bay (parachute / eyelet), central PCB stack, base for power and antenna deploy. Section shows four PCBs, dual battery packs, and upper mechanism.",
    "structure.toggle": "CAD renders & section",
    "power.title": "Power · swappable batteries",
    "power.p1":
      "Rules require easily replaceable batteries without disassembling the full satellite. Cratos uses <strong>CR5</strong> cells — no LiPo per competition constraints; good capacity/volume trade-off.",
    "power.h3pos": "Placement",
    "power.p2":
      "Two symmetric <strong>battery modules</strong> in the base (cell pairs per module), lateral to the PCB stack in section view, separate from the central electronics volume.",
    "power.h3swap": "Swap from bottom",
    "power.li1":
      "<strong>Open base</strong> — left/right inserts removable without opening the upper shell",
    "power.li2":
      "<strong>Closed base</strong> — pre-flight config with master switch, USB and LEDs; cells replaced by extracting inserts from below",
    "power.li3":
      "Procedure: master off → remove inserts → replace CR5 → re-seat → voltage check",
    "power.toggle": "CAD views — batteries and base",
    "power.p3":
      "<strong>PCB4</strong> distributes rails to subsystems; master switches on the base (ESERO requirement).",
    "pcb.title": "PCB architecture (×4)",
    "pcb.p1":
      "Circular boards for can diameter. VLF signal flow: PCB1 → PCB2 → PCB3; power on dedicated PCB4.",
    "pcb.toggle1": "PCB stack overview",
    "pcb.toggle2": "PCB1 — pre-amplification & high-pass",
    "pcb.p2": "First stage: initial gain and 2nd-order high-pass below 10 kHz. Antenna connector on silkscreen.",
    "pcb.toggle3": "PCB2 — integration & low-pass",
    "pcb.p3": "Integrator (×10) and 5th-order low-pass to 100 kHz — anti-aliasing before ADC.",
    "pcb.toggle4": "PCB3 — dual ×5 amplification",
    "pcb.p4": "Two cascaded stages, 5× each (25× toward the converter).",
    "pcb.toggle5": "PCB4 — power distribution",
    "pcb.p5":
      "DC rails for analog chain, Teensy, Arduino and peripherals. TEL5-1211 module; master switch on the base.",
    "pcb.placeholder":
      "<strong>Coming soon:</strong> bench characterization, efficiency curves and integration notes for PCB4.",
    "components.title": "Component map",
    "components.toggle": "Full component table",
    "components.th1": "Role",
    "components.th2": "Component",
    "components.th3": "Mission",
    "components.m1": "Primary",
    "components.m2": "Secondary",
    "components.m3": "Both",
    "components.r1": "MCU + BMP",
    "components.r2": "Radio",
    "components.r3": "MCU + ADC",
    "components.r4": "Storage",
    "components.r5": "Deploy",
    "components.r6": "Antenna",
    "components.r7": "Conditioning",
    "components.r8": "Power",
    "components.r9": "Safety",
    "lab.title": "Lab validation",
    "lab.p1":
      "VLF chain tested with function generator, oscilloscope and GNU Octave FFT analysis.",
    "lab.toggle": "Plots — spectrogram & PSD",
    "flight.title": "Flight results",
    "flight.p1":
      "Post-flight analysis from ground telemetry (<code>LOG-Telemetry.csv</code>, ~2 Hz). The CanSat was hoisted on a rope by a quadcopter to ~60 m, then descended near the launch pad. Altitude from barometry; horizontal motion from IMU dead reckoning (rope swing).",
    "flight.h3summary": "Flight summary",
    "flight.stat.samples": "Samples",
    "flight.stat.duration": "Duration",
    "flight.stat.apogee": "Apogee (pressure)",
    "flight.stat.landing": "Landing offset",
    "flight.stat.rmse": "Velocity fusion RMSE",
    "flight.h3trajectory": "3D trajectory",
    "flight.p2":
      "Interactive model: pressure altitude on Z; X/Y from filtered horizontal IMU (dead reckoning). Animated CanSat cylinder along the path.",
    "flight.iframeTitle": "3D flight trajectory — dead reckoning",
    "flight.h3video": "Telemetry recording",
    "flight.p3": "Screen recording of the live telemetry feed during the flight.",
    "flight.toggle": "Additional charts",
    "flight.chart1": "02 — Vertical velocity (baro vs IMU)",
    "flight.chart2": "03 — Vertical acceleration",
    "flight.chart3": "04 — Pressure vs time",
    "flight.chart4": "05 — Raw IMU (accel & gyro)",
    "flight.report":
      'Full methodology, maths and conclusions: <a href="assets/flight/REPORT.md">REPORT.md</a>',
    "team.title": "Team",
    "team.p1":
      "Team Cratos — Liceo Scientifico Enrico Fermi, Padova. ESERO Italy CanSat competition.",
    "team.h3students": "Students",
    "team.role.alessio": "CAD & design · Website",
    "team.role.alvise": "Data collection & analysis",
    "team.role.matteo": "Project manager · Secondary mission",
    "team.role.filippo": "Communications & media · Power",
    "team.role.vittorio": "Primary mission · Communications & media",
    "team.h3teachers": "Supervising teachers",
    "team.h3thanks": "Special thanks",
    "team.role.selmo": "Technical support — antenna & VLF chain",
    "team.role.magarotto": "Technical support — hardware test & validation",
    "team.role.labtrek": "Component supply",
    "team.role.robotstore": "Component supply",
    "cdr.title": "Documentation",
    "cdr.p1":
      "Team Cratos Critical Design Review: architecture, tests, regulatory compliance and budget.",
    "cdr.link": "Download TeamCratos_CriticalDesignReview.pdf",
  };

  const ATTR = {
    aria: "data-i18n-aria",
    title: "data-i18n-title",
    meta: "data-i18n-meta",
  };

  function captureItalian() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && !store.has(key)) store.set(key, el.innerHTML);
    });
    const meta = document.querySelector("meta[data-i18n-meta]");
    if (meta) store.set("meta.description", meta.getAttribute("content"));
    document.querySelectorAll(`[${ATTR.aria}]`).forEach((el) => {
      const key = el.getAttribute(ATTR.aria);
      if (key) store.set(key + ":aria", el.getAttribute("aria-label"));
    });
    document.querySelectorAll(`[${ATTR.title}]`).forEach((el) => {
      const key = el.getAttribute(ATTR.title);
      if (key) store.set(key + ":title", el.getAttribute("title"));
    });
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;

    const meta = document.querySelector("meta[data-i18n-meta]");
    if (meta) {
      meta.content =
        lang === "en" ? EN["meta.description"] : store.get("meta.description") || meta.content;
    }
    document.title = lang === "en" ? EN["page.title"] : "Cratos — CanSat ESERO";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      if (lang === "en" && EN[key]) el.innerHTML = EN[key];
      else if (store.has(key)) el.innerHTML = store.get(key);
    });

    document.querySelectorAll(`[${ATTR.aria}]`).forEach((el) => {
      const key = el.getAttribute(ATTR.aria);
      if (!key) return;
      const it = store.get(key + ":aria");
      el.setAttribute("aria-label", lang === "en" && EN[key] ? EN[key] : it || el.getAttribute("aria-label"));
    });

    document.querySelectorAll(`[${ATTR.title}]`).forEach((el) => {
      const key = el.getAttribute(ATTR.title);
      if (!key) return;
      const it = store.get(key + ":title");
      el.setAttribute("title", lang === "en" && EN[key] ? EN[key] : it || el.getAttribute("title"));
    });

    const btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.textContent = lang === "it" ? "EN" : "IT";
      const label = lang === "it" ? "Switch to English" : "Passa all'italiano";
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}
  }

  function init() {
    captureItalian();
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en") applyLang("en");

    const btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const next = document.documentElement.lang === "it" ? "en" : "it";
        applyLang(next);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
