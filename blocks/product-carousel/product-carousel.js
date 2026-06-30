export default function decorate(block) {
  const rows = [...block.children];

  const heading = rows[0]?.textContent.trim();
  const table = rows[1]?.querySelector('table');
  const trs = table ? [...table.querySelectorAll('tr')].slice(1) : []; // skip header row

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

  trs.forEach((tr) => {
    const td = [...tr.querySelectorAll('td')];
    const image = td[0]?.innerHTML ?? '';
    const title = td[1]?.textContent ?? '';
    const desc = td[2]?.textContent ?? '';
    const link = td[3]?.textContent ?? '';

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