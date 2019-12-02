const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState =  {
    postsData: [
            {id: 1, message: "Hi", likeCount: 12},
            {id: 2, message: "It's my post", likeCount: 6},
            {id: 3, message: "Kolya", likeCount: 5},
            {id: 4, message: "Petya", likeCount: 7},
            {id: 5, message: "Dimoon", likeCount: 500}
        ],
        newPostText: ""
};

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST:
            let newPost = {
                id: 100,
                message: state.newPostText,
                likeCount: 65
            };
            state.postsData.push(newPost);
            state.newPostText = "";
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
};

export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (text) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text })

export default profileReducer;