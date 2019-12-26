import React from "react";
import s from "./users.module.css";
import * as axios from  "axios";

class Users extends React.Component {

        componentDidMount() {
            axios.get("https://social-network.samuraijs.com/api/1.0/users")
                .then(response => {
                this.props.setUsers(response.data.items)
            });
        }


    render () {
        return <div>
            <div>
                <span > 1 </span>
                <span className={s.selectedPage}> 2 </span>
                <span> 3 </span>
                <span> 4 </span>
                <span> 5 </span>
            </div>
            {
                this.props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small :
                            (require('../../../src/assets/images/user.png'))} className={s.usersPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                this.props.unfollow(u.id)
                            }}>Unfollow</button>
                            :<button onClick={() => {
                                this.props.follow(u.id)
                            }}>Follow</button>}


                    </div>
                </span>
                    <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
                </div>)
            }
        </div>
    }
};

export default Users;