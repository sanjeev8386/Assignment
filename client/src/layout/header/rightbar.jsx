import React, { Fragment, useState, useEffect } from 'react';
import man from '../../../public/assets/images/User.jpg'
import { FileText, LogIn, Mail, User, MessageSquare, Bell, Minimize, Search, ShoppingCart, Minus, Plus, X } from 'react-feather';
import { useNavigate } from 'react-router-dom'

import Bookmark from "../../layout/bookmark"
import {Link} from 'react-router-dom'

import {English,Deutsch,Español,Français,Português,简体中文,Notification,DeliveryProcessing,OrderComplete,TicketsGenerated,DeliveryComplete,CheckAllNotification,ViewAll,MessageBox,EricaHughes,KoriThomas,Admin,Account,Inbox,Taskboard,LogOut,AinChavez,CheckOut,ShopingBag,OrderTotal,GoToShopingBag} from '../../constant'



const Rightbar = (props) => {    

  
  const navigate = useNavigate();
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('')
  const [searchresponsive, setSearchresponsive] = useState(false)
  const [langdropdown, setLangdropdown] = useState(false)
  const [moonlight, setMoonlight] = useState(false)
  const [selected, setSelected] = useState("en")
  const [cartDropdown, setCartDropDown] = useState(false)
  const [notificationDropDown, setNotificationDropDown] = useState(false)
  const [chatDropDown, setChatDropDown] = useState(false)
  
  // auth0 profile
  const logout = () => {
    localStorage.removeItem('loginUser');
    window.location.reload();
  };
  const authenticated = JSON.parse(localStorage.getItem("authenticated"));
  const auth0_profile = JSON.parse(localStorage.getItem("auth0_profile"))

  const handleSetLanguage = (key) => {
    setSelected(key)
  };

  useEffect(() => {
    setProfile(localStorage.getItem('profileURL') || man);
    setName(localStorage.getItem('Name'))
    if(localStorage.getItem("layout_version") === "dark-only"){
      setMoonlight(true)
    }
  }, []);

  const Logout_From_Firebase = () => {
    logout()
  }

  const  Logout_From_Auth0 = () =>  {
    logout()
  }

  const RedirectToChats = () => {
    navigate(`/app/chat-app`)
  }

  const RedirectToCart = () => {
    navigate(`/app/ecommerce/cart`)
  }

  const UserMenuRedirect = (redirect) => {
    navigate(redirect)
  }

  //full screen function
  function goFull() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const SeacrhResposive = (searchresponsive) => {
    if (searchresponsive) {
      setSearchresponsive(!searchresponsive)
      document.querySelector(".search-full").classList.add("open");
      document.querySelector(".more_lang").classList.remove("active");
    } else {
      setSearchresponsive(!searchresponsive)
      document.querySelector(".search-full").classList.remove("open");
    }
  }

  const LanguageSelection = (language) => {
    if (language) {
      setLangdropdown(!language)
    } else {
      setLangdropdown(!language)
    }
  }

  const MoonlightToggle = (light) => {
    if (light) {
      setMoonlight(!light)
      document.body.className = "light"
      localStorage.setItem('layout_version', 'light');
    } else {
      setMoonlight(!light)
      document.body.className = "dark-only"
      localStorage.setItem('layout_version', 'dark-only');
    }
  }

  return (
    <Fragment>
      <div className="nav-right col-12 pull-right right-header p-0">
        <ul className="nav-menus">
          <li><span className="header-search"><Search onClick={() => SeacrhResposive(searchresponsive)} /></span></li>
          <li className="onhover-dropdown">
            <div className="notification-box" onClick={() => setNotificationDropDown(!notificationDropDown)}><Bell /><span className="badge badge-pill badge-secondary">2</span></div>
            <ul className={`notification-dropdown onhover-show-div ${notificationDropDown ? "active" : ""}`}>
              <li>
                <Bell />
                <h6 className="f-18 mb-0">{Notification}</h6>
              </li>
              <li>
                <p><i className="fa fa-circle-o mr-3 font-primary"> </i>{DeliveryProcessing} <span className="pull-right">{"10 min."}</span></p>
              </li>
              <li>
                <p><i className="fa fa-circle-o mr-3 font-success"></i>{OrderComplete}<span className="pull-right">{"1 hr"}</span></p>
              </li>
              <li>
                <p><i className="fa fa-circle-o mr-3 font-info"></i>{TicketsGenerated}<span className="pull-right">{"3 hr"}</span></p>
              </li>
              <li>
                <p><i className="fa fa-circle-o mr-3 font-danger"></i>{DeliveryComplete}<span className="pull-right">{"6 hr"}</span></p>
              </li>
              <li><button className="btn btn-primary" >{CheckAllNotification}</button>
              </li>
            </ul>
          </li>
          <li>
            <div className="mode" onClick={() => MoonlightToggle(moonlight)}><i className={`fa ${moonlight ? 'fa-lightbulb-o' : 'fa-moon-o'}`}></i></div>
          </li>
          <li className="onhover-dropdown" onClick={() => setChatDropDown(!chatDropDown)}><MessageSquare />
            <ul className={`chat-dropdown onhover-show-div ${chatDropDown ? "active" : ""}`}>
              <li>
                <MessageSquare />
                <h6 className="f-18 mb-0">{MessageBox}</h6>
              </li>
              <li onClick={RedirectToChats}>
                <div className="media"><img className="img-fluid rounded-circle mr-3" src="../../assets/images/user/1.jpg" alt="" />
                  <div className="status-circle online"></div>
                  <div className="media-body"><span>{EricaHughes}</span>
                    <p>{"Lorem Ipsum is simply dummy..."}</p>
                  </div>
                  <p className="f-12 font-success">{"58 mins ago"}</p>
                </div>
              </li>
              <li onClick={RedirectToChats}>
                <div className="media"><img className="img-fluid rounded-circle mr-3" src="../../assets/images/user/2.jpg" alt="" />
                  <div className="status-circle online"></div>
                  <div className="media-body"><span>{KoriThomas}</span>
                    <p>{"Lorem Ipsum is simply dummy..."}</p>
                  </div>
                  <p className="f-12 font-success">{"1 hr ago"}</p>
                </div>
              </li>
              <li onClick={RedirectToChats}>
                <div className="media"><img className="img-fluid rounded-circle mr-3" src="../../assets/images/user/4.jpg" alt="" />
                  <div className="status-circle offline"></div>
                  <div className="media-body"><span>{AinChavez}</span>
                    <p>{"Lorem Ipsum is simply dummy..."}</p>
                  </div>
                  <p className="f-12 font-danger">{"32 mins ago"}</p>
                </div>
              </li>
              <li className="text-center"> <button className="btn btn-primary">{ViewAll}     </button></li>
            </ul>
          </li>
          <li className="maximize"><a className="text-dark" href="#javascript" onClick={goFull}><Minimize /></a></li>
          <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
              <img className="b-r-10" src={authenticated ? auth0_profile.picture : profile} alt="" />
              <div className="media-body"><span>{authenticated ? auth0_profile.name :  name}</span>
                <p className="mb-0 font-roboto">{Admin} <i className="middle fa fa-angle-down"></i></p>
              </div>
            </div>
            <ul className="profile-dropdown onhover-show-div">
              <li onClick={() => UserMenuRedirect(`/app/users/userProfile`)}><User /><span>{Account} </span></li>
              <li onClick={() => UserMenuRedirect(`/app/email-app`)}><Mail /><span>{Inbox}</span></li>
              <li onClick={() => UserMenuRedirect(`/app/todo-app/todo`)}><FileText /><span>{Taskboard}</span></li>
              <li onClick={authenticated ? Logout_From_Auth0 : Logout_From_Firebase}><LogIn /><span>{LogOut}</span></li>
            </ul>
          </li>
        </ul>
      </div>
    </Fragment>

  );
}
export default Rightbar;