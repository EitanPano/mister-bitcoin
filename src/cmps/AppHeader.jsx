import { NavLink } from "react-router-dom";

export function AppHeader() {
    return (
        <header>
            <h1><NavLink exact to="/">MisterBTC</NavLink></h1>
            <nav>
                <NavLink to='/contact'>Contacts</NavLink>
                <NavLink to='/statistic'>Statistics</NavLink>
            </nav>
        </header>
    )
}

// export const AppHeader = withRouter(_AppHeader)