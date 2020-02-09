import React, {Component} from 'react';
import style from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

let AddNewPostForm = (props) => {
    return (<form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"newPostText"}
                       component={Textarea}             // при вызове кастомных (своих) элементов, которые не входят в библиотеку reduxForm необходимо указывать компонент без использования кавычек, просто как функцию, и импортировать ее.
                       placeholder={"Post message"}
                       validate={[required, maxLength10]}/></div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

AddNewPostForm = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm);

const MyPosts = React.memo(props => {

    console.log("render")
    let postsElements = props.postsData.map((p) =>
        <Post message={p.message} likesCount={p.likesCount}/>);

//    let newPostElement = React.createRef();     // ?????

    let onAddPost = (values) => {
        this.props.addPost(values.newPostText);
    };

//    let onPostChange = () => {
//        let text = newPostElement.current.value;        // сохраняет в переменной text вводимый текст
//        props.updateNewPostText(text);
//    };

    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostForm onSubmit={onAddPost}/>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    );

});


export default MyPosts;