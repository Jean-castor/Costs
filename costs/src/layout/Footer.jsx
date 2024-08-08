
   //RODAPÉ DO PROJETO
   //LOGOS DAS REDES SOCIAIS
   // NOME DA PÁGINA + COPYRIGTH

import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'

import styles from './Footer.module.css'

function Footer(){
    return (
      <footer className={styles.footer}>
         <ul className={styles.social_list}>
              <li>
                <FaFacebook/>
              </li>

              <li>
                 <FaInstagram/>
              </li>

              <li>
                 <FaLinkedin/>
              </li>
         </ul>
         <p className={styles.copy_rigth}>
            <span>Castor Costs</span> &copy; 2024
        </p>
      </footer>
  )
};

export default Footer;

             
             