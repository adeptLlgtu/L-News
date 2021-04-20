import lip_logo from '../assets/lip_logo.svg'
function Auth() {
    return (
        <div className="auth">
            <div className="auth-redirect">
                <img src={lip_logo} alt=""/>
                <p>ЛИПЕЦК | <span>NEWS</span></p>
                <div className="auth-redirect__button">
                    <a href="/login">Вход</a>
                    <div className="auth-redirect__button-line"></div>
                    <a href="/registration">Регистрация</a>
                </div>
            </div>
        </div>
    );
}

    document.addEventListener("DOMContentLoaded", function (event) {

        if (window.location.pathname === '/'){
            let header = document.querySelectorAll('.header')
            for (let i=0; i<header.length; i++){
                if (header[i]){
                    header[i].remove()
                }
            }
        }
    },false);








export default Auth;
