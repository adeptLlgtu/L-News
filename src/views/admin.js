
import success from '../assets/success.svg'
import bad from '../assets/bad.svg'
import search from '../assets/search.svg'

import '../assets/styles/admin.scss'
import '../assets/styles/create.scss'

import React, {useState} from "react";

const Admin = () => {
    const [input, setInput] = useState('')
    let users = getUsers()

    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value)
    }

    if(input.length > 0){
        users = users.filter((i) => {
            return i.nickname.match(input)
        })
    }

    const colorizeNick = () =>{
        let nickTd = document.querySelector('.nick-td')
        nickTd.classList = 'nick-td active-td'
    }

    return (
        <div className="main">
            <div className="scroll-container">
                <div className="main-container">
                    <h2>Администрирование учетных записей</h2>
                    <div className="tumblers">
                        <form className="search-block">
                            <input className="search-input" onFocus={colorizeNick} onChange={handleChange} value={input} placeholder="Поиск" type="text"/>
                            <img src={search} alt=""/>
                        </form>
                    </div>
                    <table className="place-table">
                        <tbody>
                        <tr>
                            <td>Логин</td>
                            <td className="nick-td">Никнэйм</td>
                            <td>Возраст</td>
                            <td>Права</td>
                        </tr>
                        </tbody>

                    </table>

                    <div className="switch-categories">
                        <div className="category all">
                            {
                                users.map((user, index) => {
                                    return(
                                        <form id={user.id} key={index}>
                                            <table className="generate-table">
                                                <tbody>
                                                    <tr>
                                                        <td><input name="login" className="form-input input-1" defaultValue={user.login} type="text"/></td>
                                                        <td><input name="nickname" className="form-input input-2" defaultValue={user.nickname} type="text"/></td>
                                                        <td><input name="age" className="form-input input-3" defaultValue={user.age} type="text"/></td>
                                                        <td><input name="permission" className="form-input input-4" defaultValue={user.permission} type="text"/></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <button type="button" className="del-user">Удалить</button>
                                            <button type="button" className="save-user">Сохранить</button>
                                        </form>
                                    )
                                })
                            }
                        </div>
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
                        <p>Вы действительно хотите удалить пользователя?</p>
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
    if(window.location.pathname === '/admin'){
        changeCategory();
        deleteUserModal();
        closeModal();
        deleteUser();
        repairUsers();

        let nickTd = document.querySelector('.nick-td')
        let searchInput = document.querySelector('.search-input')
        let body = document.querySelector('body')
        body.onclick = (e) =>{
            if(e.target !== searchInput){
                nickTd.classList = 'nick-td'
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

function changeCategory(){
    let buttons = document.querySelectorAll('.button')
    let categories = document.querySelectorAll('.category')
    categories[0].style.display = 'flex'
    for(let i=0; i<buttons.length; i++){
        buttons[i].onclick = () => {
            for(let k=0; k<buttons.length; k++){
                buttons[k].className = 'button'
                categories[k].style.display = 'none'
            }
            buttons[i].classList = 'button active-button'
            categories[i].style.display = 'flex'
        }
    }
}

function deleteUserModal(){
    let delBtn = document.querySelectorAll('.del-user')
    let backgroundModalBlock = document.querySelector('.modal-background')
    let successBlock = document.querySelector('.success-block')
    let badBlock = document.querySelector('.bad-block')
    let delBlock = document.querySelector('.delete-news')

    for (let i=0; i<delBtn.length; i++){
        delBtn[i].onclick = (e) => {
            localStorage.setItem('deleteUserId', e.target.parentNode.id)
            backgroundModalBlock.style.top = '0%'
            delBlock.style.display = 'flex'
            successBlock.style.display = 'none'
            badBlock.style.display = 'none'
        }
    }
}

function deleteUser(){
    let deleteSubmit = document.querySelector('.send-del')
    deleteSubmit.onclick = async (e) => {
        e.preventDefault();
        let deleteBlock = document.getElementById(localStorage.deleteUserId)
        deleteBlock.remove()
        let formData = new FormData()
        formData.append('id', localStorage.deleteUserId)
        // eslint-disable-next-line
        let response = await fetch('http://API-news.loc/api/delete_user', {
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

function closeModal(){
    let closeModalBtn = document.querySelector('.modal-close__btn')
    let backgroundModalBlock = document.querySelector('.modal-background')
    let discard = document.querySelector('.discard')
    closeModalBtn.onclick = () =>{
        backgroundModalBlock.style.top = '-120%'
        if (localStorage.deleteUserId){
            localStorage.removeItem('deleteUserId')
        }
    }
    discard.onclick = () =>{
        backgroundModalBlock.style.top = '-120%'
        if (localStorage.deleteUserId){
            localStorage.removeItem('deleteUserId')
        }
    }
}

function repairUsers(){
    let saveBtn = document.querySelectorAll('.save-user')
    let forms = document.querySelectorAll('form')

    for (let i=0; i<saveBtn.length; i++){
        saveBtn[i].onclick = async (e) => {
            e.preventDefault();
            console.log(forms[i+1])
            let formData = new FormData(forms[i+1])
            formData.append('id', forms[i+1].id)
            // eslint-disable-next-line
            let response = await fetch('http://API-news.loc/api/repair_users', {
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
}




export default Admin;
