export default function headerShow() {
    const header = document.createElement('header');

    header.classList.add('header');

    header.innerHTML = `            
    <div class="container">
        <div class="header__block">
            <div class="header__btn--play">Play</div>
            <a href="index.html" class="header__btn--exit">Exit</a>
            <input class="header__input" type="text" placeholder="Nickname">
        </div>
        <div class="header__logo"><a href="index.html"><img src="img/logo/logo.png" alt="logo"></a></div>
        <div class="header__block">
            <div class="header__btn"><a href="controls.html">Controls</a></div>
            <div class="header__btn"><a href="rating.html">Leaderboards</a></div>
        </div>
    </div>
    `;

    document.querySelector('.wrapper').prepend(header);
}
headerShow();