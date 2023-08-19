import {Formik, Form, Field, ErrorMessage} from"formik";
import {changePassword, getAccountByGmail} from "../services/AccountServices";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";


function ChangePassword (){

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [user,setUser] = useState({});

  const toggleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const userName = localStorage.getItem("username");
  
  const getUser = async ()=>{
const data =  await getAccountByGmail(userName);
setUser(data)
  }

  useEffect(()=>{
    getUser();
  },[])

  

    return(
        <div>
        <meta charSet="UTF-8" />
        <title>Đăng nhập</title>
        {/*    boostrap 5.1.3*/}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" />
        {/* fonts */}
        <link href="//fonts.googleapis.com/css?family=Raleway:100,200,300,400,500,600,700,800,900" rel="stylesheet" />
        <link href="//fonts.googleapis.com/css?family=Monoton" rel="stylesheet" />
        {/* /fonts */}
        <link rel="stylesheet" href="../css-SangTDN/assets/css/style1.css" />
        {/* <link rel="stylesheet" href="../css-SangTDN/assets/css/font-awesome.min.css" /> */}
        <h1 className="w3ls" style={{color: 'rgb(6, 133, 170)'}}>ĐỔI MẬT KHẨU</h1>
        <div className="content-w3ls">
          <div className="content-agile1">
            <h2 className="agileits1">VietNam Air</h2>
          </div>
          <div className="content-agile2 bg-white">
            <Formik
            initialValues={{

                id: 1,
                oldPassword : "",
                newPassword : "",
                confirmPassword: ""
            }}
            validationSchema={yup.object({
                oldPassword : yup
                .string()
                .required("Bạn chưa nhập mật khẩu hiện tại")
                .matches(/^(?=.*[A-Z])(?=.*\d).{8,20}$/,"Mật khẩu phải từ 8 đến 20 ký tự bao gồm chữ in hoa và số"),
                newPassword : yup
                .string()
                .required("Bạn chưa nhập mật khẩu mới")
                .matches(/^(?=.*[A-Z])(?=.*\d).{8,20}$/,"Mật khẩu phải từ 8 đến 20 ký tự bao gồm chữ in hoa và số"),
                confirmPassword: yup
                .string()
                .oneOf([yup.ref('newPassword'), null], 'Mật khẩu xác nhận không khớp')
                .required('Mật khẩu xác nhận không được để trống'),
            })}
            onSubmit={async(value)=>{
                const account ={
                    id: user.idAccount,
                    oldPassword : value.oldPassword,
                    newPassword : value.newPassword
                }
                try{
                    await changePassword(account);
                }
                catch{
                    Swal.fire({
                        title: "Mật Khẩu hiện tại của bạn không đúng!",
                        text: "",
                        icon: "warning",
                        button: "Aww yiss!",
                      });
                      return
                    }
                  Swal.fire({
                    title: "Thay đổi mật khẩu thành công",
                    text: "",
                    icon: "success",
                    button: "Aww yiss!",
                  });
            }}
            >
                <Form>
            <div>
              <div className="row">
                <div className="col-md-5" style={{marginTop: '2%', paddingLeft: '10%', color: 'rgb(6, 133, 170)', fontWeight: 'bold'}}>
                  <span style={{fontSize: '20px'}}>Mật khẩu hiện tại
                  </span>
                </div>
                <div className="col-md-8">
                  <Field style ={{marginBottom: "0px",fontWeight :"bold"}} className=" agileinfo" type={showOldPassword ? "text" : "password"} id="email" name="oldPassword" title="Chưa nhập email" ></Field>
                  <span toggle="oldPassword" class={showOldPassword ? "fa fa-eye-slash" : "fa fa-eye"} style={{
                  position: "relative",
                  top: "-25px",
                  left: "330px",
                 }} onClick={toggleShowOldPassword} ></span>
                  
                  <p style={{ color: "red", paddingLeft:"2rem" ,fontWeight :"bold", width: "35rem" }}>
                      <ErrorMessage name="oldPassword"></ErrorMessage>
                    </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5" style={{marginTop: '2%', paddingLeft: '10%', color: 'rgb(6, 133, 170)', fontWeight: 'bold'}}>
                  <span style={{fontSize: '20px'}}>Nhập mật khẩu mới
                  </span>
                </div>
                <div className="col-md-8">
                  <Field style={{fontWeight :"bold"}} className=" agileinfo" type={showNewPassword ? "text" : "password"} name="newPassword" id="password1"  />
                  
                  <p style={{ color: "red", paddingLeft:"2rem" ,fontWeight :"bold", width: "35rem" }}>
                      <ErrorMessage name="newPassword"></ErrorMessage>
                    </p>
                </div>
                <span toggle="newPassword" class={showNewPassword ? "fa fa-eye-slash" : "fa fa-eye"} style={{textAlign: "right", marginLeft: "-285px"}} onClick={toggleShowNewPassword} ></span>
              </div>
              <div className="row">
                <div className="col-md-5" style={{marginTop: '2%', paddingLeft: '10%', color: 'rgb(6, 133, 170)', fontWeight: 'bold'}}>
                  <span style={{fontSize: '20px'}}>Xác nhận mật khẩu
                  </span>
                </div>
                <div className="col-md-8">
                  <Field style={{fontWeight :"bold"}} className=" agileinfo" type={showNewPassword ? "text" : "password"} name="confirmPassword" id="password2"/>
                  <p style={{ color: "red", paddingLeft:"2rem" ,fontWeight :"bold", width: "35rem" }}>
                      <ErrorMessage name="confirmPassword"></ErrorMessage>
                    </p>
                </div>
              </div>
              <input type="submit" className="register" value={"Đổi mật khẩu"}/>
            </div>
            </Form>
            </Formik>
          </div>
          <div className="clear" />
        </div>
      </div>
    )
}

export default ChangePassword;