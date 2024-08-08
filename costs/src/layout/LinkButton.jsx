
//RESPONSÁVEL POR CRIAR NOVOS PROJETOS




import { Link } from 'react-router-dom'

import styles from './LinkButton.module.css';

// to indica pra onde vai o link que o user clicar
// text muda o texto onde for usado
function LinkButton({to, text}){
    return (
        <Link className={styles.btn} to={to}> 
            {text}
        </Link>
    )
}

export default LinkButton;