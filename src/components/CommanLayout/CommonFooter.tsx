import { Link } from 'react-router-dom';
import footerLogo from "../../assets/img/footerLogo.svg"
import './footer.scss';

const CommonFotter = () => {
    return (
        <>
            <footer>
                <div className='main_footer'>
                    <p>© 2019 Lift Media. All rights reserved.</p>
                    <img src={footerLogo} alt="logo" />
                    <ul>
                        <li><Link to="/">Terms of Service</Link></li>
                        <li><Link to="/">Privacy Policy</Link></li>
                    </ul>
                </div>
            </footer>
        </>
    )
}

export default CommonFotter