import React from 'react';
import {useNavigate} from "react-router-dom";

function EmployeeCreate() {
    let navigate = useNavigate()
    return (
        <div>
            <div id="booking" className="section">
                <div className="section-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                                <div>
                                    <img src="https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                                         alt="Preview Image" id="img-preview"/>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-8 col-lg-8">
                                <div className="booking-form">
                                    <div>
                                        <p>Thông Tin Khách Hàng</p>
                                    </div>
                                    <form className="booking-form-padding">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
            <span className="form-label">Họ và tên
            <sup style={{fontSize: '8px'}}>
            <sup>
            <i className="fa-solid fa-star-of-life" style={{color: '#ff0019'}}>
            </i>
            </sup>
            </sup>
            </span>
                                                    <input className="form-control" type="text"
                                                           placeholder="Tên đầy đủ"/>
                                                    <div className="error">Hiển thị lỗi tại đây</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
            <span className="form-label">Giới tính
            <sup style={{fontSize: '8px'}}>
            <sup>
            <i className="fa-solid fa-star-of-life" style={{color: '#ff0019'}}>
            </i>
            </sup>
            </sup>
            </span>
                                                    <select className="form-control">
                                                        <option>Chọn giới tính</option>
                                                        <option>Nam</option>
                                                        <option>Nữ</option>
                                                        <option>Khác</option>
                                                    </select>
                                                    <div className="error">Hiển thị lỗi tại đây</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
            <span className="form-label">CCCD/Passport
            <sup style={{fontSize: '8px'}}>
            <sup>
            <i className="fa-solid fa-star-of-life" style={{color: '#ff0019'}}>
            </i>
            </sup>
            </sup>
            </span>
                                                    <input className="form-control" type="text"
                                                           placeholder="CCCD/Passport"/>
                                                    <div className="error">Hiển thị lỗi tại đây</div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
            <span className="form-label">Số điện thoại
            <sup style={{fontSize: '8px'}}>
            <sup>
            <i className="fa-solid fa-star-of-life" style={{color: '#ff0019'}}>
            </i>
            </sup>
            </sup>
            </span>
                                                    <input className="form-control" type="text"
                                                           placeholder="Số điện thoại"/>
                                                    <div className="error">Hiển thị lỗi tại đây</div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
            <span className="form-label">Ngày sinh
            <sup style={{fontSize: '8px'}}>
            <sup>
            <i className="fa-solid fa-star-of-life" style={{color: '#ff0019'}}>
            </i>
            </sup>
            </sup>
            </span>
                                                    <input className="form-control" type="date" required/>
                                                    <div className="error">Hiển thị lỗi tại đây</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
            <span className="form-label" style={{paddingLeft: '10px'}}>Địa chỉ (
            <sup style={{fontSize: '8px'}}>
            <sup>
            <i className="fa-solid fa-star-of-life" style={{color: '#ff0019'}}>
            </i>
            </sup>
            </sup>
            </span>
                                                <input className="form-control" type="text"
                                                       placeholder="Phường,Quận,Thành Phố"/>
                                                <div className="error">Hiển thị lỗi tại đây</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
            <span className="form-label">Email
            <sup style={{fontSize: '8px'}}>
            <sup>
            <i className="fa-solid fa-star-of-life" style={{color: '#ff0019'}}>
            </i>
            </sup>
            </sup>
            </span>
                                                    <input className="form-control" type="text" placeholder="Email"/>
                                                    <div className="error">Hiển thị lỗi tại đây</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
            <span className="form-label">Quốc tịch
            <sup style={{fontSize: '8px'}}>
            <sup>
            <i className="fa-solid fa-star-of-life" style={{color: '#ff0019'}}>
            </i>
            </sup>
            </sup>
            </span>
                                                    <select className="form-control">
                                                        <option>Chọn quốc tịch</option>
                                                        <option>Việt Nam</option>
                                                        <option>Mỹ</option>
                                                        <option>Nhật Bản</option>
                                                    </select>
                                                    <div className="error">Hiển thị lỗi tại đây</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
            <span className="form-label">Mật khẩu
            <sup style={{fontSize: '8px'}}>
            <sup>
            <i className="fa-solid fa-star-of-life" style={{color: '#ff0019'}}>
            </i>
            </sup>
            </sup>
            </span>
                                                    <input className="form-control" type="password"
                                                           placeholder="Mật khẩu đăng nhập"/>
                                                    <div className="error">Hiển thị lỗi tại đây</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <span className="form-label"
                                                          style={{marginBottom: '20px'}}>Ảnh</span>
                                                    <input className="form-control" type="file"
                                                           style={{paddingTop: '35px'}} id="input-file"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-btn" style={{display: 'flex', justifyContent: 'right'}}>
                                            <button className="submit-btn" style={{marginRight: '10px'}}>Thêm mới
                                            </button>
                                            <button className="submit-btn" type="reset">Nhập lại</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);

}

export default EmployeeCreate;