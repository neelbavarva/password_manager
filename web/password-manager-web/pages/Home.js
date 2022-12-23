import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { API } from '../API'

export default function Home() {

    const[passwords, setPasswords] = useState(null)
    const[modalInfo, setModalInfo] = useState(null)
    const[modalPassword, setModalPassword] = useState(null)
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
            console.log("Error in fetching getAllPasswords "+e);
        })
    }

    const fetchPasswordById = (e) => {
        fetch(`${API}/passwords/${e}`)
        .then(res=>res.json())
        .then(result=>{
            setModalInfo(result)
            setModalPassword(modalInfo.password)
        })
        .catch((e) => {
            console.log("Error in fetching getPasswordById "+e);
        })
    }

    const fetchDecryptPassword = () => {
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
            console.log("Error in fetching decryptPassword "+e);
        })
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
        setEKey(null)
        setEPassword(null)
        setModalPassword(null)
        setModalInfo(null)
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
                                            {decryptRender ? loading() : 
                                            <div>
                                                <div className={styles.modal_password}>
                                                    <div>
                                                        {ePassword==null ? null : ePassword=="wrong_key" ? "wrong key entered" : ePassword}
                                                    </div>
                                                    <div>
                                                        {ePassword==null ? modalInfo.password.substring(0,25) : ePassword=="wrong_key" ? modalInfo.password.substring(0,25) : null}
                                                    </div>
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
            </div>
        </>
    )
}
