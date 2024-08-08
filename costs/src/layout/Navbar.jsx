
// BARRA DE NAVEGAÇÃO COM OS BOTÕES;
// LOGO DO SITE;

import {Link} from 'react-router-dom';

import Container from "./Container";

import styles from './Navbar.module.css';
import logo from '../img/favicon.icon.png'

function Navbar(){
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img className={styles.navbar_icon} src={logo} alt="imagem de moeda" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>

                    <li className={styles.item}>
                        <Link to="/projects">Projetos</Link>
                    </li>  

                    <li className={styles.item}>
                        <Link to="/company">Sobre</Link>
                    </li>
                    
                    <li className={styles.item}>
                        <Link to="/contact">Contato</Link>
                    </li>   
                </ul>
            </Container>
        </nav>
 )
};

export default Navbar;





                