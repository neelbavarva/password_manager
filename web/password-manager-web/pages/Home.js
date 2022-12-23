import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
var CryptoJS = require("crypto-js");

export default function Home() {

    const[passwords, setPasswords] = useState(null)
    const[modalInfo, setModalInfo] = useState(null)
    const[modalPassword, setModalPassword] = useState(null)
    const[eKey, setEKey] = useState(null)
    const[ePassword, setEPassword] = useState(null)
    const[sample, setSample] = useState(null)

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

    const fetchPasswordById = (e) => {
        fetch(`https://password-manager-xpkf.onrender.com/passwords/${e}`)
        .then(res=>res.json())
        .then(result=>{
            setModalInfo(result)
            setModalPassword(modalInfo.password)
        })
        .catch((e) => {
            console.log("Error in fetching getPasswordById "+e);
        })
    }

    function decryptPassword(){
        const bytes = CryptoJS.AES.decrypt(modalInfo.password.toString(), eKey.toString());
        console.log(bytes)
        
        // if(bytes.sigBytes >= 0){
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
            setEPassword(decryptedData)
        // }
    }

    useEffect(()=>{
        fetchAllPasswords()
        // setSample(CryptoJS.AES.encrypt(JSON.stringify("op"), "9427").toString())
        // console.log(JSON.parse(CryptoJS.AES.decrypt(sample.toString(), "9427").toString(CryptoJS.enc.Utf8)))
    },[])

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

    function getModalInfo(e){
        fetchPasswordById(e)
    }
    function closeModal(){
        setModalInfo(null)
        setModalPassword(null)
    }

    function loading(){
        return(
            <div className={styles.loader}></div>
        )
    }

    function renderAllPasswords(){
        return(
            <div className={styles.masonry}>
                <div>
                    {passwords.map(item=>{
                        return(
                            <div key={item._id} className={styles.mItem}>
                                <a onClick={() => getModalInfo(item._id)} href="#open-modal" className={styles.password_container}>
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
                                        <div className={styles.close_container}>
                                            <a onClick={() => closeModal()} href="#">Close</a>
                                        </div>
                                        {modalInfo==null?loading():
                                        <div className={styles.modal_info}>
                                            <div className={styles.modal_name}>
                                                <div>{modalInfo.name}</div>
                                                <div>{modalInfo.email}</div>
                                            </div>
                                            <div className={styles.modal_password}>
                                                <div>
                                                    {ePassword==null ? null : ePassword}
                                                </div>
                                                <div>
                                                    {modalInfo.password}
                                                </div>
                                            </div>

                                            <div>
                                                <input value={eKey} onChange={e => setEKey(e.target.value)} />
                                                <button onClick={() => decryptPassword()}>decrypt</button>
                                            </div>
                                        </div>
                                        }      
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
                {passwords==null?loading():renderAllPasswords()}
            </div>
        </>
    )
}
