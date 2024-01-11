import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Index.module.css';
import { API } from '../API';
import Passwords from '@/components/Passwords';
import Banking from '@/components/Banking';
import Manage from '@/components/Manage';
import { authenticator } from 'otplib';

export default function Home() {

    // State
    const [currentPage, setCurrentPage] = useState("Passwords");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");

    const [secretKey, setSecretKey] = useState('LRLAGLSKEZXVAGYZ');
    const [otpValue, setOtpValue] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');

    // Ref
    const passwordInputRef = useRef(null);

    // Effects
    useEffect(() => {
        passwordInputRef.current.focus();
    }, []);

    // Event Handlers
    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
            document.getElementById('submitButton').click();
        }
    };

    // Function to generate TOTP code
    const generateTOTP = () => {
        setIsLoading(true)
        if (secretKey) {
            const generatedOTP = authenticator.generate(secretKey);
            setGeneratedCode(generatedOTP);
            verifyTOTP();
        } else {
            console.error('Secret key is missing. Please generate a secret key.');
            setIsLoading(false)
        }
    };

    const verifyTOTP = () => {
        if (otpValue && generatedCode) {
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
                        onKeyPress={handleEnterKeyPress}
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

    const renderPasswordApplication = () => (
        <div>
            {currentPage === "Passwords" && <Passwords />}
            {currentPage === "Banking" && <Banking />}
            {currentPage === "Manage" && <Manage />}
            {renderNavigationBar()}
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
        {isAuthenticated ? renderPasswordApplication() : renderAuthenticationContainer()}
        </>
    );
}
