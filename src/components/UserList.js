import React from 'react';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import './UserList.css';

function UserList() {
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);

    useEffect (() => {
        fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`)
        .then(response => response.json())
        .then(json => setList(list => [...list,...json.list]))
    }, [page]);

    const scrollToNext = () => {
        setPage(page + 1);
    }

    window.onscroll = function(){
        if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight ){
            scrollToNext();
        }
    }

  return (
    <div className="userlist">
        {
            list.map((el,index)=>{
               return (
                <div className="userbox" onClick={()=> navigate(`/user/${el.id}`)} key={index}>
                    <div>
                        <img src={`${el.imageUrl}?v=${index+1}`} style={{width:'100%', height:'auto'}} alt=""/>
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
  );
}

export default UserList;
