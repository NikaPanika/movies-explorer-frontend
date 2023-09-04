import './NavTab.css';

const NavTab = () => {
    return (
        <nav className="navtab">
                <a className="navtab__link" href="#aboutprog">О проекте</a>
                <a className="navtab__link" href="#tech">Технологии</a>
                <a className="navtab__link" href="#aboutme">Студент</a>
        </nav >
    );
}

export default NavTab;