import lip_logo from '../assets/lip_logo.svg'
function Registration() {
    return (
        <div className="auth">
            <div className="auth-redirect">
                <img src={lip_logo} alt=""/>
                <p>ЛИПЕЦК | <span>NEWS</span></p>
                <form id="form-registration" action="">
                    <a className="lock-auth__form" href="/">
                        <div className="lock-auth__form-item"></div>
                        <div className="lock-auth__form-item"></div>
                    </a>
                    <h2>Регистрация</h2>
                    <div className="input-item">
                        <label htmlFor="login">Логин <span>*</span></label>
                        <input name="login" required id="login" type="text"/>
                    </div>
                    <div className="input-item">
                        <label htmlFor="password">Пароль <span>*</span></label>
                        <input name="password" required id="password" type="password"/>
                    </div>
                    <div className="input-item">
                        <label htmlFor="nick">Никнейм <span>*</span></label>
                        <input name="nickname" required id="nick" type="text"/>
                    </div>
                    <div className="input-item">
                        <label htmlFor="age">Возраст</label>
                        <input name="age" min="14" max="120" id="age" type="number"/>
                    </div>
                    <p id="description-reg"><span>*</span> - обязательно для заполнения</p>
                    <div className="button-container">
                        <button type="submit">Регистрация</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

    document.addEventListener("DOMContentLoaded", function (event) {
        if (window.location.pathname === '/registration'){
        registration()


            let header = document.querySelectorAll('.header')
            for (let i=0; i<header.length; i++){
                if (header[i]){
                    header[i].remove()
                }
            }
        }
    },false);
    function registration(){
        let form = document.querySelector('#form-registration')

        form.onsubmit = async (e) => {
            e.preventDefault();
            let formData = new FormData(form)
            formData.append('permission', '1')
            await fetch('http://API-news.loc/api/registration', {
                method: 'POST',
                body: formData
            });

            window.location.href = '/main'
        };
    }
export default Registration;
