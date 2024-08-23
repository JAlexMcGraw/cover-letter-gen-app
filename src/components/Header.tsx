import { ReactElement } from "react"

type HeadingProps = { title: string
                    textColor?: string 
                }

const Header = ({ title, textColor }: HeadingProps ): ReactElement => {
    return (
        <h1 style={{ color: 'white' }}>
            {title}
        </h1>
    );
}

export default Header;