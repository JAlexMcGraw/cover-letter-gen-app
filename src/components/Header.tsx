import { ReactElement } from "react"
import styles from './styles/styles.module.css';

type HeadingProps = { title: string
                    textColor?: string 
                }

const Header = ({ title, textColor }: HeadingProps ): ReactElement => { // style={{ color: 'white', alignItems: 'center' }}
    return (
        <h1 className={styles.header}> 
            {title}
        </h1>
    );
}

export default Header;