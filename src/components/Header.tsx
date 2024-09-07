import { ReactElement } from "react"
import './styles/styles.css';

type HeadingProps = { title: string
                    textColor?: string 
                }

const Header = ({ title, textColor }: HeadingProps ): ReactElement => { // style={{ color: 'white', alignItems: 'center' }}
    return (
        <h1 className="header"> 
            {title}
        </h1>
    );
}

export default Header;