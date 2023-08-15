import React, {useEffect, useState} from "react";
import {getRouteById, getTop10CheapestRoute} from "../../services/RouteServices";
import '../../css/home/Top10.css';
import {Link} from "react-router-dom";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default function GetTop10Cheapest() {
    const [top10s, setTop10s] = useState([]);
    const [route, setRoute] = useState({});
    const [isOpen, setIsOpen] = useState(false);


    const getTop10 = async () => {
        const data = await getTop10CheapestRoute();
        setTop10s(data);
    }

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const getRouteFunction = async (idRoute) => {
        const data = await getRouteById(idRoute);
        setRoute(data);
    }
    console.log(route)

    const getRouteFindById = async (id) => {
        await getRouteFunction(id);
    }

    useEffect(() => {
        getTop10();
    }, [])

    return (
        <div>
            <div className="row m-3">
                <div className="cheap">
                    <h3>Cùng khám phá những chuyến bay với giá cực hấp dẫn của chúng tôi</h3>
                </div>
                {
                    route.idRoute &&
                    <div>

                    </div>
                }
                <div className="col-12">
                    <div className="row row-cols-md-5">
                        {
                            top10s.map((route) => {
                                return (
                                    <div className="col">
                                        <div className="card" key={route.idRoute}>
                                            <img
                                                src="https://reviewvilla.vn/wp-content/uploads/2022/05/kinh-nghiem-du-lich-ha-noi-5-1024x577.jpg"
                                                className="card-img-top" alt="..."/>
                                            <div className="card-body">
                                                <div className="row"><h6
                                                    style={{color: "#daa310"}}>{route.timeDeparture} - {route.timeArrival}</h6>
                                                </div>
                                                <div className="row"><h6
                                                    style={{color: "#daa310"}}>{route.dateDeparture}</h6></div>
                                                <div className="row"><h6>{route.nameDeparture} đến</h6></div>
                                                <div className="row"><h6> {route.nameDestination}</h6></div>
                                                <div className="row"><h6 className='price-ticket'
                                                                         style={{color: "#daa310"}}>Chỉ
                                                    từ {route.priceRoute} (Một chiều/Phổ thông)</h6></div>
                                                <div className="row"><Link className="btn buy" onClick={() => {
                                                    getRouteFindById(route.idRoute)
                                                }}>Đến mua ngay</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}