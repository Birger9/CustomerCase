/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import styles from './Nav.module.css';

import * as data from './links.json';
const linkString = JSON.stringify(data);
const links = JSON.parse(linkString).links;

type Link = {
    label: string,
    href: string
}

const Links: React.FC<{ links: Link[] }> = ({ links }) => {
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

const Nav: React.FC<{}> = () => {
    return (
          <div className={styles.navbar}> 
              <Links links={links}/>           
              <div className={styles['logo-container']}>
                  <span>Log out</span>
              </div>
          </div>
      )
  }
  

export default Nav