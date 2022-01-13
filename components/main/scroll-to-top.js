import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import styles from '../../styles/layout.module.css'

export default function ScrollToTop(props){
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back_to_top');
        if (anchor) {
          anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };
    return(
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={styles.scrollToTop}>
                {children}
            </div>
        </Zoom>
    );
}