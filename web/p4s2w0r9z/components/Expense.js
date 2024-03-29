import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import {API} from '../API'
import styles from '../styles/Expense.module.css'

export default function Expense() {

    const [networth, setNetworth] = useState(null);

    const fetchNetWorth = () => {
        fetch(`${API}/getNetWorth`)
            .then(res => res.json())
            .then(result => {
                setNetworth(result[0]);
            })
            .catch((e) => {
                setNetworth("network_error");
            });
    };

    useEffect(() => {
        fetchNetWorth();
    }, []);


    const addCommasToNumber = (num) => {
        const numStr = num.toString();
        const hasDecimal = numStr.includes('.');
        let integerPart = numStr;
        let decimalPart = '';

        if (hasDecimal) {
            [integerPart, decimalPart] = numStr.split('.');
        }

        const integerLength = integerPart.length;
        let result = '';

        for (let i = 0; i < integerLength; i++) {
            result += integerPart[i];
            if ((integerLength - i - 1) % 3 === 0 && i !== integerLength - 1) {
                result += ',';
            }
        }

        if (hasDecimal) {
            result += '.' + decimalPart;
        }

        return result;
    };

    function renderLoader() {
        return (
            <div className={styles.loaderContainer}>
                <span className={styles.loader}></span>
            </div>
        );
    }

    function renderHeader() {
        return (
            <div className={styles.header_container}>
                <div className={styles.header_div_primary}>
                    <div>
                        <div className={styles.header_info_title}>Invested</div>
                        <div className={styles.header_info_value}>₹{addCommasToNumber(networth.totalInvested)}</div>
                    </div>
                    <div>
                        <div className={styles.header_info_title}>Current</div>
                        <div className={`${styles.header_flex} ${styles.flex_right}`}>
                            <div className={styles.header_info_value}>₹{addCommasToNumber(networth.currentValue)}</div>
                            <div className={`${(networth.currentValue - networth.totalInvested) >= 0 ? styles.header_info_green : styles.header_info_red}`}>
                                ({(networth.currentValue - networth.totalInvested) >= 0 ? "+" : "-"}
                                {addCommasToNumber((networth.currentValue - networth.totalInvested).toFixed(2))})
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.header_div_primary}>
                    <div>
                        <div className={styles.header_info_title}>Net Worth</div>
                        <div className={styles.header_info_value}>₹{addCommasToNumber(Number(networth.netWorth).toFixed(2))}</div>
                    </div>
                    <div>
                        <div className={styles.header_info_title}>Total Value</div>
                        <div className={`${styles.header_info_value}`}>
                            <div className={`${(networth.currentValue - networth.totalInvested) >= 0 ? styles.header_info_green : styles.header_info_red}`}>₹{addCommasToNumber(((networth.netWorth) + (networth.currentValue - networth.totalInvested)).toFixed(2))}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={styles.Expense_page}>
                {networth==null?renderLoader():
                <div className={styles.container}>
                    {renderHeader()}
                </div>}
            </div>
        </>
    )
}
