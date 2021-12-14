import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserFriends from './UserFriends';

import './UserInfo.css';

function UserInfo(){
    const [user, setUser] = useState(null);
    const [users,setUsers] = useState([])
    let { id } = useParams();    

    useEffect (() => {
        fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`)
        .then(response => response.json())
        .then(json => {setUser(json); setUsers(users => [...users, json]) })
        
    },[id]);

    const uniqueArray = users.filter((thing, index, self) =>
    index === self.findIndex((t) => (
        t.id === thing.id && t.name === thing.name
    ))
    )

    if(user === null){
        return <div>loading</div>
    }
    return (
    <div className="userinfo-container">
        <div className="userinfo">
               <img src={`${user.imageUrl}?v=${id}`} style={{width:'auto', height:'200px'}} alt=""/>
               <fieldset className="left-info">
                    <legend>Info</legend>
                    <div style={{fontWeight:'bold'}}>
                        <span> 
                            {
                                `${user.prefix + " " + user.name + " " + user.lastName}  `
                            }
                        </span>
                    </div>
                    <div>
                        <i>{ user.title }</i>
                    </div>
                    <br/>
                    <div><span>Email: </span>{user.email}</div>
                    <div><span>Ip Address: </span>{user.ip}</div>
                    <div><span>Ip Address: </span>{user.ip}</div>
                    <div><span>Job Area: </span>{user.jobArea}</div>
                    <div><span>Job Type: </span>{user.jobType}</div>
                </fieldset>
                <div className="user-address">
                    <fieldset>
                        <legend>Address</legend>
                    <div>
                    <span style={{fontWeight:'bold'}}>
                        {user.company.name + " " + user.company.suffix}<br/>
                    </span>
                    </div>
                    <div><span>City: </span>{user.address.city}</div> 
                    <div><span>Country: </span> {user.address.country}</div> 
                    <div><span>State: </span> {user.address.state}</div>
                    <div><span>Street Address: </span>{user.address.streetAddress}</div>
                    <div><span>ZIP: </span>{user.address.zipCode}</div>   
                    
                    </fieldset>
                </div>  
        </div>
        <div style={{margin:'20px'}}>
            {
                uniqueArray.map((el)=>{
                    return(
                        <React.Fragment key={el.id}>
                          <Link to={`/user/${el.id}`}>
                          {`${el.prefix + " " + el.name + " " + el.lastName}  `}
                          </Link>
                          {` > `}
                        </React.Fragment>
                    )
                })
            }
        </div>
        <div style={{margin:'5px'}}>
        <UserFriends id={id}/> 
        </div>
    </div>
    )
}

export default UserInfo;