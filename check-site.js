const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  try {
    await page.goto('https://mcp-website-ifp.vercel.app', { waitUntil: 'networkidle', timeout: 30000 });

    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'C:/Users/User/Documents/ifp-premium/ss-375.png', fullPage: true });

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'C:/Users/User/Documents/ifp-premium/ss-1280.png', fullPage: true });

    const title = await page.title();
    const h1 = await page.textContent('h1').catch(() => 'n/a');
    const navText = await page.textContent('header').catch(() => 'n/a');
    const bodyText = await page.textContent('body');
    const hasHero = bodyText.includes('Islamic Front') || bodyText.includes('ఇస్లామిక్');
    const hasManifesto = bodyText.includes('Manifesto') || bodyText.includes('మానిఫెస్టో');
    const hasSchemes = bodyText.includes('Funeral') || bodyText.includes('అంత్యక్రియల');
    const hasContact = bodyText.includes('90329') || bodyText.includes('Mangalagiri');
    const hasKC = bodyText.includes('Knowledge Center') || bodyText.includes('జ్ఞాన');

    console.log(JSON.stringify({
      title, h1: h1.trim().substring(0, 60),
      nav: navText.trim().substring(0, 120),
      checks: { hasHero, hasManifesto, hasSchemes, hasContact, hasKC },
      consoleErrors
    }, null, 2));
  } catch(e) { console.error(e.message); }
  await browser.close();
})();
