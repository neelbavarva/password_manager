import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Banking.module.css'

export default function Banking({counter}) {

    const[allPasswords, setAllPasswords] = useState(null)
    const[archivePasswords, setArchivePasswords] = useState(null)
    const[passwords, setPasswords] = useState(null)
    const[category, setCategory] = useState("all")
    const[cards, setCards] = useState(null)

    const[modalInfo, setModalInfo] = useState(null)
    const[eKey, setEKey] = useState(null)
    const[ePassword, setEPassword] = useState(null)
    const[decryptRender, setDecryptRender] = useState(false)
    const[copy, setCopy] = useState(false)

    const[API, setAPI] = useState(process.env.NEXT_PUBLIC_PROD_LINK)

    const fetchPasswords = () => {
        fetch(`${API}/passwords/getBankingPasswords`)
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
        fetch(`${API}/passwords/getBankingArchivePasswords`)
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

    const fetchCards = () => {
        fetch(`${API}/cards/getCards`)
        .then(res=>res.json())
        .then(result=>{
            setCards(result)
        })
        .catch((e) => {
            setCards("network_error")
        })
    }

    const filterPassword = (e) => {
        setCategory(e)
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
        fetchCards()
    },[])

    function renderCards(){
        return(
            <div className={styles.card_container}>
                {cards.map(item=> {
                    return(
                        <div key={item._id} className={styles.card}>
                            <div className={styles.card_header}>
                                <div>{item.cardName}</div>
                                <div>{item.bankName}</div>
                            </div>
                            <div className={styles.card_number}>
                                <div>xxxxxxxx{item.number.substring(8,12)}</div>
                            </div>
                            <div className={styles.card_info}>
                                <div>CVV: xxx</div>
                                <div>Expires on: xx/xx</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    function renderCategories(){
        return(
            <div className={styles.category_container}>
                <div onClick={() => filterPassword("all")} className={`${styles.category} ${category=="all" ? styles.category_selected : null}`}>All</div>
                <div onClick={() => filterPassword("archive")} className={`${styles.category} ${category=="archive" ? styles.category_selected : null}`}>Archive</div>
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
                                            <div>                                                        
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
                    {passwords==null||cards==null ? 
                        <div className={styles.main_loading_container}>
                            {renderMainLoader()}
                        </div> : 
                        <div>
                            {renderCards()}
                            {renderCategories()}
                            {renderPasswords()}
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
