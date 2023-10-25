import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Error.module.css';

export default function ErrorPage() {

    return (
        <div>
            <Head>
                <title>Error - 404 | Passwords</title>
                <meta name="description" content="This page does not exist" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.errorPage}>
                <Image width={100} src={require("../public/icons/lock_pc.svg")} />
                <div className={styles.errorInfo}>
                    <div>Unauthorized I.P. address. Access denied.</div>
                    <div>This website is highly secured. Every bit of information is encrypted.</div>
                </div>
            </div>
        </div>
    );
}