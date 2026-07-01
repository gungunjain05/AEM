export default function decorate(block) {
  const rows = [...block.children];

  const logo = rows[0];
  const sections = {};

  // pair up label rows with their content rows, starting after the logo
  for (let i = 1; i < rows.length; i += 2) {
    const label = rows[i]?.textContent.trim().toLowerCase();
    const content = rows[i + 1];
    if (label) sections[label] = content;
  }

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