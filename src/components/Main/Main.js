import './Main.css'
import Promo from '../Promo/Promo'
import NavTab from '../NavTab/NavTab'
import AboutPrigect from '../AboutProject/AboutProgect'
import Techs from '../Techs/Techs'
import AboutMe from '../AboutMe/AboutMe'
import Portfolio from '../Portfolio/Portfolio'

const Main = () => {
    return (
        <div className="main">
            <Promo />
            <NavTab />
            <AboutPrigect />
            <Techs />
            <AboutMe />
            <Portfolio />
        </div>
    );
}

export default Main;