export default function decorate(block) {
  const rows = [...block.children];
  console.log('FOOTER ROWS:', rows.length, rows.map((r, i) => `${i}: ${r.textContent.trim().slice(0, 50)}`));

  block.innerHTML = `
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-logo">${rows[0]?.innerHTML ?? ''}</div>
        <div class="footer-links">${rows[1]?.innerHTML ?? ''}</div>
        <div class="footer-company">${rows[2]?.innerHTML ?? ''}</div>
        <div class="footer-region">${rows[3]?.innerHTML ?? ''}</div>
        <div class="footer-social">${rows[4]?.innerHTML ?? ''}</div>
      </div>
      <hr class="footer-divider" />
      <div class="footer-bottom">
        <p class="footer-copyright">${rows[5]?.innerHTML ?? ''}</p>
        <div class="footer-legal">${rows[6]?.innerHTML ?? ''}</div>
      </div>
    </div>
  `;
}