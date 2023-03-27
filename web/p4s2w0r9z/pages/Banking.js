import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Banking.module.css'
import {API} from '../API'

export default function Banking() {

    function renderNavigationBar(){
        return(
            <div className={styles.navigation_conatiner}>
                <div className={styles.back_container}>
                    <div>
                        <Image src={require('../public/icons/back_blue.svg')} alt="back" />
                    </div>
                    <div>
                        Back
                    </div>
                </div>
                <div className={styles.edit_container}>
                    <button>EDIT</button>
                </div>
            </div>
        )
    }

    function renderHeader(){
        return(
            <div className={styles.header_container}>
                <div>
                    Your Cards
                </div>
            </div>
        )
    }

    function renderCards(){
        return(
            <>
                <div className={styles.card_container}>
                    <div className={styles.card}>
                        <Image src={require('../public/images/sbi_visa.png')} alt="card" />
                    </div>
                    <div className={styles.card}>
                        <Image src={require('../public/images/sbi_visa.png')} alt="card" />
                    </div>
                    <div className={styles.card}>
                        <Image src={require('../public/images/sbi_visa.png')} alt="card" />
                    </div>
                    <div className={styles.card}>
                        <Image src={require('../public/images/sbi_visa.png')} alt="card" />
                    </div>
                </div>
                <div className={styles.card_slider}>
                    <span /><span /><span />
                </div>
            </>
        )
    }

    function renderPasswords(){
        return(
            <div className={styles.password_container}>
                <div className={styles.password_header}>
                    <div>Banking Passwords</div>
                    <div>Archive</div>
                </div>
                <div className={styles.password}>
                    <div className={styles.password_info}>
                        <div>
                            Google Account
                        </div>
                        <div>
                            neelbavarva5@gmail.com
                        </div>
                    </div>
                    <div>
                        <Image src={require('../public/icons/right_arrow.svg')}  alt="back" />
                    </div>
                </div>
                <div className={styles.password}>
                    <div className={styles.password_info}>
                        <div>
                            Google Account
                        </div>
                        <div>
                            neelbavarva5@gmail.com
                        </div>
                    </div>
                    <div>
                        <Image src={require('../public/icons/right_arrow.svg')}  alt="back" />
                    </div>
                </div>
                <div className={styles.password}>
                    <div className={styles.password_info}>
                        <div>
                            Google Account
                        </div>
                        <div>
                            neelbavarva5@gmail.com
                        </div>
                    </div>
                    <div>
                        <Image src={require('../public/icons/right_arrow.svg')}  alt="back" />
                    </div>
                </div>
                <div className={styles.password}>
                    <div className={styles.password_info}>
                        <div>
                            Google Account
                        </div>
                        <div>
                            neelbavarva5@gmail.com
                        </div>
                    </div>
                    <div>
                        <Image src={require('../public/icons/right_arrow.svg')}  alt="back" />
                    </div>
                </div>
                <div className={styles.password}>
                    <div className={styles.password_info}>
                        <div>
                            Google Account
                        </div>
                        <div>
                            neelbavarva5@gmail.com
                        </div>
                    </div>
                    <div>
                        <Image src={require('../public/icons/right_arrow.svg')}  alt="back" />
                    </div>
                </div>
                <div className={styles.password}>
                    <div className={styles.password_info}>
                        <div>
                            Google Account
                        </div>
                        <div>
                            neelbavarva5@gmail.com
                        </div>
                    </div>
                    <div>
                        <Image src={require('../public/icons/right_arrow.svg')}  alt="back" />
                    </div>
                </div>
                <div className={styles.password}>
                    <div className={styles.password_info}>
                        <div>
                            Google Account
                        </div>
                        <div>
                            neelbavarva5@gmail.com
                        </div>
                    </div>
                    <div>
                        <Image src={require('../public/icons/right_arrow.svg')}  alt="back" />
                    </div>
                </div>
                <div className={styles.password}>
                    <div className={styles.password_info}>
                        <div>
                            Google Account
                        </div>
                        <div>
                            neelbavarva5@gmail.com
                        </div>
                    </div>
                    <div>
                        <Image src={require('../public/icons/right_arrow.svg')}  alt="back" />
                    </div>
                </div>
                <div className={styles.password}>
                    <div className={styles.password_info}>
                        <div>
                            Google Account
                        </div>
                        <div>
                            neelbavarva5@gmail.com
                        </div>
                    </div>
                    <div>
                        <Image src={require('../public/icons/right_arrow.svg')}  alt="back" />
                    </div>
                </div>
                <div className={styles.password}>
                    <div className={styles.password_info}>
                        <div>
                            Google Account
                        </div>
                        <div>
                            neelbavarva5@gmail.com
                        </div>
                    </div>
                    <div>
                        <Image src={require('../public/icons/right_arrow.svg')}  alt="back" />
                    </div>
                </div>
                <div className={styles.password}>
                    <div className={styles.password_info}>
                        <div>
                            Google Account
                        </div>
                        <div>
                            neelbavarva5@gmail.com
                        </div>
                    </div>
                    <div>
                        <Image src={require('../public/icons/right_arrow.svg')}  alt="back" />
                    </div>
                </div>
                <div className={styles.password}>
                    <div className={styles.password_info}>
                        <div>
                            Google Account
                        </div>
                        <div>
                            neelbavarva5@gmail.com
                        </div>
                    </div>
                    <div>
                        <Image src={require('../public/icons/right_arrow.svg')}  alt="back" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head> 
            
            {renderNavigationBar()}
            {renderHeader()}
            {renderCards()}
            {renderPasswords()}
        </>
    )
}
