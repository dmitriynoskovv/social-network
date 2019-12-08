import React from "react";
import s from "./users.module.css";


let Users = (props) => {

    if (props.users.length === 0) {
        props.setUsers([
                {
                    id: 1,
                    photoUrl: "https://f9.pmo.ee/Quh1erzzUA2rDcN0UWZRsi8mdLA=/685x0/smart/nginx/o/2018/07/02/7931323t1hfc89.png",
                    followed: true,
                    fullName: "Dimka",
                    status: "React JS is cool!!!",
                    location: {city: "Kyiv", country: "Ukraine",}
                },
                {
                    id: 2,
                    photoUrl: "https://f9.pmo.ee/Quh1erzzUA2rDcN0UWZRsi8mdLA=/685x0/smart/nginx/o/2018/07/02/7931323t1hfc89.png",
                    followed: false,
                    fullName: "Vasyok",
                    status: "Hi",
                    location: {city: "Odessa", country: "Ukraine",}
                },
                {
                    id: 3,
                    photoUrl: "https://f9.pmo.ee/Quh1erzzUA2rDcN0UWZRsi8mdLA=/685x0/smart/nginx/o/2018/07/02/7931323t1hfc89.png",
                    followed: true,
                    fullName: "Kolyan",
                    status: "Whatsaaap",
                    location: {city: "Vinnytsa", country: "Ukraine",}
                },
                {
                    id: 4,
                    photoUrl: "https://f9.pmo.ee/Quh1erzzUA2rDcN0UWZRsi8mdLA=/685x0/smart/nginx/o/2018/07/02/7931323t1hfc89.png",
                    followed: false,
                    fullName: "Jeka",
                    status: "Hello world",
                    location: {city: "Lviv", country: "Ukraine",}
                },
            ]
        )
    }

    return <div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} className={s.usersPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            :<button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>}


                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users;