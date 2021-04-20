import logo from '../assets/lip_logo.svg'
import exit from '../assets/exit.svg'

function Header() {
    return (
        <div className="header">
            <a href="/main" className="header-title">
                <img src={logo} alt=""/>
                <p>ЛИПЕЦК | <span>NEWS</span></p>
            </a>
            <div className="header-links">
                <a id="main" href="/main" className="header-links__item">Главная</a>
                <div className="link-line"></div>
                <a id="create" href="/create" className="header-links__item">Добавить новость</a>
                <a id="magazine" href="/magazine" className="header-links__item">Журнал</a>
                <a id="admin" href="/admin" className="header-links__item">Администрирование</a>
                <a className="exit-link" href="/"><img src={exit} alt=""/></a>
            </div>


        </div>
    );
}

document.addEventListener("DOMContentLoaded", function (event) {
    if (window.location.pathname === '/main'){
        let exitBtn = document.querySelector('.exit-link')
        exitBtn.onclick = () =>{
            localStorage.clear()
        }
    }
    if (window.location.pathname === '/main' || window.location.pathname === '/create' || window.location.pathname === '/admin' || window.location.pathname === '/magazine'){
        const root = localStorage.permission
        let links = document.querySelectorAll('.header-links__item')
        let linkLine = document.querySelector('.link-line')

        if (root === '10'){
            links[1].remove();
            links[2].remove();
            linkLine.style.display = 'block'
        }

        if (root === '9'){
            links[3].remove();
            linkLine.style.display = 'block'
        }

        if (root !== '9' && root !== '10'){
            links[1].remove();
            links[2].remove();
            links[3].remove();
            linkLine.style.display = 'none'
        }
    }
},false);



export default Header;
