import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {API} from '../API'

export default function Home() {

    function renderHeader(){
        return(
            <div className={styles.header_container}>
                <div>
                    Password Manager
                </div>
                <div>
                    <Image alt='tray' src={require('../public/icons/tray.svg')} />
                </div>
            </div>
        )
    }

    function renderVaults(){
        return(
            <div>
                {/* <div className={styles.vault_container_header}>Vaults</div> */}
                <div className={styles.vault_container}>
                    <div className={styles.vault}>
                        <div>
                            <Image alt='personalized_icon' src={require('../public/icons/personalized.svg')} />
                        </div>
                        <div className={styles.vault_info}>
                            <div>
                                Personalized
                            </div>
                            <div>
                                Total Passwords: 29
                            </div>
                        </div>
                        <div>
                            <Image alt='arrow' src={require('../public/icons/right_arrow.svg')} />
                        </div>
                    </div>
                    <div className={styles.vault}>
                        <div>
                            <Image alt='arrow' src={require('../public/icons/work.svg')} />
                        </div>
                        <div className={styles.vault_info}>
                            <div>
                                Work
                            </div>
                            <div>
                                Total Passwords: 10
                            </div>
                        </div>
                        <div>
                            <Image alt='arrow' src={require('../public/icons/right_arrow.svg')} />
                        </div>
                    </div>
                    <div className={styles.vault}>
                        <div>
                            <Image alt='arrow' src={require('../public/icons/archive.svg')} />
                        </div>
                        <div className={styles.vault_info}>
                            <div>
                                Archived
                            </div>
                            <div>
                                Total Passwords: 5
                            </div>
                        </div>
                        <div>
                            <Image alt='arrow' src={require('../public/icons/right_arrow.svg')} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function renderRescentPasswords(){
        return(
            <div className={styles.password_container}>
                <div className={styles.password_header}>
                    <div>Rescently Used</div>
                    <div>Sort</div>
                </div>
                <div className={styles.password}>
                    <div className={styles.password_info}>
                        <div>
                            Google
                        </div>
                        <div>
                            neelbavarva5@gmail.com
                        </div>
                    </div>
                    <div>
                        <Image src={require('../public/icons/right_arrow.svg')} alt='arrow' />
                    </div>
                </div>
                <div className={styles.password}>
                    <div className={styles.password_info}>
                        <div>
                            Google
                        </div>
                        <div>
                            neelbavarva5@gmail.com
                        </div>
                    </div>
                    <div>
                        <Image src={require('../public/icons/right_arrow.svg')} alt='arrow' />
                    </div>
                </div>
                <div className={styles.password}>
                    <div className={styles.password_info}>
                        <div>
                            Google
                        </div>
                        <div>
                            neelbavarva5@gmail.com
                        </div>
                    </div>
                    <div>
                        <Image src={require('../public/icons/right_arrow.svg')} alt='arrow' />
                    </div>
                </div>
                <div className={styles.password}>
                    <div className={styles.password_info}>
                        <div>
                            Google
                        </div>
                        <div>
                            neelbavarva5@gmail.com
                        </div>
                    </div>
                    <div>
                        <Image src={require('../public/icons/right_arrow.svg')} alt='arrow' />
                    </div>
                </div>
                <div className={styles.password}>
                    <div className={styles.password_info}>
                        <div>
                            Google
                        </div>
                        <div>
                            neelbavarva5@gmail.com
                        </div>
                    </div>
                    <div>
                        <Image src={require('../public/icons/right_arrow.svg')} alt='arrow' />
                    </div>
                </div>
            </div>
        )
    }

    function renderActions(){
        return (
            <div className={styles.action_container}>
                <div className={styles.action_group_primary}>
                    <div className={styles.action}>
                        <div>
                            Add Password
                        </div>
                        <div>
                            <Image alt='arrow' src={require('../public/icons/key.svg')} />
                        </div>
                    </div>
                    <div className={styles.action}>
                        <div>
                            Add Card
                        </div>
                        <div>
                            <Image alt='arrow' src={require('../public/icons/card.svg')} />
                        </div>
                    </div>
                    <div className={styles.action}>
                        <div>
                            Add Category
                        </div>
                        <div>
                            <Image alt='arrow' src={require('../public/icons/category.svg')} />
                        </div>
                    </div>
                    <div className={styles.action}>
                        <div>
                            Add Vault
                        </div>
                        <div>
                            <Image alt='arrow' src={require('../public/icons/vault.svg')} />
                        </div>
                    </div>
                </div>
                <div className={styles.action_group_secondary}>
                    <div className={styles.action}>
                        <div>
                            Delete Password
                        </div>
                        <div>
                            <Image alt='arrow' src={require('../public/icons/key.svg')} />
                        </div>
                    </div>
                    <div className={styles.action}>
                        <div>
                            Delete Card
                        </div>
                        <div>
                            <Image alt='arrow' src={require('../public/icons/card.svg')} />
                        </div>
                    </div>
                    <div className={styles.action}>
                        <div>
                            Delete Category
                        </div>
                        <div>
                            <Image alt='arrow' src={require('../public/icons/category.svg')} />
                        </div>
                    </div>
                    <div className={styles.action}>
                        <div>
                            Delete Vault
                        </div>
                        <div>
                            <Image alt='arrow' src={require('../public/icons/vault.svg')} />
                        </div>
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
            
            <div>
                {renderHeader()}
                {renderVaults()}
                {renderRescentPasswords()}
                {/* {renderActions()} */}
            </div>
        </>
    )
}
