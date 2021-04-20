import './App.scss';
import './assets/styles/auth.scss'

import './assets/styles/header.scss'
import './assets/styles/magazine.scss'
import './assets/styles/main.scss'
import './assets/styles/footer.scss'
import './assets/styles/styles.scss'

import left_bg from './assets/background-left.png'
import right_bg from './assets/background-right.png'

import Main from './views/main'
import Auth from './views/Auth'
import Login from './views/Login'
import Registration from './views/Registration'
import Header from './components/Header'
import Create from "./views/createNews";
import Magazine from "./views/Magazine";
import Admin from './views/admin'
import {SyncLoader} from "react-spinners";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header>

      </Header>
        <Router>
            <Switch>
                <Route exact path="/" component={Auth} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registration" component={Registration} />
                <Route exact path="/main" component={Main} />
                <Route exact path="/create" component={Create} />
                <Route exact path="/magazine" component={Magazine} />
                <Route exact path="/admin" component={Admin} />
            </Switch>
        </Router>
        <div className="back">
            <img className="bg-img" src={left_bg} alt=""/>
            <img className="bg-img" src={right_bg} alt=""/>
        </div>
        <div id="loading">
            <SyncLoader color="#00C2FF" loading />
        </div>
    </div>
  );
}

function onReady(callback) {
    let intervalId = window.setInterval(function() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
        }
    }, 1000);
}
function setVisible(selector, visible) {
    document.querySelector(selector).style.opacity = visible ? '1' : '0';
    document.querySelector(selector).style.zIndex = visible ? '100' : '-9999';
}
onReady(function() {
    setVisible('.App', true);
    setVisible('#loading', false);
    let body = document.querySelector('body')
    if (body.scrollWidth<=425){
        setTimeout(()=>{
            document.querySelector('#loading').style.display = 'none';
        }, 500)
    }
});

export default App;
