// import "../../js/info-passenger"
import "../../css/ticket/info-passenger.css"

export default function InfoPassenger() {

    return (
        <>
            <head>
                <meta charSet="UTF-8"/>
                <title>Thông Tin Hành Khách</title>
            </head>
            <div>
                <div className="container" id="info-passenger">
                    <div className="title text-center">
                        <p className="h1">Thông tin hành khách</p>
                    </div>
                    <div className="wrapper">
                        <div className="row wrap">
                            <div className="row">
                                <div className="col-4 info-fight">
                                    <p className="">TP Hồ chí minh (SGN)</p>
                                    <p className="outstanding">
                                        <span>05:00</span> <span>06/08/2020</span>
                                    </p>
                                    <p>Tân Sơn Nhất</p>
                                </div>
                                <div className="col-4 info-fight">
                                    <p className="">hà nội (HAN)</p>
                                    <p className="outstanding">
                                        <span>07:00</span> <span>06/08/2020</span>
                                    </p>
                                    <p>Nội bài</p>
                                </div>
                                <div className="col-4 info-fight">
                                    <div className="logo-image">
                                        {/* <img src="./image/VN.png" alt="logo" /> */}
                                        <p className="vietnam-airline">CodeGym Airline</p>
                                    </div>
                                    <p>
                                        Chuyến bay :<span className="outstanding">VN236</span>
                                    </p>
                                    <p>
                                        Loại ghế : <span className="outstanding">Phổ thông</span>
                                    </p>
                                </div>
                            </div>
                            <div className="row info-second">
                                <div className="col-2">
                                    <p>Loại hành khách</p>
                                    <p>Người lớn</p>
                                </div>
                                <div className="col-2">
                                    <p>Loại vé</p>
                                    <p id="type-ticket" className="outstanding">
                                        Một chiều
                                    </p>
                                </div>
                                <div className="col-2">
                                    <p>Giá mỗi vé</p>
                                    <p className="money">1,109,999 VND</p>
                                </div>
                                <div className="col-2">
                                    <p>Thuế &amp; Phí</p>
                                    <p className="money">681,000 VND</p>
                                </div>
                                <div className="col-2">
                                    <p>Tổng giá</p>
                                    <p className="money">1,790,999 VND</p>
                                </div>
                            </div>
                            <div className="info-four">
                                <p>
                                    Thông tin hành khách bay từ <span>TP Hồ Chí Minh </span>
                                    <i className="fa-solid fa-plane-departure"/> <span>Hà Nội</span>
                                </p>
                                <p style={{fontStyle: "italic", color: "red", textTransform: "none"}}>
                                    Các thông tin có (*) là bắt buộc phải nhập
                                </p>
                                <div className="row info-customer">
                                    <div className="row">
                                        <div className="check-children">
                                            <p>Hành khách số 1 :</p>
                                            <input type="checkbox" defaultChecked=""/> Có kèm em bé (nhỏ hơn
                                            2 tuổi)
                                        </div>
                                        <div className="col-6">
                                            <div className="field">
                                                <label htmlFor="fullname">Họ và tên (*):</label>
                                                <input
                                                    type="text"
                                                    name="fullname"
                                                    id="fullname"
                                                    defaultValue="Nguyễn Văn A"
                                                />
                                            </div>
                                            <div className="field">
                                                <label htmlFor="gender">Giới tính (*) :</label>
                                                <select name="gender" id="gender">
                                                    <option value="">Chọn giới tính</option>
                                                    <option value={1}>Nữ</option>
                                                    <option value={2} selected="">
                                                        Nam
                                                    </option>
                                                    <option value={3}>Khác</option>
                                                </select>
                                            </div>
                                            <div className="field">
                                                <label htmlFor="phone-number">Số điện thoại :</label>
                                                <input
                                                    type="text"
                                                    name="phone-number"
                                                    id="phone-number"
                                                    defaultValue="0978785678"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="field">
                                                <label htmlFor="luggage">Hành lý kí gửi :</label>
                                                <select name="luggage" id="luggage">
                                                    <option value={0}>Chọn trọng lượng mua thêm</option>
                                                    <option value={1} selected="">
                                                        Mua thêm 15kg-170,000VND
                                                    </option>
                                                    <option value={2}>Mua thêm 20kg-350,000VND</option>
                                                    <option value={3}>Mua thêm 25kg-400,000VND</option>
                                                </select>
                                            </div>
                                            <div className="field">
                                                <label htmlFor="email">Email :</label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    defaultValue="nguyenvana@gmail.com"
                                                />
                                            </div>
                                            <div className="field" id="id-card-1">
                                                <label htmlFor="id-card">CMND- Passport (*) :</label>
                                                <input
                                                    type="text"
                                                    name="id-card"
                                                    id="id-card"
                                                    defaultValue={187657210711}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="check-children">
                                            <p>Hành khách số 2 :</p>
                                            <input type="checkbox" id="checkbox1" defaultChecked=""/> Là trẻ
                                            em đi kèm ( từ 2-12 tuổi)
                                        </div>
                                        <div className="col-6">
                                            <div className="field">
                                                <label htmlFor="fullname">Họ và tên (*):</label>
                                                <input
                                                    type="text"
                                                    name="fullname"
                                                    id="fullname"
                                                    defaultValue="Nguyễn Văn B"
                                                />
                                            </div>
                                            <div className="field">
                                                <label htmlFor="gender">Giới tính (*):</label>
                                                <select name="gender" id="gender">
                                                    <option value="">Chọn giới tính</option>
                                                    <option value={1}>Nữ</option>
                                                    <option value={2} selected="">
                                                        Nam
                                                    </option>
                                                    <option value={3}>Khác</option>
                                                </select>
                                            </div>
                                            <div className="field" id="phone-number-1">
                                                <label htmlFor="phone-number">Số điện thoại :</label>
                                                <input
                                                    type="text"
                                                    name="phone-number"
                                                    id="phone-number"
                                                    defaultValue=""
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="field">
                                                <label htmlFor="luggage">Hành lý kí gửi :</label>
                                                <select name="luggage" id="luggage">
                                                    <option value={0}>Chọn trọng lượng mua thêm</option>
                                                    <option value={1}>Mua thêm 15kg-170,000VND</option>
                                                    <option value={2}>Mua thêm 20kg-350,000VND</option>
                                                    <option value={3}>Mua thêm 25kg-400,000VND</option>
                                                </select>
                                            </div>
                                            <div className="field" id="email-1">
                                                <label htmlFor="email">Email :</label>
                                                <input type="text" name="email" id="email" defaultValue=""/>
                                            </div>
                                            <div className="field" id="id_card-1">
                                                <label htmlFor="id-card">CMND- Passport (*) :</label>
                                                <input
                                                    type="text"
                                                    name="id-card"
                                                    id="id-card"
                                                    defaultValue=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row wrap" id="infor-ticket-2">
                            {/* <div class="location">
        <p class="h3">
          <span>Hồ Chí Minh</span>
          <i class="fa-solid fa-plane-departure"></i> <span>Hà Nội</span>
        </p>
      </div> */}
                            <div className="row">
                                <div className="col-4 info-fight">
                                    <p className="">hà nội (HAN)</p>
                                    <p className="outstanding">
                                        <span>05:00</span> <span>07/08/2020</span>
                                    </p>
                                    <p>Nội bài</p>
                                </div>
                                <div className="col-4 info-fight">
                                    <p className="">TP Hồ chí minh (SGN)</p>
                                    <p className="outstanding">
                                        <span>07:00</span> <span>07/08/2020</span>
                                    </p>
                                    <p>Tân Sơn Nhất</p>
                                </div>
                                <div className="col-4 info-fight">
                                    <div className="logo-image">
                                        {/* <img src="./image/VN.png" alt="logo" /> */}
                                        <p className="vietnam-airline">CodeGym Airline</p>
                                    </div>
                                    <p>
                                        Chuyến bay :<span className="outstanding">VN236</span>
                                    </p>
                                    <p>
                                        Loại ghế : <span className="outstanding">Phổ thông</span>
                                    </p>
                                </div>
                            </div>
                            <div className="row info-second">
                                <div className="col-2">
                                    <p>Loại hành khách</p>
                                    <p>Người lớn</p>
                                </div>
                                <div className="col-2">
                                    <p>Loại vé</p>
                                    <p className="outstanding">Khứ hồi</p>
                                </div>
                                <div className="col-2">
                                    <p>Giá mỗi vé</p>
                                    <p className="money">1,109,999 VND</p>
                                </div>
                                <div className="col-2">
                                    <p>Thuế &amp; Phí</p>
                                    <p className="money">681,000 VND</p>
                                </div>
                                <div className="col-2">
                                    <p>Tổng giá</p>
                                    <p className="money">1,790,999 VND</p>
                                </div>
                            </div>
                            <div className="info-four">
                                <p>
                                    Thông tin hành khách bay từ <span>Hà Nội </span>
                                    <i className="fa-solid fa-plane-departure"/>{" "}
                                    <span>Thành Phố Hồ Chí Minh</span>
                                </p>
                                <div className="row info-customer">
                                    <div className="row">
                                        <div className="check-children">
                                            <p>Hành khách số 1 :</p>
                                            <input type="checkbox"/> Có kèm em bé (nhỏ hơn 2 tuổi)
                                        </div>
                                        <div className="col-6">
                                            <div className="field">
                                                <label htmlFor="fullname">Họ và tên (*):</label>
                                                <input
                                                    type="text"
                                                    name="fullname"
                                                    id="fullname"
                                                    defaultValue="Nguyễn Văn A"
                                                />
                                            </div>
                                            <div className="field">
                                                <label htmlFor="gender">Giới tính (*):</label>
                                                <select name="gender" id="gender">
                                                    <option value="">Chọn giới tính</option>
                                                    <option value={1}>Nữ</option>
                                                    <option value={2} selected="">
                                                        Nam
                                                    </option>
                                                    <option value={3}>Khác</option>
                                                </select>
                                            </div>
                                            <div className="field">
                                                <label htmlFor="phone-number">Số điện thoại :</label>
                                                <input
                                                    type="text"
                                                    name="phone-number"
                                                    id="phone-number"
                                                    defaultValue="0978785678"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="field">
                                                <label htmlFor="luggage">Hành lý kí gửi :</label>
                                                <select name="luggage" id="luggage">
                                                    <option value={0}>Chọn trọng lượng mua thêm</option>
                                                    <option value={1} selected="">
                                                        Mua thêm 15kg-170,000VND
                                                    </option>
                                                    <option value={2}>Mua thêm 20kg-350,000VND</option>
                                                    <option value={3}>Mua thêm 25kg-400,000VND</option>
                                                </select>
                                            </div>
                                            <div className="field">
                                                <label htmlFor="email">Email :</label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    defaultValue="nguyenvana@gmail.com"
                                                />
                                            </div>
                                            <div className="field">
                                                <label htmlFor="id-card">CMND- Passport (*):</label>
                                                <input
                                                    type="text"
                                                    name="id-card"
                                                    id="id-card"
                                                    defaultValue={187657210711}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="check-children">
                                            <p>Hành khách số 2 :</p>
                                            <input type="checkbox" id="checkbox2"/> Là trẻ em đi kèm ( từ
                                            2-12 tuổi)
                                        </div>
                                        <div className="col-6">
                                            <div className="field">
                                                <label htmlFor="fullname">Họ và tên (*):</label>
                                                <input
                                                    type="text"
                                                    name="fullname"
                                                    id="fullname"
                                                    defaultValue="Nguyễn Thị B"
                                                />
                                            </div>
                                            <div className="field">
                                                <label htmlFor="gender">Giới tính (*) :</label>
                                                <select name="gender" id="gender">
                                                    <option value="">Chọn giới tính</option>
                                                    <option value={1} selected="">
                                                        Nữ
                                                    </option>
                                                    <option value={2}>Nam</option>
                                                    <option value={3}>Khác</option>
                                                </select>
                                            </div>
                                            <div className="field" id="phone-number-2">
                                                <label htmlFor="phone-number">Số điện thoại :</label>
                                                <input
                                                    type="text"
                                                    name="phone-number"
                                                    id="phone-number"
                                                    defaultValue="0912498611"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="field">
                                                <label htmlFor="luggage">Hành lý kí gửi :</label>
                                                <select name="luggage" id="luggage">
                                                    <option value={0}>Chọn trọng lượng mua thêm</option>
                                                    <option value={1} selected="">
                                                        Mua thêm 15kg-170,000VND
                                                    </option>
                                                    <option value={2}>Mua thêm 20kg-350,000VND</option>
                                                    <option value={3}>Mua thêm 25kg-400,000VND</option>
                                                </select>
                                            </div>
                                            <div className="field" id="email-2">
                                                <label htmlFor="email">Email :</label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    defaultValue="nguyenthib@gmail.com"
                                                />
                                            </div>
                                            <div className="field" id="id_card-2">
                                                <label htmlFor="id-card">CMND- Passport (*):</label>
                                                <input
                                                    type="text"
                                                    name="id-card"
                                                    id="id-card"
                                                    defaultValue={1797215131}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" btn">
                            <button>Chọn lại chuyến bay</button>
                            <button>Đặt vé</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}