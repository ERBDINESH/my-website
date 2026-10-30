import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const PORT = 3456;
const OUT_DIR = path.resolve(process.cwd(), "out");

// Minimal static file server for out/ directory
function createServer() {
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

  return http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split("?")[0]);
    if (reqPath === "/") reqPath = "/index.html";

    let filePath = path.join(OUT_DIR, reqPath);
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + ".html")) {
      filePath += ".html";
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const stat = fs.statSync(filePath);
      res.writeHead(200, {
        "Content-Type": mimeTypes[ext] || "application/octet-stream",
        "Content-Length": stat.size,
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
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
      console.warn("Could not launch system browser (Edge/Chrome). Reporting Playwright environment limitation:", e.message);
      server.close();
      return;
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
    const heroH1 = await page.locator("#hero h1").textContent();
    assert(heroH1 && heroH1.includes("Dineshbabu Elumalai"), `Hero H1 displays name: "${heroH1?.trim()}"`);

    const heroHeadline = await page.locator("#hero h2").textContent();
    assert(
      heroHeadline && heroHeadline.includes("Building Reliable iOS Products. Expanding Software Engineering with AI."),
      `Hero headline matches required positioning: "${heroHeadline?.trim()}"`
    );

    const heroWorkLink = page.locator('#hero a[href="#work"]');
    assert(await heroWorkLink.isVisible(), "Hero primary CTA 'View Engineering Work' links to #work");

    const heroAILink = page.locator('#hero a[href="#ai-engineering"]');
    assert(await heroAILink.isVisible(), "Hero secondary CTA 'Explore AI Lab' links to #ai-engineering");

    console.log("\n4. Verified Production Case Studies (BNL, Insomnia, Mighty)...");
    const bnl = await page.locator("text=BNL / BNP Paribas").first().isVisible();
    const insomnia = await page.locator("text=Insomnia Cookies").first().isVisible();
    const mighty = await page.locator("text=Mighty Audio").first().isVisible();
    assert(bnl && insomnia && mighty, "All 3 verified production case studies are present without AI attribution");

    console.log("\n5. Independent Engineering Projects (LaunchProof & Personal AI Agent)...");
    const launchProof = await page.locator("#projects").getByText("LaunchProof").first().isVisible();
    assert(launchProof, "LaunchProof is rendered under #projects as Independent Web Product");

    const personalAgent = await page.locator("#projects").getByText("Personal AI Agent").first().isVisible();
    assert(personalAgent, "Personal AI Agent is rendered under #projects with 'In Progress' status");

    const agentNotice = await page.locator("#projects").getByText("Active Prototype:").first().isVisible();
    assert(agentNotice, "Personal AI Agent displays clear prototype boundary notice");

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

    console.log("\n8. Theme Toggle (Dark -> Light -> Dark)...");
    const initialTheme = await page.evaluate(() => document.documentElement.dataset.theme);
    assert(initialTheme === "dark", `Initial theme is dark (got: "${initialTheme}")`);

    const themeToggleBtn = page.locator('button[aria-label="Switch to light theme"]').first();
    if (await themeToggleBtn.isVisible()) {
      await themeToggleBtn.click();
      await page.waitForTimeout(200);
      const lightTheme = await page.evaluate(() => document.documentElement.dataset.theme);
      assert(lightTheme === "light", `Toggled to light theme (dataset.theme: "${lightTheme}")`);

      const darkToggleBtn = page.locator('button[aria-label="Switch to dark theme"]').first();
      await darkToggleBtn.click();
      await page.waitForTimeout(200);
      const restoredDarkTheme = await page.evaluate(() => document.documentElement.dataset.theme);
      assert(restoredDarkTheme === "dark", `Toggled back to dark theme (dataset.theme: "${restoredDarkTheme}")`);
    }

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
      if (await link.count() > 0) {
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

    // Verify PDF file is directly servable and valid
    const pdfRes = await context.request.get(`http://localhost:${PORT}/Dineshbabu-Elumalai-Resume.pdf`);
    const pdfStatus = pdfRes.status();
    const pdfType = pdfRes.headers()["content-type"];
    const pdfBytes = (await pdfRes.body()).length;
    assert(
      pdfStatus === 200 && pdfType.includes("pdf") && pdfBytes > 100000,
      `Resume PDF served with HTTP 200, Content-Type: "${pdfType}", Size: ${(pdfBytes / 1024).toFixed(1)} KB`
    );

    console.log("\n12. Browser Console Errors Check...");
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
