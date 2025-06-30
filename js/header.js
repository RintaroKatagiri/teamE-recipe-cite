class SiteHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      header {
        background-color: var(--header-bg-color);
        color: var(--header-text-color);
        padding: 10px;
        width: 100%;
      }
      nav a {
        color: var(--header-text-color);
        margin-right: 10px;
        text-decoration: none;
      }
      nav a img {
        width: 20px;
        height: 20px;}
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <header>
        <h1><a href="/homepageProject2">レシピサイト</a></h1>
        <nav>
          <a href="/homepageProject2">サイト紹介</a>
          <a href="/homepageProject2/contents/recipe/recipe1.html">料理一覧</a>
          <a href="/homepageProject2/contents/news/news.html">ニュース一覧</a>
          <a href="/homepageProject2/contents/contact/contact.html">お問い合わせ</a>
          <a href="https://www.instagram.com/">
              <img src="/homepageProject2/img/homepage1/homepage_insta.png">
          </a>
        </nav>
      </header>
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
}

customElements.define('site-header', SiteHeader);
