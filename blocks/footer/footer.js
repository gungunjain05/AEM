export default async function decorate(block) {

  const footerPath = '/footer';

  const resp = await fetch(`${footerPath}.plain.html`);

  if (!resp.ok) {

    // eslint-disable-next-line no-console

    console.error('Failed to load footer fragment', resp.status);

    return;

  }

  const html = await resp.text();



  const temp = document.createElement('div');

  temp.innerHTML = html;



  const footerBlock = temp.querySelector('.footer') || temp.firstElementChild;

  let rows = [...footerBlock.children];



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



  block.innerHTML = `

    <div class="footer-container">

      <div class="footer-main">

        <div class="footer-logo">${logo?.innerHTML ?? ''}</div>

        <div class="footer-links">${sections['navigation']?.innerHTML ?? ''}</div>

        <div class="footer-bottom-row">

          <div class="footer-left">

            <div class="footer-company">${sections['company information']?.innerHTML ?? ''}</div>

            <div class="footer-region">

              <span class="footer-region-icon">&#127760;</span>

              <span>${sections['region']?.innerHTML ?? ''}</span>

            </div>

          </div>

          <div class="footer-social">${sections['social links']?.innerHTML ?? ''}</div>

        </div>

      </div>

      <hr class="footer-divider" />

      <div class="footer-legal-row">

        <p class="footer-copyright">${sections['copyright']?.innerHTML ?? ''}</p>

        <div class="footer-legal">${sections['legal links']?.innerHTML ?? ''}</div>

      </div>

    </div>

  `;

}