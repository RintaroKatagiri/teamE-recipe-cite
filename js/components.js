// コンポーネントを読み込む関数
function loadComponent(elementId, url) {
    console.log(`Loading component: ${elementId} from ${url}`);
    const element = document.getElementById(elementId);
    
    if (!element) {
        console.error(`Element with id '${elementId}' not found.`);
        return;
    }

    fetch(url)
        .then(response => {
            console.log(`Fetch response for ${url}:`, response);
            if (!response.ok) {
                throw new Error(`Error loading component: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            element.innerHTML = data;
            
            // 年を現在の年に更新
            const yearElement = element.querySelector('#current-year');
            if (yearElement) {
                const currentYear = new Date().getFullYear();
                yearElement.textContent = currentYear;
            }
            
            // 最終更新日を設定（必要に応じてカスタマイズ）
            const updateElement = element.querySelector('#last-update');
            if (updateElement) {
                const today = new Date();
                const year = today.getFullYear();
                const month = today.getMonth() + 1; // 月は0から始まるため+1
                const day = today.getDate();
                updateElement.textContent = `${year}年${month}月${day}日`;
            }
        })        .catch(error => {
            console.error('Failed to load component:', error);
            element.innerHTML = `<p>コンポーネントの読み込みに失敗しました。エラー: ${error.message}</p>`;
            
            // デバッグ情報を表示
            console.log('Current page URL:', window.location.href);
            console.log('Attempted to load component from:', url);
        });
}

// フッターのHTML内容を変数として定義
const footerHTML = `
<footer>
    <div class="footer-container">
        <div class="footer-section">            <h3>味彩（あじさい）</h3>
            <p>美味しいレシピと最新フード情報をお届けします</p>
        </div>
        <div class="footer-section">
            <h3>ニュースカテゴリー</h3>
            <ul>
                <li><a href="#">食材トレンド</a></li>
                <li><a href="#">イベント情報</a></li>
                <li><a href="#">新製品レビュー</a></li>
                <li><a href="#">専門家コラム</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h3>購読する</h3>
            <p>最新ニュースを毎週お届けします</p>
            <div class="newsletter">
                <input type="email" placeholder="メールアドレス">
                <button>登録</button>
            </div>
        </div>
    </div>
    <div class="copyright">
        <p>&copy; <span id="current-year">2025</span> 味彩（あじさい） ニュース編集部 All Rights Reserved.</p>
        <p>最終更新：<span id="last-update">2025年6月20日</span></p>
    </div>
</footer>
`;

// コメントフォームのHTML内容を変数として定義
const commentFormHTML = `
<!-- いいねボタンとカウンターの追加 -->
<div class="like-section">
    <button id="like-button" class="like-button">
        <i class="like-icon">♥</i>
        <span>いいね!</span>
    </button>
    <span id="like-counter" class="like-counter">0</span>
    <span class="like-text">人が「いいね」しました</span>
</div>

<!-- コメントフォームの追加 -->
<div class="comment-section">
    <h3>コメントを残す</h3>
    <form id="comment-form">
        <div class="form-group">
            <label for="comment-name">お名前（ニックネーム）</label>
            <input type="text" id="comment-name" name="name" placeholder="お名前またはニックネーム" required>
        </div>
        <div class="form-group">
            <label for="comment-email">メールアドレス（非公開）</label>
            <input type="email" id="comment-email" name="email" placeholder="メールアドレス" required>
        </div>
        <div class="form-group">
            <label for="comment-text">コメント</label>
            <textarea id="comment-text" name="comment" rows="4" placeholder="コメントを入力してください" required></textarea>
        </div>
        <button type="submit" class="comment-submit">コメントを投稿</button>
    </form>
</div>

<!-- コメント表示エリア -->
<div id="comments-container">
    <h3>コメント一覧</h3>
    <div class="comments-list">
        <!-- コメントはJavaScriptによって動的に挿入されます -->
    </div>
</div>
`;

// ページ読み込み完了時にコメントフォームを挿入する
document.addEventListener('DOMContentLoaded', function() {
    // フッターの挿入は footer.js で処理するため、こちらでは行わない
    // footer.jsとの競合を避けるため、フッター挿入処理を無効化
    // const footerPlaceholder = document.getElementById('footer-placeholder');
    // if (footerPlaceholder) {
    //     footerPlaceholder.innerHTML = footerHTML;
    //     
    //     // 年を現在の年に更新
    //     const yearElement = footerPlaceholder.querySelector('#current-year');
    //     if (yearElement) {
    //         const currentYear = new Date().getFullYear();
    //         yearElement.textContent = currentYear;
    //     }
    //     
    //     // 最終更新日を設定
    //     const updateElement = footerPlaceholder.querySelector('#last-update');
    //     if (updateElement) {
    //         const today = new Date();
    //         const year = today.getFullYear();
    //         const month = today.getMonth() + 1; // 月は0から始まるため+1
    //         const day = today.getDate();
    //         updateElement.textContent = `${year}年${month}月${day}日`;
    //     }
    // } else {
    //     console.error('Footer placeholder element not found');
    // }
    
    // コメントフォームの挿入
    const commentPlaceholder = document.getElementById('comment-placeholder');
    if (commentPlaceholder) {
        commentPlaceholder.innerHTML = commentFormHTML;
        
        // いいね機能の初期化
        initLikeButton();
        
        // コメントフォームの初期化
        initCommentForm();
    }
});

// いいねボタンの初期化と機能追加
function initLikeButton() {
    const likeButton = document.getElementById('like-button');
    const likeCounter = document.getElementById('like-counter');
    
    if (!likeButton || !likeCounter) return;
    
    // ローカルストレージから状態を復元
    const pageUrl = window.location.pathname;
    const storageKey = `liked_${pageUrl}`;
    const likeCount = localStorage.getItem(`likeCount_${pageUrl}`) || 0;
    
    // カウンターを更新
    likeCounter.textContent = likeCount;
    
    // いいね済みの場合はスタイルを適用
    if (localStorage.getItem(storageKey) === 'true') {
        likeButton.classList.add('liked');
    }
    
    // いいねボタンのクリックイベント
    likeButton.addEventListener('click', function() {
        const isLiked = likeButton.classList.contains('liked');
        
        if (isLiked) {
            // いいねを取り消す
            likeButton.classList.remove('liked');
            let count = parseInt(likeCounter.textContent) - 1;
            if (count < 0) count = 0;
            likeCounter.textContent = count;
            localStorage.setItem(`likeCount_${pageUrl}`, count);
            localStorage.removeItem(storageKey);
        } else {
            // いいねする
            likeButton.classList.add('liked');
            const count = parseInt(likeCounter.textContent) + 1;
            likeCounter.textContent = count;
            localStorage.setItem(`likeCount_${pageUrl}`, count);
            localStorage.setItem(storageKey, 'true');
        }
    });
}

// コメントフォームの初期化と機能追加
function initCommentForm() {
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');
    
    if (!commentForm || !commentsContainer) return;
    
    // コメント送信処理
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームからデータを取得
        const name = document.getElementById('comment-name').value;
        const email = document.getElementById('comment-email').value;
        const text = document.getElementById('comment-text').value;
        
        // 現在の日付を取得
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const formattedDate = `${year}年${month}月${day}日`;
        
        // コメントのHTMLを作成
        const commentHTML = `
            <div class="comment">
                <div class="comment-header">
                    <span class="comment-author">${escapeHTML(name)}</span>
                    <span class="comment-date">${formattedDate}</span>
                </div>
                <div class="comment-body">
                    <p>${escapeHTML(text)}</p>
                </div>
            </div>
        `;
        
        // コメント一覧の先頭に追加
        const commentsList = document.querySelector('.comments-list');
        if (commentsList) {
            commentsList.insertAdjacentHTML('afterbegin', commentHTML);
        }
        
        // フォームをリセット
        commentForm.reset();
        
        // ローカルストレージにコメントを保存
        saveComment(name, email, text, formattedDate);
    });
    
    // 保存済みのコメントを読み込む
    loadComments();
}

// HTMLの特殊文字をエスケープする関数
function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// コメントをローカルストレージに保存する関数
function saveComment(name, email, text, date) {
    const pageUrl = window.location.pathname;
    const storageKey = `comments_${pageUrl}`;
    
    // 現在のコメントを取得
    let comments = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    // 新しいコメントを追加
    comments.unshift({
        name: name,
        email: email,
        text: text,
        date: date
    });
    
    // 最大20件まで保存
    if (comments.length > 20) {
        comments = comments.slice(0, 20);
    }
    
    // ローカルストレージに保存
    localStorage.setItem(storageKey, JSON.stringify(comments));
}

// 保存済みのコメントを読み込む関数
function loadComments() {
    const pageUrl = window.location.pathname;
    const storageKey = `comments_${pageUrl}`;
    
    // ローカルストレージからコメントを取得
    const comments = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    // コメント一覧の要素を取得
    const commentsList = document.querySelector('.comments-list');
    if (!commentsList) return;
    
    // コメント一覧をクリア
    commentsList.innerHTML = '';
    
    // コメントがない場合の表示
    if (comments.length === 0) {
        commentsList.innerHTML = '<p class="no-comments">まだコメントはありません。最初のコメントを投稿しましょう！</p>';
        return;
    }
    
    // コメントをHTMLに挿入
    comments.forEach(function(comment) {
        const commentHTML = `
            <div class="comment">
                <div class="comment-header">
                    <span class="comment-author">${escapeHTML(comment.name)}</span>
                    <span class="comment-date">${comment.date}</span>
                </div>
                <div class="comment-body">
                    <p>${escapeHTML(comment.text)}</p>
                </div>
            </div>
        `;
        
        commentsList.insertAdjacentHTML('beforeend', commentHTML);
    });
}
