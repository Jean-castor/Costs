
import styles from './input.module.css';

// type vai servir para identificar o tipo do elemento
// text vai servir para o texto da label
//name para o name do input
//placeholder para o texto de ajuda do input
//handleOnChange para manusear os dados do input (evento)
//value para valor do input já adicionado/ setado 


function Input({type, text, name, placeholder, handleOnChange, value}){
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input type={type} name={name} id={name}
               placeholder={placeholder} onChange={handleOnChange} value={value}
             />
        </div>
    )
        
};

export default Input;