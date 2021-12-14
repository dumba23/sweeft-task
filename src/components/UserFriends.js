import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserFriends(id){
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    useEffect (() => {
        fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id.id}/friends/${page}/20`)
        .then(response => response.json())
        .then(json => setList(list=> [...list,...json.list]))
    }, [id.id,page]);

    useEffect(()=>{
        setList([]);
        fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id.id}/friends/${page}/20`)
        .then(response => response.json())
        .then(json => setList([...json.list]))
    },[id.id])

    const scrollToNext = () => {
        setPage(page + 1);
    }

    window.onscroll = function(){
        if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight ){
            scrollToNext();
        }
    }

    return(
        <div className="userlist">
        {
            list.map((el,index)=>{
               return (
                <div className="userbox" onClick={()=> navigate(`/user/${el.id}`)} key={index}>
                    <div>
                        <img src={`${el.imageUrl}?v=${el.id}`} style={{width:'100%', height:'auto'}} alt=""/>
                    </div>
                    <div style={{fontWeight:'bold',marginLeft:'8px', marginBottom:'5px'}}>
                    {
                        `${el.prefix} ${el.name} ${el.lastName}` 
                    }
                    </div>
                    <div style={{ marginLeft:'8px'}}>
                    {
                        el.title
                    }
                    </div>
                </div>
               );
            })
        }
    </div>
    )
}

export default UserFriends;
