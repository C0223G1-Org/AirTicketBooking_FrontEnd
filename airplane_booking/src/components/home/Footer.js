import React from "react";
import '../../css/home/Footer.css';

export default function Footer() {
    return (
        <footer className="footer" id='footer'>
            <div className="row footer-item">
                <div className="col-3">
                    <div className="row">
                        <h6>Codegym Airlines</h6>
                        <a>Giới thiệu công ty</a>
                        <a>Đội bay</a>
                        <a>Đối tác</a>
                        <a>Thông tin truyền thông</a>
                        <a>Trách nhiệm xã hội</a>
                        <a>Quan hệ cổ đông</a>
                        <a>Thông tin đấu thầu</a>
                        <a>Việc làm với Codegym</a>
                    </div>
                </div>
                <div className="col-3">
                    <div className="row">
                        <h6>Pháp lý</h6>
                        <a>Các điều kiện và điều khoản</a>
                        <a>Điều lệ vận chuyển</a>
                        <a>Điều kiện sử dụng Cookie</a>
                        <a>Bảo mật thông tin</a>
                    </div>
                </div>
                <div className="col-3">
                    <div className="row">
                        <h6>Hỗ trợ</h6>
                        <a>Góp ý dịch vụ</a>
                        <a>Trung tâm trợ giúp</a>
                        <a>Liên hệ</a>
                        <a>Chính sách bảo vệ hành khách</a>
                    </div>
                </div>
                <div className="col-3">
                    <div className="row">
                        <h6>Thông tin hữu ích</h6>
                        <a>Quảng cáo với Codegym</a>
                    </div>
                </div>
            </div>
            <div className="row mt-4 footer-social">
                <div className="col-4">
                    <div className="row">
                        <div className="sky-img">
                            <img src="https://www.skyteam.com/images/Skyteam@2x-white.png" alt="" />
                        </div>
                        <div>
                            <a><i className="fa-brands fa-facebook" /></a>
                            <a><i className="fa-brands fa-square-youtube" /></a>
                            <a><i className="fa-brands fa-instagram" /></a>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row">
                        <div>
                            <i className="fa-solid fa-money-check" />
                            Hỗ trợ thanh toán
                        </div>
                        <div className="payment">
                            <i className="fa-brands fa-cc-paypal" />
                            <i className="fa-brands fa-cc-jcb" />
                            <i className="fa-brands fa-cc-mastercard" />
                            <i className="fa-brands fa-cc-visa" />
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row">
                        <div>
                            <i className="fa-solid fa-phone-flip" />
                            Trung tâm chăm sóc khách hàng(24/7): 1900 0000
                        </div>
                        <div style={{textTransform:"initial"}}>
                            <i className="fa-solid fa-envelope" />
                            Email: c0223g1@codegym.vn
                        </div>
                        <div className="codegym-img">
                            <img src="https://data.vieclamhanoi.vn/static-bucket/2022/11/14/CodeGym-3-02-copy.jpg" />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row" style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}>
                <div>
                    <i className="fa-regular fa-copyright" />
                    2023 codegym.com.vn
                </div>
                <div>Tổng công ty Hàng không Codegym. Số 280 Trần Hưng Đạo, Sơn Trà, Đà Nẵng</div>
                <div>Điện thoại: (+84) 900 0000. Fax: (+84) 900 0001</div>
                <div>Giấy chứng nhận đăng kí doanh nghiệp, mã số doanh nghiệp: 1029384756</div>
                <img style={{ width: '300px', marginBottom: '20px' }} src="https://lh5.googleusercontent.com/uTXS6njyzcaMFqdidF7rRUJHGGua1PUQ2AICQxawjLs5fpJTAPjSaVF36C0cjhAJxOMqI1Tn8YMMgUt3mPmHrW9Sqb7pMok6d7DnUPMT0kXubvbQHMENGgKZqN8n7UkghqENdtjs" />
            </div>
        </footer>
    )
}