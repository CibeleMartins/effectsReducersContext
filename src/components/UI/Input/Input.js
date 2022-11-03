import styles from './Input.module.css';


const Input = ({type, id, value, onChange, onBlur, htmlFor, isValid, label})=> {

    console.log('estou aqui')

    return (
        <div
          className={`${styles.control} ${
            isValid === false ? styles.invalid : ''
          }`}
        >
            <label htmlFor={id}>{label}</label>
            <input
            className={styles.inputClass}
            value={value}
            type={type}
            id={id}
            onChange={onChange}
            onBlur={onBlur}>
            </input>
        </div>
      
    );
};

export default Input;