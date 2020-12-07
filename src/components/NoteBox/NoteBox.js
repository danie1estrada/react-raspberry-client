import styles from './NoteBox.module.css';

const NoteBox = ({ title, description }) => {
    return (
        <div className={styles.NoteBox}>
            <span className={styles.title}>{title}</span>
            <p>{description}</p>
        </div>
    );
}

export default NoteBox;