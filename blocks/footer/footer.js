export default function decorate(block) {
  let rows = [...block.children];

  // Remove the block-name header row if present (e.g. "footer")
  if (rows[0]?.children.length === 1 && rows[0].textContent.trim().toLowerCase() === 'footer') {
    rows = rows.slice(1);
  }

  const logo = rows[0];
  const sections = {};

  for (let i = 1; i < rows.length; i += 2) {
    const label = rows[i]?.textContent.trim().toLowerCase();
    const content = rows[i + 1];
    if (label) sections[label] = content;
  }

  // DEBUG - check console output on the live page
  console.log('FOOTER ROWS AFTER STRIP:', rows.length, rows.map((r, i) => `${i}: ${r.textContent.trim().slice(0, 40)}`));
  console.log('SECTIONS KEYS:', Object.keys(sections));

  block.innerHTML = `
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-logo">${logo?.innerHTML ?? ''}</div>
        <div class="footer-links">${sections['navigation']?.innerHTML ?? ''}</div>
        <div class="footer-company">${sections['company information']?.innerHTML ?? ''}</div>
        <div class="footer-region">${sections['region']?.innerHTML ?? ''}</div>
        <div class="footer-social">${sections['social links']?.innerHTML ?? ''}</div>
      </div>
      <hr class="footer-divider" />
      <div class="footer-bottom">
        <p class="footer-copyright">${sections['copyright']?.innerHTML ?? ''}</p>
        <div class="footer-legal">${sections['legal links']?.innerHTML ?? ''}</div>
      </div>
    </div>
  `;
}