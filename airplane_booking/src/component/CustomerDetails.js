import { useEffect, useState } from "react";
import { getCustomerById } from "../services/CustomerServices";
import { Link, useParams } from "react-router-dom";
import moment from 'moment';
import "../css/customer/customer_update_details.css"




export default function CustomerDetails() {

  const [customer, setCustomer] = useState({})
  const param = useParams()
  const [id,setId]=useState(0)

  const getCustomer = async (id) => {
    const data = await getCustomerById(id)
    setCustomer(data)

  }
  console.log(customer.imgCustomer)
  const formattedDate = moment(customer.dateCustomer).format('DD/MM/YYYY');

  useEffect(() => {
    getCustomer(param.id)
  }, [id])

  useEffect(()=>{
    setId(param.id)
  },[])

  return (

    <div id="booking" className="section">
      <div className="section-center">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-4 col-lg-4">
              <div>
                <img style={{marginTop:50}} src={customer.imgCustomer!=""?customer.imgCustomer:"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"}  alt="Preview Image" id="img-preview" />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-8">
              <div className="booking-form">
                <div>
                  <p style={{fontWeight:"500",textAlign:"center"}}> THÔNG TIN CÁ NHÂN</p>
                </div>
                <form className="booking-form-padding">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <span className="form-label">Họ và tên</span>
                        <p className="form-control">{customer.nameCustomer}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <span className="form-label">Giới tính</span>
                         {
                          customer.genderCustomer == true?
                              <p className="form-control">Nữ</p>
                            :  <p className="form-control">Nam</p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <span className="form-label">CCCD/Passport</span>
                        <p className="form-control">{customer.idCardCustomer}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <span className="form-label">Số điện thoại</span>
                        <p className="form-control">{customer.telCustomer}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <span className="form-label">Ngày sinh</span>
                        <p className="form-control">{formattedDate}</p>

                      </div>
                    </div>
                  </div>
                  <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <span className="form-label">Địa chỉ</span>
                      <p className="form-control">{customer.addressCustomer}</p>
                    </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <span className="form-label">Email</span>
                        <p className="form-control">{customer.emailCustomer}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <span className="form-label">Quốc tịch</span>
                        <p className="form-control">{customer.nationalityCustomer}</p>
                      </div>
                    </div>
                  </div>
                  <div className="form-btn" style={{ display: 'flex', justifyContent: 'right' }}>
                    <Link to={`/customers/update/${customer.idCustomer}`} className="submit-btn" style={{ textAlign: 'center', marginRight: '10px', 'paddingTop': '5px' }}>Chỉnh sửa</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
