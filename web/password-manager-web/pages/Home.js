import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
var CryptoJS = require("crypto-js");

export default function Home() {

    const[passwords, setPasswords] = useState(null)

    const fetchAllPasswords = () => {
        fetch(`https://password-manager-xpkf.onrender.com/passwords/getAllPasswords`)
        .then(res=>res.json())
        .then(result=>{
            setPasswords(result)
        })
        .catch((e) => {
            console.log("Error in fetching getAllPasswords "+e);
        })
    }

    useEffect(()=>{
        fetchAllPasswords()
    },[])

    function renderLoading(){
        return(
            <div className={styles.loader}>
                L#@D!N$......
            </div>
        )
    }

    function renderCategories(){
        return(
            <div className={styles.category_container}>
                <div className={styles.category}>
                    <div><Image width={35} src={require('../public/icons/all.png')} /></div>
                    <div>all</div>
                </div>
                <div className={styles.category}>
                    <div><Image width={35} src={require('../public/icons/web_app.png')} /></div>
                    <div>web-app</div>
                </div>
                <div className={styles.category}>
                    <div><Image width={35} src={require('../public/icons/email.png')} /></div>
                    <div>email</div>
                </div>
                <div className={styles.category}>
                    <div><Image width={35} src={require('../public/icons/banking.png')} /></div>
                    <div>banking</div>
                </div>
                <div className={styles.category}>
                    <div><Image width={35} src={require('../public/icons/other.png')} /></div>
                    <div>other</div>
                </div>
            </div>
        )
    }

    function setModalInfo(e){

    }

    function renderAllPasswords(){
        return(
            <div className={styles.masonry}>
                <div>
                    {passwords.map(item=>{
                        return(
                            <div key={item._id} className={styles.mItem}>
                                <a onClick={setModalInfo(item._id)} href="#open-modal" className={styles.password_container}>
                                    <div className={styles.password_name}>
                                        <div>{item.name}</div>
                                        <div>{item.email}</div>
                                    </div>
                                    <div>
                                        <Image width={25} src={require('../public/icons/right_arrow.png')} />
                                    </div>
                                </a>
                                <div id="open-modal" className={styles.modal_window}>
                                    <div>
                                        <a href="#">Close</a>
                                        <h1>{item.name}</h1>
                                        <div>A CSS-only modal based on the :target pseudo-class. Hope you find it helpful.</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Password Manager</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.container}>
                <Header />
                {renderCategories()}
                {passwords==null?renderLoading():renderAllPasswords()}
            </div>
        </>
    )
}
