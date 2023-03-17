import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '@/components/Navbar'
import {API} from '../API'

export default function Home() {

    const[allPasswords, setAllPasswords] = useState(null) //fetched unarchived Passwords
    const[archivePasswords, setArchivePasswords] = useState(null) //fetched archived Passwords
    const[passwords, setPasswords] = useState(null) // rendering passwords
    const[category, setCategory] = useState("all") // current category

    const[modalInfo, setModalInfo] = useState(null)
    const[eKey, setEKey] = useState(null)
    const[ePassword, setEPassword] = useState(null)
    const[decryptRender, setDecryptRender] = useState(false)

    const fetchAllPasswords = () => {
        fetch(`${API}/passwords/getAllPasswords`)
        .then(res=>res.json())
        .then(result=>{
            setPasswords(result)
            setAllPasswords(result)
        })
        .catch((e) => {
            setPasswords("network_error");
            setAllPasswords("network_error")
        })
    }

    const fetchArchivePasswords = () => {
        fetch(`${API}/passwords/getArchivePasswords`)
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
            setCategory(e)
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

    useEffect(()=>{
        fetchAllPasswords()
        fetchArchivePasswords()
    },[])

    function getModalInfo(e){
        fetchPasswordById(e)
    }

    function closeModal(){
        setEKey(null)
        setEPassword(null)
        setModalInfo(null)
        setDecryptRender(false)
    }

    function loading(){
        return(
            <div className={`${styles.loader} ${styles.modal_loader}`}></div>
        )
    }

    function renderHeader(){
        return(
            <div>

            </div>
        )
    }

    function renderPasswords(){
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
                                        {/* <Image width={25} src={require('../public/icons/right_arrow.png')} /> */}
                                    </div>
                                </a>
                                <div id="open-modal" className={styles.modal_window}>
                                    <div>
                                        <div className={styles.close_container}>
                                            <a onClick={() => closeModal()} href="#">
                                                <Image src={require('../public/icons/close.svg')} />
                                            </a>
                                        </div>
                                        {modalInfo==null?loading():
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

                                                <div className={styles.input_container}>
                                                    <input type="password" placeholder='key' value={eKey} onChange={e => setEKey(e.target.value)} />
                                                    <button onClick={() => fetchDecryptPassword()}>submit</button>
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
            <Navbar />

            <div className={styles.container}>
                {passwords==null ? loading() : renderPasswords()}
            </div>
        </>
    )
}
