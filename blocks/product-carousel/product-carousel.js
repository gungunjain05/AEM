export default function decorate(block) {
  const rows = [...block.children];

  const heading = rows[0]?.textContent.trim();
  // rows[1] is the header row (Image/Title/Description/Link) — skip it
  const dataRows = rows.slice(2);

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