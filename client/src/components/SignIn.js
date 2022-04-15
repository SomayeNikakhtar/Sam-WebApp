import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from './UserContext'

const SignIn=()=>{
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
    const [userInfo, setUserInfo]= useState({email:"", password:""})
    const {setMyInfo}=useContext(UserContext)
    
    const doSignIn=()=>{
        fetch("/api/signIn",{
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
            <Container>
                <Form>
                    <p>Sign in</p>
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
                            <label for="checkBox">Keep me signed in</label>
                        </Terms>
                            <p>Forgot password?</p>
                        <Button>
                            {/* <Inner ></Inner> */}
                            <SignUpBtn onClick={(ev)=>{
                                ev.preventDefault()
                                doSignIn()
                            }}>Sign In</SignUpBtn>
                        </Button>
                        <ErrorMsg></ErrorMsg>

                </Form>
                <Auth>Or sign in with</Auth>
                <Link>
                    <Google>Google</Google>
                </Link>
            </Container>
        </Wrapper>
       
    )
}
export default SignIn;

const Wrapper=styled.div`
    display: flex;
    /* width: 100% ; */
    flex-grow: 1;
    justify-content: center;
    align-items: center;
`;
const Form= styled.form`
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
`;
const Container=styled.div`
    position: relative;
    width: 400px;
    /* background: white; */
    padding: 60px 40px;
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
    /* font-family: 'Open Sans', sans-serif; */

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
const Button=styled.div`
    margin: 25px 0;
    position: relative;
    height: 50px;
    width: 100%;
    margin-top: 30px;
    overflow: hidden;
    z-index: 111;
    
    &:hover{
        .inner{
            left: 0;
        }    
    }
`

// const Inner=styled.div`
//     position: absolute;
//     height: 100%;
//     width: 100%;
//     /* left: -100%; */
//     z-index: -1;
//     transition: all .4s;
//     /* background: -webkit-linear-gradient(right,#00dbde,#fc00ff,#00dbde,#fc00ff); */
// `
const SignUpBtn=styled.button`
    width: 100%;
    height: 100%;
    border: none;
    background: pink;
    outline: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    /* font-family: 'Montserrat', sans-serif; */
    
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
const Google= styled.div`
    height: 40px;
    width: 30%;
    border: 1px solid silver;
    border-radius: 3px;
    margin: 0 10px;
    transition: .4s;
    &:hover{
        border: 1px solid #dd4b39;
    }
`
const Terms= styled.div`
    background-color: #f2f2f2;
    padding: 10px;
    margin-top: 15px;
    border-radius: 5px;
`;
const ErrorMsg=styled.div`

`