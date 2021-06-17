import profileReducer, {actions} from "./profil-reducer";
import React from "react";


let state = {
    postsData: [
        {id: 1, message: "Hi", likeCount: 12},
        {id: 2, message: "It's my post", likeCount: 6},
        {id: 3, message: "Kolya", likeCount: 5},
        {id: 4, message: "Petya", likeCount: 7},
        {id: 5, message: "Dimoon", likeCount: 500}
    ],
    profile: null,
    status: '',
};

it('length of posts should be incremented', () => {
    // 1.test data
    let action =  actions.addPostActionCreator ("helloHI");

    //2. action

    let newState = profileReducer(state, action)

    //3. expectation

    expect (newState.postsData.length).toBe(6);
});

it('message of new post should be correct', () => {
    // 1.test data
    let action =  actions.addPostActionCreator ("helloHI");

    //2. action

    let newState = profileReducer(state, action)

    //3. expectation

    expect (newState.postsData[5].message).toBe("helloHI");
});

it('after deleting length of message should be decrement', () => {
    // 1.test data
    let action =  actions.deletePost (1);

    //2. action

    let newState = profileReducer(state, action)

    //3. expectation

   expect (newState.postsData.length).toBe(4);
});

it(`after deleting length shouldn't be decrement if id is incorrect`, () => {
    // 1.test data
    let action =  actions.deletePost (1000);

    //2. action

    let newState = profileReducer(state, action)

    //3. expectation

    expect (newState.postsData.length).toBe(5);
});