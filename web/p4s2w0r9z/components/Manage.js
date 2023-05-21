import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import {API} from '../API'

import styles from '../styles/Manage.module.css'

export default function Manage() {

    const[allPasswords, setAllPasswords] = useState(null)
    const[archivePasswords, setArchivePasswords] = useState(null)
    const[passwords, setPasswords] = useState(null)
    const[dcategory, setDCategory] = useState("all")

    const[category, setCategory] = useState("addPassword")
    const[backup, setBackup] = useState(true)
    const[fieldError, setFieldError] = useState(false)
    const[submitProcess, setSubmitProcess] = useState(false)

    //password
    const[pName, setPName] = useState(null)
    const[pEmail, setPEmail] = useState(null)
    const[pCategory, setPCategory] = useState("all")
    const[pPassword, setPPassword] = useState(null)
    const[pKey, setPKey] = useState(null)
    const[pArchive, setPArchive] = useState("No")

    const[modalInfo, setModalInfo] = useState(null)
    const[eKey, setEKey] = useState(null)
    const[ePassword, setEPassword] = useState(null)
    const[decryptRender, setDecryptRender] = useState(false)

    const addNewPassword = () => {
        if (pName==null||pEmail==null||pCategory==null||pPassword==null||pKey==null||pArchive==null){
            setFieldError(true)
        } else {
            setFieldError(false)
            setSubmitProcess(true)
            fetch("https://password-manager-xpkf.onrender.com/passwords/newPassword",{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    "name": pName.trim(),
                    "email": pEmail.trim(),
                    "password": pPassword.trim(),
                    "key": pPassword.trim(),
                    "category": pCategory.trim(),
                    "archive": pArchive
                })

            })
            .then(res=>res.json())
            .then(result=>{
                renderCancel()
                setSubmitProcess(false)
            })
            .catch((e) => {
                console.log("Error in POST password " + e);
            })
        }
    }

    const fetchPasswords = () => {
        fetch(`${API}/passwords/getAllPasswords`)
        .then(res=>res.json())
        .then(result=>{
            setPasswords(result)
            setAllPasswords(result)
        })
        .catch((e) => {
            setPasswords("network_error")
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
        fetch(`${API}/passwords/getAllPasswords`)
        .then(res=>res.json())
        .then(result=>{})
        .catch((e) => {})
    },[])

    function selectCategory(){
        pCategory=="all"?setPCategory("web-app")
        : pCategory=="web-app"?setPCategory("email")
        : pCategory=="email"?setPCategory("banking")
        : pCategory=="banking"?setPCategory("other")
        : pCategory=="other"?setPCategory("archive")
        : pCategory=="archive"?setPCategory("all"):null
    }

    function renderCancel(){
        setPName(null)
        setPEmail(null)
        setPCategory("all")
        setPPassword(null)
        setPKey(null)
        setPArchive("No")
    }
   
    function renderHeader(){
        return(
            <div className={styles.header_container}>
                Manage
            </div>
        )
    }

    function renderCategories(){
        return(
            <div className={styles.category_container}>
                <div onClick={() => setCategory("addPassword")} className={`${styles.category} ${category=="addPassword" ? styles.category_selected : null}`}>Add Password</div>
                <div onClick={() => setCategory("deletePassword")} className={`${styles.category} ${category=="deletePassword" ? styles.category_selected : null}`}>Delete Password</div>
                <div className={`${styles.category}`}>Add Card</div>
                <div className={`${styles.category}`}>Delete Card</div>
            </div>
        )
    }

    function renderBackup(){
        return(
            <div className={styles.backup_container}>
                <div onClick={() => setBackup(true)} className={`${styles.backup} ${backup ? styles.backup_selected : null}`}>With Backup</div>
                <div onClick={() => setBackup(false)} className={`${styles.backup} ${!backup ? styles.backup_selected : null}`}>Without Backup</div>
            </div>
        )
    }
    
    function renderAddPassword(){
        return(
            <div className={styles.addPassword_container}>
                <div className={styles.input_container}>
                    <div>name</div>
                    <input onChange={e => setPName(e.target.value)} value={pName} />
                </div>
                <div className={styles.input_container}>
                    <div>email</div>
                    <input onChange={e => setPEmail(e.target.value)} value={pEmail} />
                </div>
                <div className={styles.input_container}>
                    <div>category</div>
                    <div onClick={() => selectCategory()} className={styles.touchable_field}>{pCategory}</div>
                </div>
                <div className={styles.input_container}>
                    <div>password</div>
                    <input onChange={e => setPPassword(e.target.value)} value={pPassword} />
                </div>
                <div className={styles.input_container}>
                    <div>key</div>
                    <input onChange={e => setPKey(e.target.value)} value={pKey} />
                </div>
                <div className={styles.input_container}>
                    <div>archive</div>
                    <div onClick={() => pArchive=="No" ? setPArchive("Yes") : setPArchive("No") } className={styles.touchable_field}>{pArchive}</div>
                </div>
                <button onClick={() => renderCancel()} className={styles.cancel_btn}>Cancel</button>
                <button onClick={() => addNewPassword()} className={`${styles.submit_btn} ${fieldError?styles.btn_warning:null}`}>{submitProcess?"Processing...":"Submit"}</button>
            </div>
        )
    }

    function renderPasswords(){
        return(
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
                                            <div>
                                                <div>Delete {modalInfo.name} ?</div>
                                                <div>{modalInfo.email}</div>
                                            </div>
                                        </div>
                                        <button>Delete</button>
                                    </div>
                                    }      
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    function renderDeletePassword(){
        return(
            <div>
                {passwords==null ? null : renderPasswords()}
            </div>
        )
    }

    function renderLoading(){
        return(
            <div></div>
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
                    {category=="addPassword" && renderBackup()}
                    {category=="addPassword" && renderAddPassword()}
                    {category=="deletePassword" && renderDeletePassword()}
                </div>
            </div>
        </>
    )
}
