import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Manage.module.css'
import {API} from '../API'

export default function Manage() {

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

    function loading(){
        return(
            <div className={styles.loader_container}>
                <span className={styles.loader}></span>
            </div>
        )
    }

    function renderCategories(){
        return(
            <div className={styles.category_container}>
                <div className={`${styles.category} ${category=="all" ? styles.selected_category : null}`} onClick={() => filterPassword("all")}>
                    <div>😄</div>
                    <div>add Password</div>
                </div>
                <div className={`${styles.category} ${category=="web-app" ? styles.selected_category : null}`} onClick={() => filterPassword("web-app")}>
                    <div>🌐</div>
                    <div>add Card</div>
                </div>
                <div className={`${styles.category} ${category=="email" ? styles.selected_category : null}`} onClick={() => filterPassword("email")}>
                    <div>📨</div>
                    <div>delete Password</div>
                </div>
                <div className={`${styles.category} ${category=="banking" ? styles.selected_category : null}`} onClick={() => filterPassword("banking")}>
                    <div>🏦</div>
                    <div>delete Card</div>
                </div>
            </div>
        )
    }

    function addPassword(){
        return(
            <div className={styles.addPassword_container}>
                <div className={styles.button_info_container}>
                    <button>Category</button>
                    <button>Archive</button>
                    <button>With Backup</button>
                </div>
                <div className={styles.input_flex}>
                    <div className={styles.input_field}>
                        <label>name</label>
                        <input />
                    </div>
                    <div className={styles.input_field}>
                        <label>email</label>
                        <input />
                    </div>
                </div>
                <div className={styles.input_flex}>
                    <div className={styles.input_field}>
                        <label>category</label>
                        <input />
                    </div>
                    <div className={styles.input_field}>
                        <label>archive</label>
                        <input />
                    </div>
                </div>
                <div className={styles.input_flex}>
                    <div className={styles.input_field}>
                        <label>password</label>
                        <input />
                    </div>
                    <div className={styles.input_field}>
                        <label>key</label>
                        <input />
                    </div>
                </div>
                <div className={styles.button_container}>
                    <button>Clear All</button>
                    <button>Submit</button>
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
            <div className={styles.container}>
                {renderCategories()}
                {addPassword()}
            </div>
        </>
    )
}
