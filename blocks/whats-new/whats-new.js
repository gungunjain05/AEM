export default function decorate(block) {
    const rows = [...block.children];

    const heading = rows[0]?.textContent.trim();
    const ctaText = rows[1]?.textContent.trim();
    const ctaLink = rows[2]?.textContent.trim();

    const articles = rows.slice(3);

    block.innerHTML = `
    <div class="whats-new-container">
      <div class="whats-new-header">
        <h2>${heading}</h2>
      </div>

      <div class="whats-new-grid"></div>

      <div class="whats-new-footer">
        <a href="${ctaLink}">${ctaText} →</a>
      </div>
    </div>
  `;

    const grid = block.querySelector('.whats-new-grid');

    articles.forEach((row) => {
        const cols = [...row.children];

        if (cols.length < 6) return;

        const image = cols[0].innerHTML;
        const title = cols[1].textContent.trim();
        const category = cols[2].textContent.trim();
        const date = cols[3].textContent.trim();
        const readTime = cols[4].textContent.trim();
        const link = cols[5].textContent.trim();

        const card = document.createElement('a');
        card.className = 'news-card';
        card.href = link;

        card.innerHTML = `
      <div class="news-image">
        ${image}
      </div>

      <div class="news-content">
        <h3>${title}</h3>

        <span class="category">${category}</span>

        <div class="meta">
          <span>${date}</span>
          <span>•</span>
          <span>${readTime}</span>
        </div>
      </div>
    `;

        grid.append(card);
    });
}