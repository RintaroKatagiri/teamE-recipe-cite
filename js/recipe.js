document.addEventListener('DOMContentLoaded', async () => {

    let recipeData;
    try {
        const res = await fetch("./recipe.json");
        recipeData = await res.json();
    } catch (error) {
        console.error("Failed to fetch recipe data:", error);
        return;
    }
    const recipeContainer = document.querySelector('.recipeContainer');
    const idx = Number(recipeContainer.dataset.idx);
    const recipe = recipeData[idx];
    if (!recipe) {
        return;
    }

    const navbar = document.querySelector('.navbar');
    if (!navbar) {
        return;
    }
    const fav = Math.floor(Math.random() * 1000);
    navbar.innerHTML =
        `
    <button class="back-button">
            <a href="../../homepage.html"><i class="fa-solid fa-chevron-left"></i></a>
    </button>
    <h1 id="nav-text">${recipe.title}</h1>
    <div class="nav-buttons">
        <button class="login-button">
            <a href="">ログイン</a>
        </button>
        <button class="add-button">
            <a href="../../homepage.html#works">レシピ一覧</a>
        </button>
    </div>
    `



    // ナビバーに関する設定
    const navText = document.getElementById('nav-text');

    if (navText) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if (scrollTop > 50) {
                navText.style.opacity = "1";
                navText.style.visibility = "visible";
            } else {
                navText.style.opacity = "0";
                navText.style.visibility = "hidden";
            }
        });
    }

    // レシピの内容に関して

    recipeContainer.innerHTML =
        `
    <div class="menuTitle">
        <div class="image">
            <img src="${recipe.recipeMainImgDir}" alt="" width="1024" height="1536">
        </div>
        <div class="text">
            <div class="title">
                <h1 class="page-title">${recipe.title}</h1>
                <p>${recipe.recipeDesc}</p>
            </div>
            <div class="author">
                <div class="icon">
                    <img src=${recipe.recipeAuthorImgDir} alt="" width="1024" height="1024">
                </div>
                <p>${recipe.recipeAuthor}</p>
            </div>
            <div class="description">
                これ作ったらめっちゃおいしい
            </div>
            <div class="reaction">
            <i class="fa-solid fa-arrow-up-from-bracket"></i>
            <i class="fa-solid fa-print"></i>
            <h3>${fav}いいね</h3>
            </div>
        </div>
    </div>
    <div class="recipe">
        <div class="ingredients">
            <h2 class="content-title">${recipe.ingredientTitle}</h2>
            <dl class="ingredient-list">
            ${recipe.ingredients.map(ing => `<dt>${ing.name}</dt><dd>${ing.amount}</dd>`).join('')}
            </dl>
        </div>
        <div class="how-to">
            <h2 class="content-title">作り方</h2>
            <div class="step-list">
                <div class="step-row">
                    <div class="step">
                        <div class="circle">1</div>
                        <img src=${recipe.step1.imgDir} alt="">
                        <p>${recipe.step1.desc}</p>
                    </div>
                    <div class="step">
                        <div class="circle">2</div>
                        <img src=${recipe.step2.imgDir} alt="">
                        <p>${recipe.step2.desc}</p>
                    </div>
                    <div class="step">
                        <div class="circle">3</div>
                        <img src=${recipe.step3.imgDir} alt="">
                        <p>${recipe.step3.desc}</p>
                    </div>
                </div>
                <div class="step-row">
                <div class="step">
                        <div class="circle">4</div>
                        <img src=${recipe.step4.imgDir} alt="">
                        <p>${recipe.step4.desc}</p>
                    </div>
                    <div class="step">
                        <div class="circle">5</div>
                        <img src=${recipe.step5.imgDir} alt="">
                        <p>${recipe.step5.desc}</p>
                    </div>
                    <div class="step">
                        <div class="circle">6</div>
                        <img src=${recipe.step6.imgDir} alt="">
                        <p>${recipe.step6.desc}</p>
                    </div>
                </div>
                <div class="step-row">
                <div class="step">
                        <div class="circle">7</div>
                        <img src=${recipe.step7.imgDir} alt="">
                        <p>${recipe.step7.desc}</p>
                    </div>
                    <div class="step">
                        <div class="circle">8</div>
                        <img src=${recipe.step8.imgDir} alt="">
                        <p>${recipe.step8.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `



});
