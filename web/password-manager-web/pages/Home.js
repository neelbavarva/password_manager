import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { API } from '../API'

export default function Home() {

    const[passwords, setPasswords] = useState(null)
    const[modalInfo, setModalInfo] = useState(null)
    const[eKey, setEKey] = useState(null)
    const[ePassword, setEPassword] = useState(null)
    const[decryptRender, setDecryptRender] = useState(false)

    const fetchAllPasswords = () => {
        fetch(`${API}/passwords/getAllPasswords`)
        .then(res=>res.json())
        .then(result=>{
            setPasswords(result)
        })
        .catch((e) => {
            console.log("Error in Fetching /getAllPasswords "+e);
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

    useEffect(()=>{
        fetchAllPasswords()
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
                    <div>web_app</div>
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
                <div className={styles.category}>
                    <div><Image width={35} src={require('../public/icons/archive.png')} /></div>
                    <div>archive</div>
                </div>
            </div>
        )
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

    function loading(){
        return(
            <div className={`${styles.loader} ${styles.modal_loader}`}></div>
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
                                                <Image height={100} src={require('../public/icons/user_frame.png')} />
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
                                                        <Image width={20} src={require('../public/icons/cross.png')} />
                                                        <div>Wrong Key Entered</div>
                                                    </div> : null}
                                                    {ePassword!=null && ePassword!="wrong_key" ? 
                                                    <div className={styles.decrypted_password}>
                                                        <Image width={30} src={require('../public/icons/done_green.png')} />
                                                        <div>{ePassword}</div>
                                                    </div> : null}
                                                    {ePassword==null ? 
                                                    <div className={styles.encrypted_password}>
                                                        <Image width={30} src={require('../public/icons/box.png')} />
                                                        <div>{modalInfo.password.substring(0,25)}</div>
                                                    </div> : null}
                                                </div>

                                                <div className={styles.input_container}>
                                                    <input type="password" placeholder='key' value={eKey} onChange={e => setEKey(e.target.value)} />
                                                    <button onClick={() => fetchDecryptPassword()}><Image width={20} src={require('../public/icons/right_arrow.png')} /></button>
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
                <title>Password Manager</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.container}>
                
                <Header />
                {renderCategories()}
                {passwords==null?loading():renderAllPasswords()}

                <div className={styles.copyright}>
                    {(new Date().getFullYear())} © <a target="_blank" rel="noreferrer"  href="https://neelbavarva.tech/">Neel Bavarva</a> — Be kind to each other.
                </div>
            </div>
        </>
    )
}
