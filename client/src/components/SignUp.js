import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from './UserContext'
import logo from "../assets/google.png";


const SignUp=()=>{
    const pwdInp=useRef();
    const toggleShowPwd = (target)=>{
        if(pwdInp.current.type === "password"){
            pwdInp.current.type = "text";
            target.style.color = "#1DA1F2";
            target.textContent = "HIDE";
        }else{
            pwdInp.current.type = "password";
            target.textContent = "SHOW";
            target.style.color = "#111";
        }    
    }
    const History= useHistory()
    const [userInfo, setUserInfo]= useState({email:"", password:"", name:""})
    const {setMyInfo}=useContext(UserContext)
    
    const doSignUp=()=>{
        fetch("/api/signUp",{
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            })
            .then(res=>{
                if (res.ok) {
                    return res.json();
                }
                throw Error(res.statusText);
            })
            .then((json) => {
                console.log(json);
                setMyInfo(json.user)
                History.push("/");
        }).catch(err=>{
                console.log(err)
        })
    }
    return(
        <Wrapper>
            <Title>Sign Up Form</Title>
            <Container>
                <Form>
                
                        <Field>
                            <Input type="text" onChange={(ev)=>setUserInfo({...userInfo, name:ev.target.value})} required/>
                            <Lable>Name</Lable>
                        </Field>
                        <Field >
                            <Input type="email" onChange={(ev)=>setUserInfo({...userInfo, email:ev.target.value})} required/>
                            <Lable>Email </Lable>
                        </Field>
                        <Field >
                            <Input ref={pwdInp} type="password" onChange={(ev)=>setUserInfo({...userInfo, password:ev.target.value})} required />
                            <Show onClick={(ev)=>toggleShowPwd(ev.target)}>SHOW</Show>
                            <Lable>Password</Lable>
                        </Field>
                        
                        <Terms>
                            <input type="checkbox" id="checkBox" value="checked" name="terms" required/>
                            <label for="checkBox">I agree to the <a href="#">terms of service</a></label>
                        </Terms>
                        
                            <SignUpBtn onClick={(ev)=>{
                                ev.preventDefault()
                                doSignUp()
                            }}>Sign up</SignUpBtn>
                        
                        <ErrorMsg></ErrorMsg>

                </Form>
                
                <Auth>Or sign up with</Auth>
                <Link>
                    <Google src={logo}/>
                </Link>
            </Container>
        </Wrapper>
       
    )
}
export default SignUp;

const Wrapper=styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    
`;
const Form= styled.form`

`;
const Container=styled.div`
    position: relative;
    width: 400px;
    padding: 20px 40px;
    box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);

`
const Field = styled.div`
    margin: 25px 0;
    position: relative;
    height: 50px;
    width: 100%;
`

const Show=styled.span`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    color: #111;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    visibility: hidden;

`

const Input= styled.input`
    height: 100%;
    width: 100%;
    border: 1px solid silver;
    padding-left: 15px;
    box-sizing: border-box;
    outline: none;
    font-size: 19px;
    transition: .4s;
    &:focus{
        border: 1px solid #1DA1F2;
        
    }
    &:focus ~ label, &:valid ~ label{
            transform: translateY(-33px);
            background: white;
            font-size: 16px;
            color: #1DA1F2;
    }
    &:valid ~ ${Show} {
        visibility: visible;
    }

`

const Lable= styled.label`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
    pointer-events: none;
    color: grey;
    font-size: 18px;
    transition: .4s;
`
const SignUpBtn=styled.button`
    width: 100%;
    cursor: pointer;
    background-color: var(--text-alter);
    border: none;
    border-radius: 4px;
    color: var(--gray-color);
    padding: 10px;
    margin-top: 10px;
    font-size: 18px;  
`
const Auth=styled.div`
    margin: 35px 0 20px 0;
    font-size: 19px;
    
    
`
const Link= styled.div`
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
   
`
const Google= styled.img`
    width: 30%;
    cursor: pointer;
`
const Terms= styled.div`
    background-color: #f2f2f2;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
`;
const ErrorMsg=styled.div`

`
const Title = styled.div`
  color: var(--text-color);
  font-weight: bold;
  font-size: 25px;
  margin: 0px 20px 20px 20px;
`;