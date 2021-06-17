import React from 'react';
import style from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostType} from "../../../types/types";
import AddPostForm, {AddPostFormValuesType} from "./AddPostForm/AddPost Form";

export type MapPropsType = {
    postsData: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

/*const AddNewPostForm: React.FC<InjectedFormProps<LoginFormValuesType, PropsType> & PropsType> = (props) => {
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

AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm);*/

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {

    let postsElements =
        [...props.postsData]
        .reverse()
        .map(p => <Post key={p.id} message={p.message} likeCount={p.likeCount}/>);


    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onAddPost}/>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    );

}

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;