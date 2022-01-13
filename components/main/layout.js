import Header from './header';
import Footer from './footer';
import ScrollToTop from './scroll-to-top';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import styles from '../../styles/layout.module.css'
import { useRouter } from 'next/router';
import React from 'react';

export default function Layout({ children, home, props }) {
    const router    = useRouter();
    const mainCss   = router.pathname === '/' ? styles.indexMain : '';
    let isHome = home ? {home: true} : null;
    return (
        <>
            <Header {...isHome}/>
            <main className={mainCss}>
                {children}
                <Footer />
            </main>
            <ScrollToTop {...props}>
                <Fab className={styles.fabScrollToTop} size="medium" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollToTop>
        </>
    )
}
