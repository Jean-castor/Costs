
//text se refere ao texto do botão;

import styles from './Submitbutton.module.css';

function SubmitButton({text}){
    return (
        <div>
           <button className={styles.btn}>{text}</button>
        </div>
    )
        
};

export default SubmitButton;