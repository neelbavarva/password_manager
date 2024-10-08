import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Passwords.module.css'

export default function Passwords({counter}) {

    const[allPasswords, setAllPasswords] = useState(null)
    const[archivePasswords, setArchivePasswords] = useState(null)
    const[passwords, setPasswords] = useState(null)
    const[sPasswords, setSPasswords] = useState(null)
    const[category, setCategory] = useState("all")

    const[modalInfo, setModalInfo] = useState(null)
    const[eKey, setEKey] = useState(null)
    const[ePassword, setEPassword] = useState(null)
    const[decryptRender, setDecryptRender] = useState(false)

    const[sort, setSort] = useState(false)
    const[search, setSearch] = useState(null)
    const[copy, setCopy] = useState(false)
    
    const[API, setAPI] = useState(process.env.NEXT_PUBLIC_PROD_LINK)

    const fetchPasswords = () => {
        console.log(API)
        console.log(process.env)
        fetch(`${API}/passwords/getNonBankingPasswords`)
        .then(res=>res.json())
        .then(result=>{
            setPasswords(result)
            setAllPasswords(result)
            setSPasswords(result)
            console.log(result)
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
        setCategory(e)
        if(passwords!=null&&passwords!="network_error"){
            setPasswords(null)
            setSPasswords(null)
            if(e=="all"){
                setPasswords(allPasswords)
                setSPasswords(allPasswords)
            } else if(e=="archive"){
                setPasswords(archivePasswords)
                setSPasswords(archivePasswords)
            } else {
                let tempPasswords = [];
                allPasswords.map(item => {
                    if(item.category == e){
                        tempPasswords.push(item);
                    }
                })
                setPasswords(tempPasswords)
                setSPasswords(tempPasswords)
            }
        }
    }

    const searchPassword = (text) => {
        let dummyPasswords = []
        console.log(text)
        for(let i=0;i<sPasswords.length;i++){
            if(sPasswords[i].name.toUpperCase().includes(text.toUpperCase())){
                dummyPasswords.push(sPasswords[i])
            }
        }
        setPasswords(dummyPasswords)
    } 

    const sortPassword = () => {
        console.log("sort")
        sort ? passwords.sort((a, b) => b.name.localeCompare(a.name)) & setSort(false)
        : passwords.sort((a, b) => a.name.localeCompare(b.name)) & setSort(true)
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

    function renderCategories(){
        return(
            <div className={styles.category_container}>
                <div onClick={() => filterPassword("all")} className={`${styles.category} ${category=="all" ? styles.category_selected : null}`}>All</div>
                <div onClick={() => filterPassword("web-app")} className={`${styles.category} ${category=="web-app" ? styles.category_selected : null}`}>Web-App</div>
                <div onClick={() => filterPassword("email")} className={`${styles.category} ${category=="email" ? styles.category_selected : null}`}>Email</div>
                <div onClick={() => filterPassword("other")} className={`${styles.category} ${category=="other" ? styles.category_selected : null}`}>Others</div>
                <div onClick={() => filterPassword("archive")} className={`${styles.category} ${category=="archive" ? styles.category_selected : null}`}>Archive</div>
            </div>
        )
    }

    function renderSearch(){
        return(
            <div className={styles.search_container}>
                <div className={styles.search_input_container}>
                    <input onChange={e => setSearch(e.target.value) & searchPassword(e.target.value)} value={search} placeholder="Search passwords" />
                </div>
                <div className={styles.filter_container}>
                    <button onClick={() => search == null || search === "" ? sortPassword() : setSearch("") & setPasswords(allPasswords)}>
                        {search == null || search === "" ? <Image src={require("../public/icons/filter.svg")} />
                        : <Image src={require("../public/icons/close.svg")} />}
                    </button>
                </div>
            </div>
        )
    }

    function renderPasswords(){
        return(
            <div className={styles.password_container}>
                {passwords.map(item=>{
                    return(
                        <div key={item._id} className={styles.mItem}>
                            <a onClick={() => getModalInfo(item._id)} href="#password-modal" className={styles.password_card}>
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
                            
                            <div id="password-modal" className={styles.modal_window}>
                                <div>
                                    {modalInfo==null?null:
                                    <div className={styles.close_container}>
                                        <a onClick={() => closeModal()} href="#">
                                            <Image src={require('../public/icons/close.svg')} alt="close" />
                                        </a>
                                    </div>}
                                    {modalInfo==null? <div className={styles.modal_loader_container}>{renderMainLoader()}</div>:
                                    <div className={styles.modal_info}>
                                        <div className={styles.modal_name}>
                                            <div>
                                                <div>{modalInfo.name}</div>
                                                <div>{modalInfo.email}</div>
                                            </div>
                                        </div>
                                        <div className={styles.input_container}>
                                            <div>
                                                <input type="password" placeholder='key' value={eKey} onChange={e => setEKey(e.target.value)} />
                                                <button onClick={() => fetchDecryptPassword()}>{decryptRender ? renderLoading() : "Submit"}</button>
                                            </div>
                                            <div className={styles.modal_password}>
                                                {ePassword==null ? null : ePassword=="wrong_key" ? 
                                                <div className={styles.wrong_key}>
                                                    <div>Wrong Key Entered</div>
                                                </div> : null}
                                                {ePassword!=null && ePassword!="wrong_key" ? 
                                                <div onClick={() => navigator.clipboard.writeText(ePassword) & setCopy(true) & setTimeout(() => setCopy(false), 1000) } className={styles.decrypted_password}>
                                                    <div>{ePassword.length>12?ePassword.substring(0,12)+"...":ePassword}</div>
                                                    <button className={styles.copy_btn}>{copy ? "Copied" : "Copy"}</button>
                                                </div> : null}
                                                {ePassword==null ? 
                                                <div className={styles.encrypted_password}>
                                                    <div>{modalInfo.password.substring(0,25)}</div>
                                                </div> : null}
                                            </div>
                                        </div>
                                    </div>
                                    }      
                                </div>
                            </div>
                        </div>
                    )
                })}
                {allPasswords!=null && archivePasswords!=null ? 
                <div className={styles.total_password_detail}>
                    <div>{passwords.length} - {category=="all" ? "Total" : null} {category=="archive" ? "Archived Passwords" : "Passwords"}</div>
                    {category=="all" ? <div className={styles.archive_password_detail}>{archivePasswords.length} - Archived Passwords</div> : null}
                </div> 
                : null}
            </div>
        )
    }

    function renderLoading(){
        return(
            <span className={styles.loader}></span>
        )
    }

    function renderMainLoader(){
        return(
            <span className={styles.loader_main}></span> 
        )
    }

    return (
        <>
            <div className={styles.password_page}>
                <div className={styles.container}>
                    {renderCategories()}
                    {passwords==null ? null : renderSearch()}
                    {passwords==null ? <div className={styles.main_loading_container}>{renderMainLoader()}</div> : renderPasswords()}
                </div>
            </div>
        </>
    )
}
