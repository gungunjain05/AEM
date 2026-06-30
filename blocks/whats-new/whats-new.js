export default function decorate(block) {
  const rows = [...block.children];

  const heading = rows[0]?.textContent.trim();
  const table = rows[1]?.querySelector('table');
  const trs = table ? [...table.querySelectorAll('tr')].slice(1) : []; // skip header row

  block.innerHTML = `
    <div class="whats-new-container">
      <div class="whats-new-header">
        <h2>${heading}</h2>
      </div>
      <div class="whats-new-cards"></div>
    </div>
  `;

  const cards = block.querySelector('.whats-new-cards');

  trs.forEach((tr) => {
    const td = [...tr.querySelectorAll('td')];
    const image = td[0]?.innerHTML ?? '';
    const title = td[1]?.textContent ?? '';
    const category = td[2]?.textContent ?? '';
    const date = td[3]?.textContent ?? '';
    const readTime = td[4]?.textContent ?? '';
    const link = td[5]?.textContent ?? '';

    cards.insertAdjacentHTML('beforeend', `
      <a class="whats-new-card" href="${link}">
        <div class="whats-new-image">${image}</div>
        <div class="whats-new-meta">
          <span class="whats-new-category">${category}</span>
          <span class="whats-new-date">${date}</span>
        </div>
        <h3>${title}</h3>
        <span class="whats-new-readtime">${readTime}</span>
      </a>
    `);
  });
}