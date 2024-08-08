import { useState, useEffect } from 'react';

import styles from './Message.module.css';

function Message({type, msg}){

    // VISIBILIDADE DA MENSAGEM INICIA COMO FALSE
    const [visible, setVisible] = useState(false);

    //Abaixo CONDICIONAL PARA EXIBIR OU OCULTAR A MENSAGEM EM TELA

    // useEffect sempre precisa estar ligado a alguém = [msg]
    useEffect(() => {

        if(!msg){  // se a mensagem existe, retorna como false
            setVisible(false)
            return
        }

        setVisible(true)

        const timer = setTimeout(() =>{
            setVisible(false)
        }, 3000);

        return () => clearTimeout(timer)

    }, [msg])

    return(
        <>
            {visible && (
                <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
            )}
        </>
    )
}

export default Message;