import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo-b.png'
import github_icon from '../Assets/icons8-github-48.png'
import email_icon from '../Assets/icons8-email-48.png'
import linkedin_icon from '../Assets/icons8-linkedin-48.png'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-logo'>
            <img src={footer_logo} alt="" />
            <p>BLENDED</p>
        </div>
        <ul className="footer-links">
            <li><Link to='/News'>News</Link></li>
            <li><Link to='/'>Products</Link></li>
            <li><Link to='/offices'>Office</Link></li>
            <li><Link to='/aboutus'>About Us</Link></li>
            <li><Link to='/contactus'>Contact Us</Link></li>
        </ul>
        <div className="footer-socials-icon">
            <div className="footer-icon-container">
            <a href="https://github.com/Yagna32" target='_blank' rel='noreferrer'><img src={github_icon} alt="" /></a>
            </div>
            <div className="footer-icon-container">
            <a href="https://www.linkedin.com/in/yagna-patel-828425230/" target='_blank' rel='noreferrer'><img src={linkedin_icon} alt="" /></a>
            </div>
            <div className="footer-icon-container">
                <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=yagnapatelhirenk@gmail.com" target='_blank' rel='noreferrer'><img src={email_icon} alt="" /></a>
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @2023 - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer