function toggleModal() {
    const modal = document.getElementById('modal');
    const iframe = document.getElementById('youtube-player-dialog');
    if(!modal.classList.contains('active')) {
        iframe.src = 'https://www.youtube.com/embed/QdBZY2fkU-0?rel=0&amp;autoplay=1&amp;playlist=QdBZY2fkU-0&amp;controls=1&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fwww.rockstargames.com&amp;widgetid=2';
    } else {
        iframe.src = '';
    }
    modal.classList.toggle('active');
}

document.getElementById('poster__btn').addEventListener('click', toggleModal);
document.getElementById('main-btn').addEventListener('click', toggleModal);
document.getElementById('modal__btn').addEventListener('click', toggleModal);

// -----------------------------

function toggleDropDown() {
    document.getElementById('lang-btn').classList.toggle('active');
    document.getElementById('lang-list').classList.toggle('active');
}

document.getElementById('lang-btn').addEventListener('click', toggleDropDown);

// -----------------------------

// function start() {
//     document.getElementById('poster').classList.add('active');
// }
// document.getElementById('poster-scroll').addEventListener('click', start);