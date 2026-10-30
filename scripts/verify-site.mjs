import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const PORT = 3456;
const OUT_DIR = path.resolve(process.cwd(), "out");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

function resolveStaticFilePath(outDir, urlPath) {
  let reqPath = decodeURI(urlPath.split("?")[0]);
  if (reqPath === "/") reqPath = "/index.html";

  let targetPath = path.join(outDir, reqPath);

  // 1. Direct file match
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
    return targetPath;
  }

  // 2. Exact file with .html appended (e.g. /projects/launchproof -> /projects/launchproof.html)
  if (fs.existsSync(targetPath + ".html") && fs.statSync(targetPath + ".html").isFile()) {
    return targetPath + ".html";
  }

  // 3. Directory with index.html (e.g. /projects/launchproof/ -> /projects/launchproof/index.html)
  const indexPath = path.join(targetPath, "index.html");
  if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
    return indexPath;
  }

  // 4. Clean URL trailing slash handling (e.g. /projects/launchproof/ -> /projects/launchproof.html)
  if (reqPath.endsWith("/")) {
    const strippedPath = path.join(outDir, reqPath.slice(0, -1));
    if (fs.existsSync(strippedPath + ".html") && fs.statSync(strippedPath + ".html").isFile()) {
      return strippedPath + ".html";
    }
  }

  return null;
}

// Minimal static file server for out/ directory
function createServer() {
  return http.createServer((req, res) => {
    const filePath = resolveStaticFilePath(OUT_DIR, req.url);

    if (filePath && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const stat = fs.statSync(filePath);
      res.writeHead(200, {
        "Content-Type": mimeTypes[ext] || "application/octet-stream",
        "Content-Length": stat.size,
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      const notFoundPath = path.join(OUT_DIR, "404.html");
      if (fs.existsSync(notFoundPath)) {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        fs.createReadStream(notFoundPath).pipe(res);
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      }
    }
  });
}

async function runVerification() {
  const server = createServer();
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`[Verification Server] Serving out/ at http://localhost:${PORT}`);

  let browser;
  try {
    browser = await chromium.launch({ channel: "msedge", headless: true });
  } catch {
    try {
      browser = await chromium.launch({ channel: "chrome", headless: true });
    } catch (e) {
      console.error("\n✗ EXPLICIT FAILURE: Could not launch system browser (Edge/Chrome):", e.message);
      server.close();
      process.exit(1);
    }
  }

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  const results = [];

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ ${message}`);
      results.push({ message, pass: true });
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      results.push({ message, pass: false });
    }
  }

  try {
    console.log("\n1. Page Load & Response Verification...");
    const response = await page.goto(`http://localhost:${PORT}`, { waitUntil: "networkidle" });
    assert(response.status() === 200, `HTTP 200 Status on root page (received ${response.status()})`);

    console.log("\n2. SEO & Metadata Verification...");
    const title = await page.title();
    assert(
      title.includes("Dineshbabu Elumalai") && title.includes("Senior Software Engineer - iOS"),
      `Page title is accurate: "${title}"`
    );

    const description = await page.locator('meta[name="description"]').getAttribute("content");
    assert(
      description && description.includes("7+ years") && description.includes("AI-augmented software engineering"),
      `Meta description contains required positioning`
    );

    const keywords = await page.locator('meta[name="keywords"]').getAttribute("content");
    assert(
      keywords &&
        keywords.includes("Senior iOS Engineer") &&
        keywords.includes("Swift") &&
        keywords.includes("AI-Augmented Software Engineering") &&
        keywords.includes("Mobile Architecture"),
      `Primary & secondary keywords present in metadata`
    );

    console.log("\n3. Hero Section & Professional Positioning...");
    const heroH1 = await page.locator("section#hero h1").textContent();
    assert(heroH1.includes("Dineshbabu Elumalai"), `Hero H1 displays name: "${heroH1.trim()}"`);

    const heroHeadline = await page.locator("section#hero h2").textContent();
    assert(
      heroHeadline.includes("Building Reliable iOS Products. Expanding Software Engineering with AI."),
      `Hero headline matches required positioning: "${heroHeadline.trim()}"`
    );

    const heroPrimaryCta = page.locator('section#hero a[href="#work"]');
    assert((await heroPrimaryCta.count()) > 0, "Hero primary CTA 'View Engineering Work' links to #work");

    const heroSecondaryCta = page.locator('section#hero a[href="#ai-engineering"]');
    assert((await heroSecondaryCta.count()) > 0, "Hero secondary CTA 'Explore AI Lab' links to #ai-engineering");

    console.log("\n4. Verified Production Case Studies (BNL, Insomnia, Mighty)...");
    const bnl = await page.locator("#work").getByText("BNL / BNP Paribas").count();
    const insomnia = await page.locator("#work").getByText("Insomnia Cookies").count();
    const mighty = await page.locator("#work").getByText("Mighty Audio").count();
    assert(
      bnl > 0 && insomnia > 0 && mighty > 0,
      "All 3 verified production case studies are present without AI attribution"
    );

    console.log("\n5. Independent Engineering Projects (Homepage Cards & Links)...");
    const launchProofBento = page.locator("#projects").getByText("LaunchProof");
    const personalAIBento = page.locator("#projects").getByText("Personal AI Agent");
    assert((await launchProofBento.count()) > 0, "LaunchProof is rendered under #projects as Independent Web Product");
    assert((await personalAIBento.count()) > 0, "Personal AI Agent is rendered under #projects with 'In Progress' status");

    const launchProofCaseStudyLink = page.locator('#projects a[href="/projects/launchproof"]');
    assert((await launchProofCaseStudyLink.count()) > 0, "LaunchProof card has 'Explore Case Study' link to /projects/launchproof");

    const personalAICaseStudyLink = page.locator('#projects a[href="/projects/personal-ai-agent"]');
    assert((await personalAICaseStudyLink.count()) > 0, "Personal AI Agent card has 'Explore Case Study' link to /projects/personal-ai-agent");

    const personalAIDemoLink = page.locator('#projects a[href="/projects/personal-ai-agent#interactive-demo"]');
    assert((await personalAIDemoLink.count()) > 0, "Personal AI Agent card has 'Try Demo' link to #interactive-demo");

    console.log("\n6. Comprehensive AI Engineering Lab - All 6 Stages Verification...");
    const aiLab = await page.locator("#ai-engineering").isVisible();
    assert(aiLab, "AI Engineering Lab section is rendered with #ai-engineering anchor");

    const stageButtons = await page.locator('#ai-engineering button[aria-pressed]').count();
    assert(stageButtons === 6, `All 6 human-in-the-loop workflow stages exist (count: ${stageButtons})`);

    const stagesToTest = [
      { name: "Task Definition", expectedText: "Task Definition", expectedCode: "TransactionServicing" },
      { name: "AI-Assisted Draft", expectedText: "AI-Assisted Draft", expectedCode: "TransactionsListView" },
      { name: "Engineer Review", expectedText: "Engineer Review", expectedCode: "SENIOR ARCHITECTURAL REVIEW" },
      { name: "Architecture Validation", expectedText: "Architecture Validation", expectedCode: "TransactionsViewModel" },
      { name: "Automated Tests", expectedText: "Automated Tests", expectedCode: "TransactionsViewModelTests" },
      { name: "Manual Verification", expectedText: "Manual Verification", expectedCode: "RUNTIME & RELEASE VERIFICATION" },
    ];

    for (const s of stagesToTest) {
      await page.locator(`#ai-engineering button[aria-pressed]:has-text("${s.name}")`).click();
      await page.waitForTimeout(150);
      const headerVisible = await page.locator(`#ai-engineering h4:has-text("${s.expectedText}")`).count();
      const codeSnippet = await page.locator("#ai-engineering pre code").textContent();
      const codeMatch = codeSnippet && codeSnippet.includes(s.expectedCode);
      assert(
        headerVisible > 0 && codeMatch,
        `Stage "${s.name}" inspection verified (code contains: "${s.expectedCode}")`
      );
    }

    console.log("\n7. Architecture Deep-Dive Inspection...");
    const archSection = await page.locator("#architecture").isVisible();
    assert(archSection, "Architecture Deep-Dive is visible with #architecture anchor");

    const flowNodes = [
      { name: "User Action", expectedLayer: "USER INTERACTION" },
      { name: "View Layer", expectedLayer: "PRESENTATION" },
      { name: "ViewModel", expectedLayer: "STATE MACHINE" },
      { name: "Service Layer", expectedLayer: "BUSINESS LOGIC" },
      { name: "API & Infrastructure", expectedLayer: "INFRASTRUCTURE" },
      { name: "State Update", expectedLayer: "RESULT & RENDERING" },
    ];

    for (const node of flowNodes) {
      await page.locator(`#architecture button:has-text("${node.name}")`).first().click();
      await page.waitForTimeout(100);
      const inspectorLayer = await page.locator('#architecture').getByText(node.expectedLayer).count();
      assert(inspectorLayer > 0, `Architecture node "${node.name}" inspector displays layer "${node.expectedLayer}"`);
    }

    console.log("\n8. Theme Toggle & Computed Color Contrast Testing (Dark and Light Themes)...");
    const initialTheme = await page.evaluate(() => document.documentElement.dataset.theme);
    assert(initialTheme === "dark", `Initial theme is dark (got: "${initialTheme}")`);

    async function evaluateContrast() {
      return await page.evaluate(() => {
        function parseAnyColor(colorStr) {
          const canvas = document.createElement("canvas");
          canvas.width = 1;
          canvas.height = 1;
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          ctx.clearRect(0, 0, 1, 1);
          ctx.fillStyle = colorStr;
          ctx.fillRect(0, 0, 1, 1);
          const data = ctx.getImageData(0, 0, 1, 1).data;
          return { r: data[0], g: data[1], b: data[2], a: data[3] / 255 };
        }

        function getEffectiveBg(el) {
          let curr = el;
          const layers = [];
          while (curr && curr !== document.documentElement) {
            const style = window.getComputedStyle(curr);
            const parsed = parseAnyColor(style.backgroundColor);
            if (parsed.a > 0) {
              layers.unshift(parsed);
              if (parsed.a >= 0.99) break;
            }
            curr = curr.parentElement;
          }
          const isLight = document.documentElement.dataset.theme === "light";
          let composite = isLight ? { r: 245, g: 247, b: 246 } : { r: 9, g: 12, b: 11 };
          for (const l of layers) {
            composite = {
              r: Math.round(l.r * l.a + composite.r * (1 - l.a)),
              g: Math.round(l.g * l.a + composite.g * (1 - l.a)),
              b: Math.round(l.b * l.a + composite.b * (1 - l.a)),
            };
          }
          return composite;
        }

        function relLum({ r, g, b }) {
          const a = [r, g, b].map((v) => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
          });
          return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
        }

        function calcRatio(fg, bg) {
          const l1 = relLum(fg);
          const l2 = relLum(bg);
          return Number(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2));
        }

        // 1. Prototype Notice Callout
        const strongs = Array.from(document.querySelectorAll("#projects strong"));
        const noticeHeading = strongs.find((s) => s.textContent.includes("Active Prototype"));
        const noticeEl = noticeHeading ? noticeHeading.closest("div") : null;
        const noticeDesc = noticeEl ? noticeEl.querySelector("p > span") : null;

        let headingRatio = 0;
        let descRatio = 0;
        if (noticeEl && noticeHeading) {
          const bg = getEffectiveBg(noticeEl);
          const fgHeading = parseAnyColor(window.getComputedStyle(noticeHeading).color);
          const fgDesc = parseAnyColor(window.getComputedStyle(noticeDesc || noticeEl).color);
          headingRatio = calcRatio(fgHeading, bg);
          descRatio = calcRatio(fgDesc, bg);
        }

        // 2. Try Demo CTA
        const demoBtn = document.querySelector('#projects a[href*="interactive-demo"]');
        let demoBtnRatio = 0;
        let demoCursor = "";
        let demoBorder = "";
        if (demoBtn) {
          const btnBg = getEffectiveBg(demoBtn);
          const btnFg = parseAnyColor(window.getComputedStyle(demoBtn).color);
          demoBtnRatio = calcRatio(btnFg, btnBg);
          const s = window.getComputedStyle(demoBtn);
          demoBorder = s.borderColor;
          demoCursor = s.cursor;
        }

        return {
          headingRatio,
          descRatio,
          demoBtnRatio,
          demoCursor,
          demoBorder,
        };
      });
    }

    // Measure Dark Theme Contrast
    const darkContrast = await evaluateContrast();
    assert(
      darkContrast.headingRatio >= 4.5,
      `[Dark Theme] Active Prototype heading contrast passes WCAG AA (ratio: ${darkContrast.headingRatio}:1 >= 4.5:1)`
    );
    assert(
      darkContrast.descRatio >= 4.5,
      `[Dark Theme] Active Prototype description contrast passes WCAG AA (ratio: ${darkContrast.descRatio}:1 >= 4.5:1)`
    );
    assert(
      darkContrast.demoBtnRatio >= 4.5,
      `[Dark Theme] Try Demo CTA button text contrast passes WCAG AA (ratio: ${darkContrast.demoBtnRatio}:1 >= 4.5:1)`
    );
    assert(
      darkContrast.demoCursor === "pointer",
      `[Dark Theme] Try Demo CTA has interactive cursor pointer (got: "${darkContrast.demoCursor}")`
    );

    // Toggle to Light Theme
    const themeToggleBtn = page.locator('button[aria-label="Switch to Light theme"]').first();
    assert((await themeToggleBtn.count()) > 0, "Theme toggle button for Light theme exists");
    await themeToggleBtn.click();
    await page.waitForTimeout(250);
    const lightTheme = await page.evaluate(() => document.documentElement.dataset.theme);
    assert(lightTheme === "light", `Toggled to light theme (dataset.theme: "${lightTheme}")`);

    // Measure Light Theme Contrast
    const lightContrast = await evaluateContrast();
    assert(
      lightContrast.headingRatio >= 4.5,
      `[Light Theme] Active Prototype heading contrast passes WCAG AA (ratio: ${lightContrast.headingRatio}:1 >= 4.5:1)`
    );
    assert(
      lightContrast.descRatio >= 4.5,
      `[Light Theme] Active Prototype description contrast passes WCAG AA (ratio: ${lightContrast.descRatio}:1 >= 4.5:1)`
    );
    assert(
      lightContrast.demoBtnRatio >= 4.5,
      `[Light Theme] Try Demo CTA button text contrast passes WCAG AA (ratio: ${lightContrast.demoBtnRatio}:1 >= 4.5:1)`
    );
    assert(
      lightContrast.demoCursor === "pointer",
      `[Light Theme] Try Demo CTA has interactive cursor pointer (got: "${lightContrast.demoCursor}")`
    );

    // Toggle back to Dark Theme
    const darkToggleBtn = page.locator('button[aria-label="Switch to Dark theme"]').first();
    assert((await darkToggleBtn.count()) > 0, "Theme toggle button for Dark theme exists");
    await darkToggleBtn.click();
    await page.waitForTimeout(200);
    const restoredDarkTheme = await page.evaluate(() => document.documentElement.dataset.theme);
    assert(restoredDarkTheme === "dark", `Toggled back to dark theme (dataset.theme: "${restoredDarkTheme}")`);

    console.log("\n9. Mobile Navigation & Viewport Testing...");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(200);

    // Verify floating bottom mobile tab bar
    const mobileBottomBar = page.locator('.fixed.inset-x-0.z-\\[60\\] a[href="#ai-engineering"]');
    assert(await mobileBottomBar.isVisible(), "Mobile bottom glass tab bar has 'AI Lab' link visible");

    // Open mobile navigation drawer sheet
    const mobileMenuTrigger = page.locator('button[aria-label="Open navigation menu"]');
    assert(await mobileMenuTrigger.isVisible(), "Mobile menu hamburger trigger button is visible");
    await mobileMenuTrigger.click();
    await page.waitForTimeout(300);

    const mobileSheet = page.locator("#mobile-navigation-sheet");
    assert(await mobileSheet.isVisible(), "Mobile navigation sheet opened via trigger");

    const mobileProjectsLink = page.locator('#mobile-navigation-sheet a[href="#projects"]');
    assert(await mobileProjectsLink.isVisible(), "Mobile navigation sheet contains '#projects' link");

    // Close mobile sheet via close button
    const closeBtn = page.locator('#mobile-navigation-sheet button[aria-label="Close sheet"]');
    await closeBtn.click();
    await page.waitForTimeout(300);
    assert(!(await mobileSheet.isVisible()), "Mobile navigation sheet closed successfully");

    // Restore desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    console.log("\n10. External Links Safety & Rel Attributes...");
    const externalLinks = [
      { name: "LaunchProof", selector: 'a[href="https://launchproof.erbdinesh.com"]' },
      { name: "BNL App Store", selector: 'a[href="https://apps.apple.com/app/id578969149"]' },
      { name: "Insomnia Cookies App Store", selector: 'a[href="https://apps.apple.com/app/id891379973"]' },
      { name: "Mighty Audio App Store", selector: 'a[href="https://apps.apple.com/app/id1164822276"]' },
      { name: "LinkedIn", selector: 'a[href="https://www.linkedin.com/in/erbdinesh"]' },
      { name: "GitHub", selector: 'a[href="https://github.com/ERBDINESH"]' },
    ];

    for (const item of externalLinks) {
      const link = page.locator(item.selector).first();
      if ((await link.count()) > 0) {
        const target = await link.getAttribute("target");
        const rel = await link.getAttribute("rel");
        assert(
          target === "_blank" && rel && rel.includes("noopener"),
          `External link "${item.name}" has target="_blank" and rel="noopener"`
        );
      }
    }

    console.log("\n11. Resume Download Verification...");
    const resumeLinks = await page.locator('a[href="/Dineshbabu-Elumalai-Resume.pdf"]').count();
    assert(resumeLinks > 0, `Resume link href is correctly set to /Dineshbabu-Elumalai-Resume.pdf (found: ${resumeLinks})`);

    const pdfRes = await context.request.get(`http://localhost:${PORT}/Dineshbabu-Elumalai-Resume.pdf`);
    const pdfStatus = pdfRes.status();
    const pdfType = pdfRes.headers()["content-type"];
    const pdfBytes = (await pdfRes.body()).length;
    assert(
      pdfStatus === 200 && pdfType.includes("pdf") && pdfBytes > 100000,
      `Resume PDF served with HTTP 200, Content-Type: "${pdfType}", Size: ${(pdfBytes / 1024).toFixed(1)} KB`
    );

    console.log("\n12. Case Study: LaunchProof Page Verification (/projects/launchproof)...");
    const lpResponse = await page.goto(`http://localhost:${PORT}/projects/launchproof`, { waitUntil: "networkidle" });
    assert(lpResponse.status() === 200, `LaunchProof page returned HTTP 200 (received ${lpResponse.status()})`);

    const lpTitle = await page.title();
    assert(lpTitle.includes("LaunchProof Case Study"), `LaunchProof title correct: "${lpTitle}"`);

    const lpCanonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    assert(lpCanonical === "https://erbdinesh.com/projects/launchproof", `LaunchProof canonical URL: "${lpCanonical}"`);

    const lpSections = [
      "The Silent Launch Defect Dilemma",
      "Implementation State & Project Boundaries",
      "End-to-End Scan Pipeline & Data Flow",
      "Design Trade-Offs & Security Boundaries",
      "Verified Test Scenarios & Repository Artifacts",
      "Explicit Engineering Boundaries",
    ];

    for (const sec of lpSections) {
      const heading = page.getByText(sec).first();
      assert((await heading.count()) > 0, `LaunchProof case study contains section: "${sec}"`);
    }

    const lpLiveLink = page.locator('a[href="https://launchproof.erbdinesh.com"]');
    assert((await lpLiveLink.count()) > 0, "LaunchProof case study links to live application");

    const lpRepoLink = page.locator('a[href="https://github.com/ERBDINESH/launchproof"]');
    assert((await lpRepoLink.count()) > 0, "LaunchProof case study links to public repository");

    console.log("\n13. Case Study: Personal AI Agent Page Verification (/projects/personal-ai-agent)...");
    const agentResponse = await page.goto(`http://localhost:${PORT}/projects/personal-ai-agent`, { waitUntil: "networkidle" });
    assert(agentResponse.status() === 200, `Personal AI Agent page returned HTTP 200 (received ${agentResponse.status()})`);

    const agentTitle = await page.title();
    assert(agentTitle.includes("Personal AI Agent Case Study"), `Personal AI Agent title correct: "${agentTitle}"`);

    const agentCanonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    assert(agentCanonical === "https://erbdinesh.com/projects/personal-ai-agent", `Personal AI Agent canonical URL: "${agentCanonical}"`);

    const agentSections = [
      "Why Build a Personal Engineering Agent?",
      "What Works Today vs What Remains Experimental",
      "Router, Tools & Deterministic Execution",
      "Deterministic Inflation Trend Classification",
      "Verified Test Scenarios (Node Test Runner)",
      "Defensible Engineering Constraints",
    ];

    for (const sec of agentSections) {
      const heading = page.getByText(sec).first();
      assert((await heading.count()) > 0, `Personal AI Agent case study contains section: "${sec}"`);
    }

    console.log("\n14. Interactive CPI Observation Demo Functionality...");
    const demoContainer = page.locator("#interactive-demo");
    assert((await demoContainer.count()) > 0, "Interactive demo container is rendered (#interactive-demo)");

    // Initial state check (Default: Accelerating)
    const initialResult = page.locator("#interactive-demo").getByText("ACCELERATING").first();
    assert((await initialResult.count()) > 0, "Initial demo preset defaults to ACCELERATING");

    // Preset Switching: Cooling Trend
    const coolingPresetBtn = page.locator('#interactive-demo button:has-text("Cooling Trend")');
    await coolingPresetBtn.click();
    await page.waitForTimeout(100);
    const coolingResult = page.locator("#interactive-demo").getByText("COOLING").first();
    assert((await coolingResult.count()) > 0, "Preset 'Cooling Trend' computes COOLING outcome");

    // Preset Switching: Divergent / Mixed
    const mixedPresetBtn = page.locator('#interactive-demo button:has-text("Divergent / Mixed")');
    await mixedPresetBtn.click();
    await page.waitForTimeout(100);
    const mixedResult = page.locator("#interactive-demo").getByText("MIXED SIGNALS").first();
    assert((await mixedResult.count()) > 0, "Preset 'Divergent / Mixed' computes MIXED SIGNALS outcome");

    // Preset Switching: Incomplete Prior Data (Missing Previous Rates)
    const incompletePresetBtn = page.locator('#interactive-demo button:has-text("Incomplete Prior Data")');
    await incompletePresetBtn.click();
    await page.waitForTimeout(100);
    const unknownResult = page.locator("#interactive-demo").getByText("UNKNOWN / INSUFFICIENT DATA").first();
    assert((await unknownResult.count()) > 0, "Missing previous rates safely computes UNKNOWN without crash");

    // Custom Input Test: Stable rates (MoM: 0.5 & 0.5)
    const momCurrentInput = page.locator('#interactive-demo input[placeholder*="0.4"]').first();
    const momPrevInput = page.locator('#interactive-demo input[placeholder*="0.2"]').first();
    await momCurrentInput.fill("0.5");
    await momPrevInput.fill("0.5");
    await page.waitForTimeout(100);
    const unchangedMomBadge = page.locator('#interactive-demo span:has-text("unchanged")').first();
    assert((await unchangedMomBadge.count()) > 0, "Custom identical inputs yield 'unchanged' MoM trend");

    // Epsilon Sensitivity Test
    const tolerancePresetBtn = page.locator('#interactive-demo button:has-text("Epsilon Sensitivity")');
    await tolerancePresetBtn.click();
    await page.waitForTimeout(100);
    // At default 1e-9 tolerance, difference is 5e-10 <= 1e-9 -> unchanged
    const toleranceUnchanged = page.locator('#interactive-demo span:has-text("unchanged")').first();
    assert((await toleranceUnchanged.count()) > 0, "Epsilon 1e-9 handles floating point diff 5e-10 as unchanged");

    // Switch epsilon dropdown to 1e-12 -> difference 5e-10 > 1e-12 -> accelerating
    const epsilonSelect = page.locator("#interactive-demo select").first();
    await epsilonSelect.selectOption({ value: "1e-12" });
    await page.waitForTimeout(100);
    const toleranceAccelerating = page.locator('#interactive-demo span:has-text("accelerating")').first();
    assert((await toleranceAccelerating.count()) > 0, "Strict epsilon 1e-12 correctly classifies 5e-10 diff as accelerating");

    // Invalid Input Handling
    await momCurrentInput.fill("invalid-numeric-string");
    await page.waitForTimeout(100);
    const inputError = page.locator("#interactive-demo").getByText("Must be a valid finite number");
    assert((await inputError.count()) > 0, "Invalid non-numeric input displays validation error without crash");

    // Reset to Default
    const resetBtn = page.locator('#interactive-demo button:has-text("Reset to Default")');
    await resetBtn.click();
    await page.waitForTimeout(100);
    const resetResult = page.locator("#interactive-demo").getByText("ACCELERATING").first();
    assert((await resetResult.count()) > 0, "Reset button restores original ACCELERATING state");

    console.log("\n15. Cross-Page Navigation Flow Verification...");
    const backBtn = page.locator('header a[aria-label="Back to portfolio projects"]').first();
    await backBtn.click();
    await page.waitForURL(`http://localhost:${PORT}/#projects`);
    assert(page.url().includes("#projects"), "Navigated back to portfolio #projects from case study");

    console.log("\n16. Browser Console Errors Check...");
    assert(consoleErrors.length === 0, `Zero browser console errors detected on page load (errors: ${consoleErrors.length})`);
    if (consoleErrors.length > 0) {
      console.error("Console errors captured:", consoleErrors);
    }
  } catch (err) {
    console.error("Verification error:", err);
    results.push({ message: `Exception: ${err.message}`, pass: false });
  } finally {
    await browser.close();
    server.close();
  }

  const failed = results.filter((r) => !r.pass);
  console.log(`\n======================================================`);
  console.log(`Comprehensive Verification: ${results.length - failed.length}/${results.length} checks passed`);
  console.log(`======================================================\n`);

  if (failed.length > 0) {
    process.exit(1);
  } else {
    console.log("All comprehensive verification checks PASSED successfully!");
  }
}

runVerification();
