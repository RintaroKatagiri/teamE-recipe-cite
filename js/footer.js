class SiteFooter extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      const style = document.createElement('style');
      style.textContent = `
        footer {
          background-color: var(--footer-bg-color);
          color: var(--footer-text-color);
          width: 100%;
          text-align: center;
          padding: 1em 0;
        }
        footer a {
          color: var(--footer-text-color);
          text-decoration: none;
          margin-right: 10px;
        }
      `;
  
      const wrapper = document.createElement('div');
      const basePath = `https://rintarokatagiri.github.io/teamE-recipe-cite`;
  
      wrapper.innerHTML = `
        <footer>
            <a href="${basePath}/homepage.html">トップページに戻る</a>
            <p>© 2025 teamE_company</p>
        </footer>
      `;
  
      shadow.appendChild(style);
      shadow.appendChild(wrapper);
    }
  }
  
  customElements.define('site-footer', SiteFooter);

