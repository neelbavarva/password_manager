import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

export default function Navbar() {
    return (
        <div className={styles.navbar_container}>
            <div className={styles.navbar}>
                <Link href="/">
                    <div>Home</div>
                </Link>
                <Link href="/">
                    <div>Banking</div>
                </Link>
                <Link href="/">
                    <div>Manage</div>
                </Link>
            </div>
        </div>
    )
}
