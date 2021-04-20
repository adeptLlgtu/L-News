
import success from '../assets/success.svg'
import bad from '../assets/bad.svg'
import repair from '../assets/repair-news.svg'
import deleteBtn from '../assets/delete-btn.svg'
import '../assets/styles/create.scss'
function Magazine() {
    return (
        <div className="main">
            <div className="repair-menu">
                <div className="repair-menu__container">
                    <div className="close-menu__btn">
                        <div className="close-menu__btn-item"></div>
                        <div className="close-menu__btn-item"></div>
                    </div>
                    <form action="">
                        <div className="repair-menu__container-generate">

                        </div>

                        <div className="for-button__block">
                            <button className="public-button">Опубликовать</button>
                        </div>
                    </form>
                </div>

            </div>
            <div className="scroll-container">
                <div className="main-container">
                    <h2>Журнал новостей</h2>
                    <div className="magazine-container">

                    </div>
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
                        <p>Данные сохранены</p>
                    </div>
                    <div className="modal-result bad-block">
                        <img src={bad} alt=""/>
                        <p>Что-то пошло не так. Попробуйте повторить позднее</p>
                    </div>
                    <div className="modal-result delete-news">
                        <img src={bad} alt=""/>
                        <p>Вы действительно хотите удалить новость?</p>
                        <div className="delete-news__buttons">
                            <button className="send-del">Да</button>
                            <button className="discard">Отмена</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

document.addEventListener("DOMContentLoaded", function (event) {
    if(window.location.pathname === '/magazine'){

        getNews();
        createMagazine();
        getRepairMenu();
        closeRepairMenu();
        closeModal();
        deleteNewsModal();
        delNews();

        let magazineItem = document.querySelectorAll('.magazine-item')
        for(let a=0; a<magazineItem.length; a++){
            if(a%2){
                magazineItem[a].style.background = '#ffffff'
            }
        }

    }

},false);


function getNews(){
    let request = new XMLHttpRequest();
    request.open('GET', "http://API-news.loc/api/from:news", false);
    request.send()
    if (request.status === 200) {
        let subjectsRequest = JSON.parse(request.response)
        return(subjectsRequest)
    } else {
        console.log('Error')
    }
}

function deleteNewsModal(){
    let delBtn = document.querySelectorAll('.magazine-news__img')
    let backgroundModalBlock = document.querySelector('.modal-background')
    let delBlock = document.querySelector('.delete-news')
    let successBlock = document.querySelector('.success-block')
    let badBlock = document.querySelector('.bad-block')

    for (let i=0; i<delBtn.length; i++){
        delBtn[i].onclick = () =>{
            localStorage.setItem('delFlag', delBtn[i].parentNode.parentNode.getAttribute('id'))
            backgroundModalBlock.style.top = '0%'
            delBlock.style.display = 'flex'
            successBlock.style.display = 'none'
            badBlock.style.display = 'none'
        }
    }
}

function delNews(){
    let delBtn = document.querySelector('.send-del')
    delBtn.onclick = async (e) => {
        e.preventDefault();
        let deleteBlock = document.getElementById(localStorage.delFlag)
        deleteBlock.remove()
        let formData = new FormData()
        formData.append('id', localStorage.delFlag)
        // eslint-disable-next-line
        let response = await fetch('http://API-news.loc/api/delete_news', {
            method: 'POST',
            body: formData
        });
        let backgroundModalBlock = document.querySelector('.modal-background')
        let successBlock = document.querySelector('.success-block')
        let badBlock = document.querySelector('.bad-block')
        let delBlock = document.querySelector('.delete-news')
        if (response.status === 200) {
            backgroundModalBlock.style.top = '0%'
            successBlock.style.display = 'flex'
            badBlock.style.display = 'none'
            delBlock.style.display = 'none'
        } else {
            backgroundModalBlock.style.top = '0%'
            badBlock.style.display = 'flex'
            successBlock.style.display = 'none'
            delBlock.style.display = 'none'
        }
    };
}



function createMagazine(){
    const newsData = getNews()
    let magazineContainer = document.querySelector('.magazine-container')
    for (let i=0; i<newsData.length; i++){
        if (newsData[i].author_id===localStorage.id){
            magazineContainer.insertAdjacentHTML('beforeend', '<div id="'+newsData[i].id+'" class="magazine-item"><p class="magazine-news__title">'+newsData[i].title+'</p><p class="magazine-news__public-date">'+newsData[i].public_date+'</p><p class="magazine-news__text">'+newsData[i].description+'</p><div class="magazine-news__img-block"><img title="Редактировать" class="magazine-news__img-repair" src="'+repair+'" alt=""><img title="Удалить статью" class="magazine-news__img" src="'+deleteBtn+'" alt=""></div></div>')
        }
        else {
            console.log(false)
        }
    }
}
function getRepairMenu(){
    const newsData = getNews()
    let repairMenu = document.querySelector('.repair-menu')
    let repairBtns = document.querySelectorAll('.magazine-news__img-repair')
    let generateContainer = document.querySelector('.repair-menu__container-generate')
    for (let i=0; i<repairBtns.length; i++){
        repairBtns[i].onclick = () =>{
            let idData = repairBtns[i].parentNode.parentNode.getAttribute('id')
            for(let k=0; k<newsData.length; k++){
                if(newsData[k].id===idData.toString()){
                    localStorage.setItem('item', idData)
                    console.log(repairBtns[i].parentNode.parentNode.id)
                    console.log(newsData[k])

                    let videoFlag = newsData[k].video_flag
                    let disclaimerFlag = newsData[k].disclamer
                    let famousFlag = newsData[k].famous

                    console.log(newsData[k].video_flag + '\n' + newsData[k].disclamer + '\n' +newsData[k].famous)


                    if(videoFlag===true){
                        videoFlag='checked'
                    }
                    else{
                        videoFlag=''
                    }

                    if(disclaimerFlag===true){
                        disclaimerFlag='checked'
                    }
                    else{
                        disclaimerFlag=''
                    }

                    if(famousFlag===true){
                        famousFlag='checked'
                    }
                    else{
                        famousFlag=''
                    }

                    generateContainer.insertAdjacentHTML('afterbegin', '<input value="'+newsData[k].id+'" name="id" class="id-str" required id="id" type="number"><div class="top-form__block">\n' +
                        '                        <div class="top-form__block-item">\n' +
                        '                            <label for="public_date">Дата публикации</label>\n' +
                        '                            <input value="'+newsData[k].public_date+'" name="public_date" required id="public_date" type="text">\n' +
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                    <div class="input-block">\n' +
                        '                        <label for="title">Заголовок</label>\n' +
                        '                        <input value="'+newsData[k].title+'" name="title" required id="title" type="text">\n' +
                        '                    </div>\n' +
                        '                    <div class="input-block">\n' +
                        '                        <label for="img">Изображение (адрес)</label>\n' +
                        '                        <input value="'+newsData[k].img_source+'" name="img_source" required id="img" type="text">\n' +
                        '                    </div>\n' +
                        '                    <div class="input-block">\n' +
                        '                        <label for="description">Содержание</label>\n' +
                        '                        <textarea required class="mail" id="description" name="description">'+newsData[k].description+'</textarea>\n' +
                        '                    </div>\n' +
                        '                    <div class="flag-block">\n' +
                        '                        <input '+videoFlag+' type="checkbox" class="custom-checkbox" id="video-flag" name="video_flag">\n' +
                        '                        <label for="video-flag">Видео-новость</label>\n' +
                        '                        <input '+disclaimerFlag+' type="checkbox" class="custom-checkbox" id="disclamer" name="disclamer">\n' +
                        '                        <label for="disclamer">18+</label>\n' +
                        '                        <input '+famousFlag+' type="checkbox" class="custom-checkbox" id="famous" name="famous">\n' +
                        '                        <label for="famous">Важная</label>\n' +
                        '                    </div>')
                    repairMenu.style.top = '0%'
                    console.log(1)
                }
                else{



                }



            }

        }
    }
    let form = document.querySelector('form')
    let sendBtn = document.querySelector('.public-button')
    sendBtn.onclick = async (e) => {
        e.preventDefault();
        let formData = new FormData(form)
        let videoFlag = document.querySelector('#video-flag')
        let disclamer = document.querySelector('#disclamer')
        let famous = document.querySelector('#famous')
        formData.delete('video_flag')
        formData.delete('disclamer')
        formData.delete('famous')
        formData.delete('author_name')
        formData.append('video_flag', videoFlag.checked)
        formData.append('disclamer', disclamer.checked)
        formData.append('famous', famous.checked)
        formData.append('author_id', localStorage.id)
        // eslint-disable-next-line
        let response = await fetch('http://API-news.loc/api/repair_news', {
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
function closeRepairMenu(){
    let repairMenu = document.querySelector('.repair-menu')
    let closeBtn = document.querySelector('.close-menu__btn')
    let generateContainer = document.querySelector('.repair-menu__container-generate')

    closeBtn.onclick = () =>{
        repairMenu.style.top = '-120%'
        generateContainer.innerHTML = ''
    }

}
function closeModal(){
    let closeModalBtn = document.querySelector('.modal-close__btn')
    let backgroundModalBlock = document.querySelector('.modal-background')
    let discard = document.querySelector('.discard')
    closeModalBtn.onclick = () =>{
        backgroundModalBlock.style.top = '-120%'
        if (localStorage.delFlag){
            localStorage.removeItem('delFlag')
        }
    }
    discard.onclick = () =>{
        backgroundModalBlock.style.top = '-120%'
        if (localStorage.delFlag){
            localStorage.removeItem('delFlag')
        }
    }

}

export default Magazine;
