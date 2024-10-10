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

window.addEventListener('load', (ev) => {
    setTimeout(() => {
        window.scrollTo(0,0)
    }, 300);
    setProps(ev);
});
window.addEventListener('resize', setProps);
function setProps() {
    let maskPositionStart = '';
    let maskPositionEnd = '';
    let maskSizeEnd = '';
    const maskSizeStart = `${window.innerWidth * 10}px`;
    const ratio = 0.706511175898931;
    const X = 0.3421875;

    const poster = document.getElementById('poster');
    const targetImgClientRect = document.getElementById('vi-img').getBoundingClientRect();

    maskPositionEnd = `${targetImgClientRect.x}px ${targetImgClientRect.y}px`;
    maskSizeEnd = `${targetImgClientRect.width}px`;
    maskPositionStart = `${targetImgClientRect.x - ((window.innerWidth * 10 * X))}px ${window.innerHeight - ((window.innerWidth * 10 * ratio) / 2)}px`
    poster.setAttribute(
        'style',
        `
            --mask-position-end: ${maskPositionEnd};
            --mask-size-end: ${maskSizeEnd};
            --mask-size-start: ${maskSizeStart};
            --mask-position-start: ${maskPositionStart};
            mask-image: url("./img/images/mask.svg");
        `
    );
}

let allowScroll = false;
let process = false;
let scrolling = false;
let isScrolling;

function onScroll(ev)  {
    console.dir(ev)
    let N;
    if(ev.deltaY > 0) {
        N = "UP"
    }
    if(ev.deltaY < 0) {
        N = "DOWN"
    }
    
    window.clearTimeout(isScrolling);
    // Set a new timeout
    isScrolling = setTimeout(function() {
        scrolling = false
    }, 100); 

    if (!allowScroll || process) {
        ev.preventDefault();
    }
    

    if (!process && window.scrollY == 0 && !poster.classList.contains('active') && N === "UP") {
        process = true
        window.scrollTo(0, 1);

        poster.addEventListener('animationend', () => {
            allowScroll = true
            process = false
        }, { once: true })

        poster.classList.remove('reverse');
        poster.classList.add('active');
    };

    if (!process && window.scrollY == 0 && poster.classList.contains('active') && N === "DOWN") {
        process = true
        allowScroll = false
        poster.addEventListener('animationend', () => {
            process = false
        }, { once: true })

        poster.classList.remove('active');
        poster.classList.add('reverse');
    };

    scrolling = true
}

window.addEventListener('wheel', onScroll, { passive: false });
// window.addEventListener('touchmove', onScroll, { passive: false });
window.addEventListener('keydown', function(e) {
    if (['ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) {
        onScroll(e);
    }
});