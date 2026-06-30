export default function decorate(block) {
  const rows = [...block.children];
  console.log('ROWS:', rows.length, rows.map(r => r.children.length + ' cells: ' + r.textContent.trim().slice(0, 40)));

  // First row is always the heading/intro text
  const heading = rows[0]?.textContent.trim();

  // Treat every remaining row that has 4+ cells AND isn't just header labels as a data row
  const dataRows = rows.slice(1).filter((row) => {
    const cells = [...row.children];
    if (cells.length < 4) return false;
    const firstCellText = cells[1]?.textContent?.trim().toLowerCase();
    // skip a literal header row if present
    return firstCellText !== 'title';
  });

  block.innerHTML = `
    <div class="product-carousel-container">
      <div class="product-header">
        <h2>${heading}</h2>
      </div>
      <div class="carousel-wrapper">
        <button class="prev">&#10094;</button>
        <div class="cards"></div>
        <button class="next">&#10095;</button>
      </div>
    </div>
  `;

  const cards = block.querySelector('.cards');

  dataRows.forEach((row) => {
    const cells = [...row.children];
    const image = cells[0]?.innerHTML ?? '';
    const title = cells[1]?.textContent ?? '';
    const desc = cells[2]?.textContent ?? '';
    const link = cells[3]?.textContent ?? '';

    cards.insertAdjacentHTML('beforeend', `
      <a class="card" href="${link}">
        ${image}
        <h3>${title}</h3>
        <p>${desc}</p>
      </a>
    `);
  });

  const next = block.querySelector('.next');
  const prev = block.querySelector('.prev');
  next.onclick = () => cards.scrollBy({ left: 320, behavior: 'smooth' });
  prev.onclick = () => cards.scrollBy({ left: -320, behavior: 'smooth' });
}