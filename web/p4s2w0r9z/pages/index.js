import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Index.module.css';
import Passwords from '@/components/Passwords';
import Banking from '@/components/Banking';
import Manage from '@/components/Manage';
import { authenticator } from 'otplib';
import { HiSwitchHorizontal } from "react-icons/hi";
import { AiOutlineReload } from "react-icons/ai";
import Expense from '@/components/Expense';

export default function Home() {

    // State
    const [app, setApp] = useState("p4s2w0r9z")
    const [currentPage, setCurrentPage] = useState("Passwords");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [counter, setCounter] = useState(300);

    const [secretKey, setSecretKey] = useState('LRLAGLSKEZXVAGYZ');
    const [otpValue, setOtpValue] = useState('');
    const [isLocal, setIsLocal] = useState(false);

    const [API, setAPI] = useState(process.env.NEXT_PUBLIC_PROD_LINK);
    const [DB, setDB] = useState(null);

    // Ref
    const passwordInputRef = useRef(null);

    const fetchDB = () => {
        fetch(`${API}/getDBDetail`)
            .then(res => res.json())
            .then(result => {
                setDB(result[0]);
            })
            .catch((e) => {
                setDB("network_error");
            });
    };

    // Effects
    useEffect(() => {
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        setIsLocal(isLocalhost);
        !isLocalhost ? passwordInputRef.current.focus() : null;
        fetchDB()
        const timer = setInterval(() => {
            setCounter((prevCounter) => prevCounter - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (counter === 0) {
          window.location.reload();
        }
    }, [counter]);

    // Event Handlers
    const handleEnterKeyPress = (event) => {
        if (otpValue.length === 6) {
            document.getElementById('submitButton').click();
            generateTOTP()
        }
    };

    // Function to generate TOTP code
    const generateTOTP = () => {
        setIsLoading(true)
        if (secretKey) {
            const generatedOTP = authenticator.generate(secretKey);
            verifyTOTP(generatedOTP);
        } else {
            console.error('Secret key is missing. Please generate a secret key.');
            setIsLoading(false)
        }
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };

    const verifyTOTP = (generatedOTP) => {
        if (otpValue && generatedOTP) {
            const isValidOTP = authenticator.verify({ token: otpValue, secret: secretKey });
    
            if (isValidOTP) {
                setIsAuthenticated(true)
            } else {
                setOtpValue("")
            }
            setIsLoading(false)
        } else {
            console.log('Please generate OTP and enter a valid OTP to verify.');
            setIsLoading(false)
        }
    };

    // Functions
    const authenticateUser = () => {
        setIsLoading(true);
        fetch(`${API}/getAuthentication`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: passwordInput })
        })
        .then(response => response.json())
        .then(result => {
            result ? setIsAuthenticated(true) : setPasswordInput("");
        })
        .catch(error => {
            console.error("Error in user authentication", error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const renderAuthenticationContainer = () => (
        <div className={styles.authPage}>
            <div className={styles.authPageContainer}>
                <div className={styles.authDetail}>
                    <Image width="300" src={require("../public/icons/logo.png")} />
                </div>
                <div className={styles.authContainer}>
                    <input
                        ref={passwordInputRef}
                        onKeyPress={handleEnterKeyPress()}
                        value={otpValue}
                        onChange={(e) => setOtpValue(e.target.value)}
                        placeholder='Enter your password'
                    />
                    <button id="submitButton" disabled={isLoading} onClick={generateTOTP}>
                        {isLoading ? renderLoadingIndicator() : "Submit"}
                    </button>
                </div>
                <div className={styles.authPageInfo}>
                    <div>
                        <Image width="15" src={require("../public/icons/google.svg")} />
                    </div>
                    <div>
                        Use Google Authenticator to access
                    </div>
                </div>
                <div className={styles.contact}>
                    Contact @neelbavarva for more
                </div>
            </div>
        </div>
    );

    function renderHeader(){
        return(
            <div className={`${styles.header_container}`}>
                <div>
                    <div className={DB==null ? null : DB.dbType=="PROD" ? styles.prod_green : DB.dbType=="DEV_TEST" ? styles.prod_blue : styles.prod_red}>
                        <div>{app=="p4s2w0r9z"?"Passwords":"Expenses"}</div> 
                        <button onClick={() => app=="p4s2w0r9z" ? setApp("e7p3n8ez") : setApp("p4s2w0r9z")}><HiSwitchHorizontal /></button>
                    </div>
                </div>
                <div>
                    <div>
                        <div>Time Remaining {formatTime(counter)}</div> 
                        <button onClick={() => setCounter(300)}><AiOutlineReload /></button>
                    </div>
                </div>
            </div>
        )
    }

    const renderPasswordApplication = () => (
        <div className={styles.container}>
            {renderHeader()}
            {currentPage === "Passwords" && <Passwords />}
            {currentPage === "Banking" && <Banking />}
            {currentPage === "Manage" && <Manage />}
            {renderNavigationBar()}
        </div>
    );

    const renderExpenseApplication = () => (
        <div className={styles.container}>
            {renderHeader()}
            {<Expense />}
        </div>
    );

    const renderNavigationBar = () => (
        <div className={styles.container}>
            <div className={`${styles.navbar}`}>
                <a className={currentPage === "Passwords" ? styles.navSelected : null} onClick={() => setCurrentPage("Passwords")}>Passwords</a>
                <a className={currentPage === "Banking" ? styles.navSelected : null} onClick={() => setCurrentPage("Banking")}>Banking</a>
                <a className={currentPage === "Manage" ? styles.navSelected : null} onClick={() => setCurrentPage("Manage")}>Manage</a>
            </div>
        </div>
    );

    const renderLoadingIndicator = () => (
        <span className={styles.loader}></span>
    );

    // Render
    return (
        <>
        <Head>
            <title>Passwords</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {(isLocal ? true : isAuthenticated) ? app=="p4s2w0r9z" ? renderPasswordApplication() : renderExpenseApplication() : renderAuthenticationContainer()}
        </>
    );
}
