import React from 'react';
import style from "./MyPosts.module.css";
import Post from "./Post/Post";


const MyPosts = (props) => {

    let postsElements = props.postsData.map((p) =>
        <Post message={p.message} likesCount={p.likesCount}/>);

    let newPostElement = React.createRef();     // ?????

    let onAddPost = () => {
        props.addPost();
        };

    let onPostChange = () => {
        let text = newPostElement.current.value;        // сохраняет в переменной text вводимый текст
        props.updateNewPostText(text);
    };

    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement}
                              value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={ onAddPost }>Add post</button>
                </div>
            </div>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    );
};

export default MyPosts;