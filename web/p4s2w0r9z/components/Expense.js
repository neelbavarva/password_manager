import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Expense.module.css'

export default function Expense() {

    const [networth, setNetworth] = useState(null);
    const [expenses, setExpenses] = useState(null);

    const [modalBalance, setModalBalance] = useState(null);
    const [modalIncome, setModalIncome] = useState(null);
    const [modalCost, setModalCost] = useState(null);
    const [modalMonth, setModalMonth] = useState(null);
    const [modalYear, setModalYear] = useState(null);
    const [modalInvestedValue, setModalInvestedValue] = useState(null);
    const [modalDivision, setModalDivision] = useState("Expense");

    const[API, setAPI] = useState(process.env.NEXT_PUBLIC_PROD_LINK)

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

    const fetchExpenses = async () => {
        try {
            const response = await fetch(`${API}/expenses/getAllExpenses`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setExpenses(result);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            setExpenses("network_error");
        }
    };

    const fetchAddExpense = () => {
        fetch(`${API}/expenses/newExpense`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "expense": ((networth.netWorth) + (networth.currentValue - networth.totalInvested) - (modalBalance - modalIncome)),
                "month": modalMonth,
                "year": modalYear
            })
        })
            .then(res => res.json())
            .then(result => {
                fetchUpdateNetworth();
                clearModalForm();
            })
            .catch((e) => {
                console.log("Error in Fetching /newExpense " + e);
            });
    };

    const fetchUpdateNetworth = async () => {
        try {
            const { totalInvested, currentValue, netWorth } = networth;
            let updatedTotalInvested = Number(totalInvested);
            let updatedCurrentValue = Number(currentValue);
            let updatedNetWorth = Number(modalBalance - (currentValue - totalInvested));

            const requestBody = {
                id: "659444e6b795aff6fa6b38ce",
                totalInvested: updatedTotalInvested,
                currentValue: updatedCurrentValue,
                netWorth: updatedNetWorth,
            };

            const response = await fetch(`${API}/updateNetWorth`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            history.replaceState({}, document.title, window.location.href.replace('#open-modal', ''));
            fetchExpenses();
            fetchNetWorth();
        } catch (error) {
            console.error("Error in Fetching /updateNetWorth", error);
        }
    };

    const fetchUpdateProfit = async () => {
        try {
            const requestBody = {
                id: "659444e6b795aff6fa6b38ce",
                totalInvested: Number(networth.totalInvested),
                currentValue: Number(modalInvestedValue),
                totalExpense: Number(networth.totalExpense),
                netWorth: Number(networth.netWorth),
            };

            const response = await fetch(`${API}/updateNetWorth`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);
            window.location.reload();
        } catch (error) {
            console.error("Error in Fetching /updateNetWorth", error);
        }
    };

    useEffect(() => {
        fetchNetWorth();
        fetchExpenses();
    }, []);

    const clearModalForm = () => {
        setModalDivision("Expense")
        setModalBalance(null)
        setModalIncome(null)
        setModalMonth(null)
        setModalYear(null)
        setModalInvestedValue(null)
    }

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
                        <div className={styles.header_info_value}>₹{(networth.totalInvested)}</div>
                    </div>
                    <div>
                        <div className={styles.header_info_title}>Current</div>
                        <div className={`${styles.header_flex} ${styles.flex_right}`}>
                            <div className={styles.header_info_value}>₹{(networth.currentValue)}</div>
                            <div className={`${(networth.currentValue - networth.totalInvested) >= 0 ? styles.header_info_green : styles.header_info_red}`}>
                                ({(networth.currentValue - networth.totalInvested) >= 0 ? "+" : ""}
                                {(Number(networth.currentValue - networth.totalInvested).toFixed(2))})
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.header_div_primary}>
                    <div>
                        <div className={styles.header_info_title}>Net Worth</div>
                        <div className={styles.header_info_value}>₹{(Number(networth.netWorth).toFixed(2))}</div>
                    </div>
                    <div>
                        <div className={styles.header_info_title}>Total Value</div>
                        <div className={`${styles.header_info_value}`}>
                            <div className={`${(networth.currentValue - networth.totalInvested) >= 0 ? styles.header_info_green : styles.header_info_red}`}>₹{(((networth.netWorth) + (networth.currentValue - networth.totalInvested)).toFixed(2))}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function renderExpenseHeader() {
        return (
            <div className={styles.expenseHeader}>
                <div>Expenses</div>
                {renderModal()}
                <div>
                    {/* <div onClick={() => reCalculate()} className={styles.header_btn}><a href="#open-modal-recalculate">Recalculate</a></div> */}
                    <div className={styles.header_btn}><a href="#open-modal">Add New Calculation</a></div>
                </div>
            </div>
        );
    }

    const renderExpenses = () => {
        return(
            <div>
                {expenses.map(item=>(
                    <div key={item._id} className={styles.expense_container}>
                        <div>
                            <div>{item.month}</div>
                            <div>{item.year}</div>
                        </div>
                        <div>₹{(item.expense)}</div>
                    </div>
                ))}
            </div>
        )
    };

    function renderModal() {
        return (
            <div id="open-modal" className={styles.modal_window}>
                <div>
                    <div className={styles.modal_division}>
                        <button className={`${modalDivision === "Expense" ? styles.modalDivSelected : null}`} onClick={() => setModalDivision("Expense")}>Expense</button>
                        <button className={`${modalDivision === "Investment" ? styles.modalDivSelected : null}`} onClick={() => setModalDivision("Investment")}>Investment</button>
                    </div>
                    {modalDivision === "Expense" ?
                        <div>
                            <div className={styles.modal_form}>
                                <div className={styles.form_container}>
                                    <label>New Balance</label>
                                    <input value={modalBalance} onChange={e => setModalBalance(e.target.value)} />
                                </div>
                                <div className={styles.form_container}>
                                    <label>Income</label>
                                    <input value={modalIncome} onChange={e => setModalIncome(e.target.value)} />
                                </div>
                                <div className={styles.form_container}>
                                    <label>Month</label>
                                    <input value={modalMonth} onChange={e => setModalMonth(e.target.value)} />
                                </div>
                                <div className={styles.form_container}>
                                    <label>Year</label>
                                    <input value={modalYear} onChange={e => setModalYear(e.target.value)} />
                                </div>
                            </div>
                            <div className={styles.modal_button_container}>
                                <a onClick={() => fetchAddExpense()} href="#">Submit</a>
                                <a onClick={() => clearModalForm()} href="#">Close</a>
                            </div>
                        </div> :
                        <div>
                            <div className={styles.modal_form}>
                                <div className={styles.form_container}>
                                    <label>New Investmented Value</label>
                                    <input value={modalInvestedValue} onChange={e => setModalInvestedValue(e.target.value)} />
                                </div>
                            </div>
                            <div className={styles.modal_button_container}>
                                <a onClick={() => fetchUpdateProfit()} href="#">Submit</a>
                                <a onClick={() => clearModalForm()} href="#">Close</a>
                            </div>
                        </div>}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={styles.Expense_page}>
                {networth==null||expenses==null?renderLoader():
                <div className={styles.container}>
                    {renderHeader()}
                    {renderExpenseHeader()}
                    {renderExpenses()}
                </div>}
            </div>
        </>
    )
}
