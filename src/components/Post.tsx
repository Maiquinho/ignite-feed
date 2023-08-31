import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';


interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
}


export function Post({ author, content, publishedAt }: PostProps) {

    const [comments, setComments] = useState([
        'Post muito bacana, hein?'
    ])

    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function handleCreateNewComment(event: FormEvent){
        event.preventDefault();
        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    function handleNewCommentText(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function deleteComment(commentToDelete: string){
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })

        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;


    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} alt="" />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {content.map(content => {
                    switch(content.type){
                        case "paragraph":
                            return <p key={content.content}>{content.content}</p>
                            break;
                        case "link":
                            return <p key={content.content}><a href='#'>{content.content}</a></p>
                            break;
                    }
                })}
            </div>

            <form className={styles.commentForm} onSubmit={handleCreateNewComment}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    name="comment"
                    placeholder="Deixe um comentário"
                    value={newCommentText}
                    onChange={handleNewCommentText}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment 
                          key={comment} 
                          content={comment} 
                          onDeleteComment={deleteComment} 
                        />
                    )
                })}
            </div>
        </article>
    )
}