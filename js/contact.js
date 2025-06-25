document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (event) => {
        const confirmLeave = confirm("フォームの内容は送信されず、削除されます。よろしいですか？");
        if (!confirmLeave) {
            event.preventDefault(); 
        }
    });
});

document.querySelector('form').addEventListener('submit', (event)=> {
    const confirmSubmit = confirm("フォームを送信しますか？");
    if (!confirmSubmit) {
        event.preventDefault(); 
    }
});