import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Passwords.module.css'
import {API} from '../API'

export default function Passwords() {

    const[allPasswords, setAllPasswords] = useState(null) //fetched unarchived Passwords
    const[archivePasswords, setArchivePasswords] = useState(null) //fetched archived Passwords
    const[passwords, setPasswords] = useState(null) // rendering passwords
    const[category, setCategory] = useState("all") // current category

    const[modalInfo, setModalInfo] = useState(null)
    const[eKey, setEKey] = useState(null)
    const[ePassword, setEPassword] = useState(null)
    const[decryptRender, setDecryptRender] = useState(false)

    const fetchAllPasswords = () => {
        fetch(`${API}/passwords/getNonBankingPasswords`)
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            setPasswords(result)
            setAllPasswords(result)
        })
        .catch((e) => {
            setPasswords("network_error");
            setAllPasswords("network_error")
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

    function renderLoading(){
        return(
            <div className={styles.loading_container}>
                <div className={`${styles.loader} ${styles.center}`}>
                    <div className={styles.loader_blade}></div>
                    <div className={styles.loader_blade}></div>
                    <div className={styles.loader_blade}></div>
                    <div className={styles.loader_blade}></div>
                    <div className={styles.loader_blade}></div>
                    <div className={styles.loader_blade}></div>
                    <div className={styles.loader_blade}></div>
                    <div className={styles.loader_blade}></div>
                    <div className={styles.loader_blade}></div>
                    <div className={styles.loader_blade}></div>
                    <div className={styles.loader_blade}></div>
                    <div className={styles.loader_blade}></div>
                </div>
            </div>
        )
    }

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
                    <button>Sort</button>
                </div>
            </div>
        )
    }

    function renderHeader(){
        return(
            <div className={styles.header_container}>
                <div>
                    Your Passwords
                </div>
            </div>
        )
    }

    function renderCategory(){
        return(
            <div className={styles.category_container}>
                <div className={styles.category}>
                    All
                </div>
                <div className={styles.category}>
                    Web
                </div>
                <div className={styles.category}>
                    Email
                </div>
                <div className={styles.category}>
                    Other
                </div>
                <div className={styles.category}>
                    Archive
                </div>
            </div>
        )
    }

    function renderPasswords(){
        return(
            <div className={styles.password_container}>
                {passwords.map(item=>{
                    return(
                        <div key={item._id} className={styles.password}>
                            <div className={styles.password_info}>
                                <div>
                                    {item.name}
                                </div>
                                <div>
                                    {item.email}
                                </div>
                            </div>
                            <div>
                                <Image src={require('../public/icons/right_arrow.svg')} alt="back" />
                            </div>
                        </div>
                    )
                })}
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
            {renderCategory()}
            {passwords==null?renderLoading():renderPasswords()}
        </>
    )
}
