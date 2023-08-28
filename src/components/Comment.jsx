import { ThumbsUp, Trash } from '@phosphor-icons/react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';
import { useState } from 'react';


export function Comment({ content, onDeleteComment }) {

    const [likeCount, setLikeCount] = useState(0);

    function handleDeleteComment(){
        onDeleteComment(content);
    }

    function handleLikeComment(){
        setLikeCount((state) => {
            return state + 1
        });

        const newLikeCountValue = likeCount + 1;

        console.log(newLikeCountValue)
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/Maiquinho.png" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Michael Matheus</strong>
                            <time dateTime="2023-08-16 05:00:00">Cerca de 1h atrás</time>
                        </div>

                        <button title="Deletar comentário" onClick={handleDeleteComment}>
                            <Trash size={24} />
                        </button>
                    </header>

                    <p>{content}</p>
                </div>
                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp size={20} />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}