import lip_logo from '../assets/lip_logo.svg'
function Login() {
    return (
        <div className="auth">
            <div className="auth-redirect">
                <img src={lip_logo} alt=""/>
                <p>ЛИПЕЦК | <span>NEWS</span></p>
                <form id="form-login" action="">
                    <a className="lock-auth__form" href="/">
                        <div className="lock-auth__form-item"></div>
                        <div className="lock-auth__form-item"></div>
                    </a>
                    <h2>Вход</h2>
                    <div className="input-item">
                        <label htmlFor="login">Логин</label>
                        <input name="login" required id="login" type="text"/>
                    </div>
                    <div className="input-item">
                        <label htmlFor="password">Пароль</label>
                        <input name="password" required id="password" type="password"/>
                    </div>

                    <div className="button-container">
                        <button className="login-btn" type="button">Вход</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

    document.addEventListener("DOMContentLoaded", function (event) {
        if (window.location.pathname === '/login'){
        getUsers()

        let users = getUsers()
        let login = document.querySelector('#login')
        let password = document.querySelector('#password')
        let btn = document.querySelector('.login-btn')
        btn.onclick = () => {
            for (let i=0; i<users.length; i++){
                if (users[i].login === login.value && users[i].password === password.value){
                    localStorage.setItem('id', users[i].id)
                    localStorage.setItem('permission', users[i].permission)
                    window.location.pathname = '/main'
                }
                else{
                   console.log(false)
                }
            }
        };


            let header = document.querySelectorAll('.header')
            for (let i=0; i<header.length; i++){
                if (header[i]){
                    header[i].remove()
                }
            }
        }
    },false);


    function getUsers(){
        let request = new XMLHttpRequest();
        request.open('GET', "http://API-news.loc/api/get:all/from:users/id:0", false);
        request.send()
        if (request.status === 200) {
            let subjectsRequest = JSON.parse(request.response)
            return(subjectsRequest)
        } else {
            console.log('Error')
        }

    }




export default Login;
