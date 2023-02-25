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

const Nav: React.FC<{}> = () => {
  return (
        <div className={styles.navbar}>
            <div className={styles['logo-container']}>
                Logo
            </div>
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
        </div>
    )
}

export default Nav