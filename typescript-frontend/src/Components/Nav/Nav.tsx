/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import styles from './Nav.module.css';

import { useNavigate } from "react-router-dom";

import * as data from './links.json';
import * as adminData from './adminlinks.json';

const linkString = JSON.stringify(data);
const links = JSON.parse(linkString).links;

const adminLinkString = JSON.stringify(adminData);
const adminLinks = JSON.parse(adminLinkString).links;

type Link = {
    label: string,
    href: string
}

const Links: React.FC<{ links: Link[]}> = ({ links }) => {
    return (
        <div className={styles['links-container']}>
            {links.map((link: Link) => {
                return (
                    <div key={link.href} className={styles['link']}>
                        <a href={link.href}>
                            {link.label}
                        </a>
                    </div>
                )
            })}
        </div>
    )
}

const Nav: React.FC<{ right: number }> = ({ right }) => {
    const navigate = useNavigate();
 
    const logoutEmployee = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    if(right === 2) {
        return (
            <div className={styles.navbar}> 
                <Links links={adminLinks} />           
                <div className={styles['logo-container']}>
                    <span onClick={logoutEmployee}>Log out</span>
                </div>
            </div>
      )
    }else {
        return (
            <div className={styles.navbar}> 
                <Links links={links} />           
                <div className={styles['logo-container']}>
                    <span onClick={logoutEmployee}>Log out</span>
                </div>
            </div>
      )
    }
  }
  

export default Nav