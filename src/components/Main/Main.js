import './Main.css'
import Promo from '../Promo/Promo'
import NavTab from '../NavTab/NavTab'
import AboutProgect from '../AboutProject/AboutProgect'
import Techs from '../Techs/Techs'
import AboutMe from '../AboutMe/AboutMe'
import Portfolio from '../Portfolio/Portfolio'

const Main = () => {
    return (
        <main className="main">
            <Promo />
            <NavTab />
            <AboutProgect />
            <Techs />
            <AboutMe />
            <Portfolio />
        </main>
    );
}

export default Main;