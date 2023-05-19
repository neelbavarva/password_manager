import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import {API} from '../API'

import styles from '../styles/Passwords.module.css'

export default function Passwords() {

    const[allPasswords, setAllPasswords] = useState(null) //fetched unarchived Passwords
    const[archivePasswords, setArchivePasswords] = useState(null) //fetched archived Passwords
    const[passwords, setPasswords] = useState(null) // rendering passwords

    const[modalInfo, setModalInfo] = useState(null)
    const[eKey, setEKey] = useState(null)
    const[ePassword, setEPassword] = useState(null)
    const[decryptRender, setDecryptRender] = useState(false)

    const fetchPasswords = () => {
        fetch(`${API}/passwords/getNonBankingPasswords`)
        .then(res=>res.json())
        .then(result=>{
            setPasswords(result)
            setAllPasswords(result)
        })
        .catch((e) => {
            setPasswords("network_error")
        })
    }

    const fetchArchivePasswords = () => {
        fetch(`${API}/passwords/getNonBankingArchivePasswords`)
        .then(res=>res.json())
        .then(result=>{
            setArchivePasswords(result)
        })
        .catch((e) => {
            setArchivePasswords("network_error");
        })
    }

    const fetchPasswordById = (e) => {
        fetch(`${API}/passwords/${e}`)
        .then(res=>res.json())
        .then(result=>{
            setModalInfo(result)
        })
        .catch((e) => {
            console.log("Error in Fetching /getPasswordById "+e);
        })
    }

    const fetchDecryptPassword = () => {
        if(eKey!=null && eKey!=""){
            setDecryptRender(true)
            fetch(`${API}/passwords/decryptPassword`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    "password": modalInfo.password,
                    "key": eKey
                })

            })
            .then(res=>res.json())
            .then(result=>{
                result.message==null ? setEPassword(result) : setEPassword("wrong_key")
                setDecryptRender(false)
                setEKey(null)
            })
            .catch((e) => {
                console.log("Error in Fetching /decryptPassword "+e);
            })
        }
    }

    const filterPassword = (e) => {
        if(passwords!=null&&passwords!="network_error"){
            setPasswords(null)
            if(e=="all"){
                setPasswords(allPasswords)
            } else if(e=="archive"){
                setPasswords(archivePasswords)
            } else {
                let tempPasswords = [];
                allPasswords.map(item => {
                    if(item.category == e){
                        tempPasswords.push(item);
                    }
                })
                setPasswords(tempPasswords)
            }
        }
    }

    function getModalInfo(e){
        fetchPasswordById(e)
    }

    function closeModal(){
        setEKey(null)
        setEPassword(null)
        setModalInfo(null)
        setDecryptRender(false)
    }

    useEffect(()=>{
        fetchPasswords()
        fetchArchivePasswords()
    },[])
    
    function loading(){
        return(
            <div className={styles.loader_container}>
                <span className={styles.loader}></span>
            </div>
        )
    }

    function renderHeader(){
        return(
            <div className={styles.header_container}>
                Passwords
            </div>
        )
    }

    function renderCategories(){
        return(
            <div className={styles.category_container}>
                <div onClick={() => filterPassword("all")} className={styles.category}>All</div>
                <div onClick={() => filterPassword("web-app")} className={styles.category}>Web-App</div>
                <div onClick={() => filterPassword("email")} className={styles.category}>Email</div>
                <div onClick={() => filterPassword("other")} className={styles.category}>Others</div>
                <div onClick={() => filterPassword("archive")} className={styles.category}>Archive</div>
            </div>
        )
    }

    function renderPasswords(){
        return(
            // <div className={styles.masonry}>
                <div className={styles.password_container}>
                    {passwords.map(item=>{
                        return(
                            <div key={item._id} className={styles.mItem}>
                                <a onClick={() => getModalInfo(item._id)} href="#open-modal" className={styles.password_card}>
                                    <div className={styles.password_logo}> 
                                        {item.name.substring(0,1).toUpperCase()}
                                    </div>
                                    <div className={styles.password_detail}>
                                        <div>{item.name}</div>
                                        <div>{item.email}</div>
                                    </div>
                                    <div className={styles.password_arrow}> 
                                        <Image alt='right_arrow' src={require('../public/icons/right_arrow.svg')} />
                                    </div>
                                </a>
                                
                                <div id="open-modal" className={styles.modal_window}>
                                    <div>
                                        <div className={styles.close_container}>
                                            <a onClick={() => closeModal()} href="#">
                                                <Image src={require('../public/icons/close.svg')} alt="close" />
                                            </a>
                                        </div>
                                        {modalInfo==null? renderLoading():
                                        <div className={styles.modal_info}>
                                            <div className={styles.modal_name}>
                                                {/* <Image height={100} src={require('../public/icons/user_frame.png')} /> */}
                                                <div>
                                                    <div>{modalInfo.name}</div>
                                                    <div>{modalInfo.email}</div>
                                                </div>
                                            </div>
                                            {decryptRender ? loading() : 
                                            <div>
                                                <div className={styles.input_container}>
                                                    <div>
                                                        <input type="password" placeholder='key' value={eKey} onChange={e => setEKey(e.target.value)} />
                                                        <button onClick={() => fetchDecryptPassword()}>Submit</button>
                                                    </div>
                                                    <div>                                                        
                                                        <div className={styles.modal_password}>
                                                        {ePassword==null ? null : ePassword=="wrong_key" ? 
                                                        <div className={styles.wrong_key}>
                                                            {/* <Image width={20} src={require('../public/icons/cross.png')} /> */}
                                                            <div>Wrong Key Entered</div>
                                                        </div> : null}
                                                        {ePassword!=null && ePassword!="wrong_key" ? 
                                                        <div className={styles.decrypted_password}>
                                                            {/* <Image width={30} src={require('../public/icons/done_green.png')} /> */}
                                                            <div>{ePassword}</div>
                                                        </div> : null}
                                                        {ePassword==null ? 
                                                        <div className={styles.encrypted_password}>
                                                            {/* <Image width={30} src={require('../public/icons/box.png')} /> */}
                                                            <div>{modalInfo.password.substring(0,25)}</div>
                                                        </div> : null}
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>
                                        }      
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            // </div>
        )
    }

    function renderLoading(){
        return(
            <div>
                Loading...
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Passwords</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.password_page}>
                <div className={styles.container}>
                    {renderHeader()}
                    {renderCategories()}
                    {passwords==null ? renderLoading() : renderPasswords()}
                </div>
            </div>


        </>
    )
}
