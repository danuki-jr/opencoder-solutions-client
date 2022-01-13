import { Typography } from '@material-ui/core'
import styles from '../../styles/layout.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Typography variant="subtitle1" className={styles.footerDescription}>
                © 2021 OpenCoder Solutions Software Development Services. All rights reserved.
            </Typography>
        </footer>
    );
}