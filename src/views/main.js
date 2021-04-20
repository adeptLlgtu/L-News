import usd from '../assets/USD.svg'
import eur from '../assets/EUR.svg'
function Main() {
    return (
        <div className="main">
            <div className="news-background">
                <div className="news-full__container">
                    <div className="close-full__news-btn">
                        <div className="close-full__news-btn__item"></div>
                        <div className="close-full__news-btn__item"></div>
                    </div>
                    <div className="generate-full-news__container"></div>
                </div>
            </div>
            <div className="scroll-container">
                <div className="main-container">
                    <div className="main-container__curs">
                        <div className="curs-menu">
                            <div className="curs-menu__usd">
                                <img src={usd} alt=""/>
                            </div>
                            <div className="curs-menu__eur">
                                <img src={eur} alt=""/>
                            </div>
                        </div>
                    </div>
                    <h2 className="main-page__section-title">Важные новости</h2>
                    <div className="main-news__container"></div>
                    <h2 className="main-page__section-title">Новости недели</h2>
                    <div className="all-news__container"></div>
                </div>
            </div>
        </div>



    );
}

document.addEventListener("DOMContentLoaded", function (event) {
    if(window.location.pathname === '/main'){
        getMoney();
        createMoneyStat();
        createDate();
        getNews();
        createMainNews();
        getFullNews();
        closeFullNews()

    }

},false);

function getMoney(){
    let request = new XMLHttpRequest();
    request.open('GET', "https://www.cbr-xml-daily.ru/daily_json.js", false);
    request.send()
    if (request.status === 200) {
        let subjectsRequest = JSON.parse(request.response)
        return(subjectsRequest)
    } else {
        console.log('Error')
    }
}
function createMoneyStat(){
    let cursMenuUSD = document.querySelector('.curs-menu__usd')
    let cursMenuEUR = document.querySelector('.curs-menu__eur')

    let moneyData = getMoney()
    let cursUSD = moneyData.Valute.USD.Value
    let cursEUR = moneyData.Valute.EUR.Value

    cursMenuUSD.insertAdjacentHTML('beforeend', '<p class="valute">'+cursUSD+'</p>')
    cursMenuEUR.insertAdjacentHTML('beforeend', '<p class="valute">'+cursEUR+'</p>')


}
function createDate(){
    let cursBlock = document.querySelector('.main-container__curs')
    let Data = new Date();
    let Year = Data.getFullYear();
    let Month = Data.getMonth();
    let Day = Data.getDate();

    let fMonth = ''
    // eslint-disable-next-line
    switch (Month)
    {
        case 0: fMonth="января"; break;
        case 1: fMonth="февраля"; break;
        case 2: fMonth="марта"; break;
        case 3: fMonth="апреля"; break;
        case 4: fMonth="мае"; break;
        case 5: fMonth="июня"; break;
        case 6: fMonth="июля"; break;
        case 7: fMonth="августа"; break;
        case 8: fMonth="сентября"; break;
        case 9: fMonth="октября"; break;
        case 10: fMonth="ноября"; break;
        case 11: fMonth="декабря"; break;
    }

    // eslint-disable-next-line
    cursBlock.insertAdjacentHTML('beforeend', '<p class="curs-date">'+Day+" "+fMonth+" "+Year+" "+"года"+'</p>')
}
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
function createMainNews(){
    let newsData = getNews()
    let mainNewsBlock = document.querySelector('.main-news__container')
    let allNewsContainer = document.querySelector('.all-news__container')
    for (let i=0; i<newsData.length; i++){
        if (newsData[i].famous === true){
            mainNewsBlock.insertAdjacentHTML('beforeend', '<p id="'+i+'" class="main-news__item">'+newsData[i].title+'</p>')
        }
        else{
            allNewsContainer.insertAdjacentHTML('beforeend', '<div id="'+i+'" class="all-news__container-item"><img src="'+newsData[i].img_source+'" alt=""><p class="news-title">'+newsData[i].title+'</p><p class="news-date">'+newsData[i].public_date+'</p></div>')
        }
    }
}
function getFullNews(){
    let newsItem = document.querySelectorAll('.all-news__container-item')
    let newsBackground = document.querySelector('.news-background')
    let generateFullNewsContainer = document.querySelector('.generate-full-news__container')
    let mainNewsItems = document.querySelectorAll('.main-news__item')
    let newsData = getNews()
    for (let i=0; i<newsItem.length; i++){
        newsItem[i].onclick = () =>{
            newsBackground.style.top = '0%'
            generateFullNewsContainer.insertAdjacentHTML('beforeend', '<div class="top-info-block"><p class="top-info-block__text">'+newsData[newsItem[i].id].public_date+'</p><p class="top-info-block__text">'+newsData[newsItem[i].id].author_name+'</p></div><p class="full-news__title">'+newsData[newsItem[i].id].title+'</p><img class="full-news__img" src="'+newsData[newsItem[i].id].img_source+'" alt=""><p class="full-news__description">'+newsData[newsItem[i].id].description+'</p>')
        }
    }
    for (let i=0; i<mainNewsItems.length; i++){
        mainNewsItems[i].onclick = () =>{
            newsBackground.style.top = '0%'
            generateFullNewsContainer.insertAdjacentHTML('beforeend', '<div class="top-info-block"><p class="top-info-block__text">'+newsData[mainNewsItems[i].id].public_date+'</p><p class="top-info-block__text">'+newsData[mainNewsItems[i].id].author_name+'</p></div><p class="full-news__title">'+newsData[mainNewsItems[i].id].title+'</p><img class="full-news__img" src="'+newsData[mainNewsItems[i].id].img_source+'" alt=""><p class="full-news__description">'+newsData[mainNewsItems[i].id].description+'</p>')
        }
    }
}
function closeFullNews(){
    let newsBackground = document.querySelector('.news-background')
    let closeBtnFullNews = document.querySelector('.close-full__news-btn')
    let generateFullNewsContainer = document.querySelector('.generate-full-news__container')

    closeBtnFullNews.onclick = () =>{
        newsBackground.style.top = '-120%'
        generateFullNewsContainer.innerHTML = ''

    }

}



export default Main;
