import success from '../assets/success.svg'
import bad from '../assets/bad.svg'
import '../assets/styles/create.scss'
function Create() {
    return (
        <div className="main">
            <div className="scroll-container">
                <div className="main-container">
                    <h2>Создание новости</h2>
                    <form action="">
                        <div className="top-form__block">
                            <div className="top-form__block-item">
                                <label htmlFor="public_date">Дата публикации</label>
                                <input name="public_date" required id="public_date" type="text"/>
                            </div>
                            <div className="top-form__block-item">
                                <label htmlFor="author">Автор</label>
                                <input name="author_name" required id="author" type="text"/>
                            </div>
                        </div>
                        <div className="input-block">
                            <label htmlFor="title">Заголовок</label>
                            <input name="title" required id="title" type="text"/>
                        </div>
                        <div className="input-block">
                            <label htmlFor="img">Изображение (адрес)</label>
                            <input name="img_source" required id="img" type="text"/>
                        </div>
                        <div className="input-block">
                            <label htmlFor="description">Содержание</label>
                            <textarea required className="mail" id="description" name="description"></textarea>
                        </div>
                        <div className="flag-block">
                            <input type="checkbox" className="custom-checkbox" id="video-flag" name="video_flag"/>
                                <label htmlFor="video-flag">Видео-новость</label>
                                <input type="checkbox" className="custom-checkbox" id="disclamer" name="disclamer"/>
                                <label htmlFor="disclamer">18+</label>
                            <input type="checkbox" className="custom-checkbox" id="famous" name="famous"/>
                            <label htmlFor="famous">Важная</label>
                        </div>
                        <div className="for-button__block">
                            <button className="public-button">Опубликовать</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal-background">
                <div className="modal-item">
                    <div className="modal-close__btn">
                        <div className="modal-close__btn-item"></div>
                        <div className="modal-close__btn-item"></div>
                    </div>
                    <div className="modal-result success-block">
                        <img src={success} alt=""/>
                        <p>Статья успешно опубликована</p>
                    </div>
                    <div className="modal-result bad-block">
                        <img src={bad} alt=""/>
                        <p>Что-то пошло не так. Попробуйте повторить позднее</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

document.addEventListener("DOMContentLoaded", function (event) {
    if(window.location.pathname === '/create'){
        closeModal();
        let form = document.querySelector('form')
        let sendBtn = document.querySelector('.public-button')
        sendBtn.onclick = async (e) => {
            e.preventDefault();
            let formData = new FormData(form)
            formData.append('author_id', localStorage.id)
            // eslint-disable-next-line
            let response = await fetch('http://API-news.loc/api/createNews', {
                method: 'POST',
                body: formData
            });
            let backgroundModalBlock = document.querySelector('.modal-background')
            let successBlock = document.querySelector('.success-block')
            let badBlock = document.querySelector('.bad-block')
            if (response.status === 200) {
                backgroundModalBlock.style.top = '0%'
                successBlock.style.display = 'flex'
                badBlock.style.display = 'none'
            } else {
                backgroundModalBlock.style.top = '0%'
                badBlock.style.display = 'flex'
                successBlock.style.display = 'none'
            }
        };

    }

},false);


function closeModal(){
    let closeModalBtn = document.querySelector('.modal-close__btn')
    let backgroundModalBlock = document.querySelector('.modal-background')
    closeModalBtn.onclick = () =>{
        backgroundModalBlock.style.top = '-120%'
    }
}

export default Create;
