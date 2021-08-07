import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import axios from "axios";
import { toast } from 'react-toastify';

const Toolbar = () => {
  const [me, ] = useContext(AuthContext);

  const logoutHandler = async () => {
    try {
      console.log({me})
      await axios.patch(
        "/users/logout");
      toast.success("로그아웃!!");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  }

  return (
    <div>
      <Link to="/">
        <span>홈</span>
      </Link>      
      {me
        ? (
        <span onClick={logoutHandler} style={{ float: "right", cursor: "pointer" }}>
          로그아웃({me.name})
        </span>
      ) : (
        <>
          <Link to="/auth/login">
            <span style={{ float: "right" }}>로그인</span>
          </Link>            
          <Link to="/auth/register">
            <span style={{ float: "right", marginRight: 15 }}>회원가입</span>
          </Link>                  
        </>
      )}      
    </div>
  )
};

export default Toolbar;