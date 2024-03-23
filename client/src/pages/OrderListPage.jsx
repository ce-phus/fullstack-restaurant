import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkTokenValidation, getAllOrders, logout } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { dateCheck } from '../components/GetDate'
import { changeDeliveryStatus } from '../actions/breakfastActions'
import { CHANGE_DELIVERY_STATUS_RESET } from '../constants';
import { Spinner } from '../components'
import SectionWrapper from '../hoc/SectionWrapper'

const OrderListPage = () => {
  const router = useNavigate
  const dispatch = useDispatch();
  const placeholderValue = "Search orders by Customer Name, Address or by Ordered Item";

  const todays_date = dateCheck(new Date().toISOString().slice(0, 10));

  const [currentDateInfo] = useState(todays_date);
  const [idOfchangeDeliveryStatus, setIdOfchangeDeliveryStatus] = useState(0);
  const [cloneSearchTerm, setCloneSearchTerm] = useState("");

  const userLoginReducer = useSelector(state => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  const getAllOrdersReducer = useSelector(state => state.getAllOrdersReducer);
  const { orders, loading: loadingOrders } = getAllOrdersReducer;

  const changeDeliveryStatusReducer = useSelector(state => state.changeDeliveryStatusReducer);
  const { success: deliveryStatusChangeSuccess, loading: deliveryStatusChangeSpinner } = changeDeliveryStatusReducer;

  const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer);
  const { error: tokenError } = checkTokenValidationReducer;

  useEffect(() => {
    if (!userInfo) {
        router("/login");
    } else {
        dispatch(checkTokenValidation());
        dispatch(getAllOrders());
    }
  }, [userInfo, dispatch, history]);

  if (userInfo && tokenError === "Request failed with status code 401") {
    alert("Session expired, please login again.");
    dispatch(logout());
    router("/login");
    window.location.reload();
  }

  const changeDeliveryStatusHandler = (id, status) => {
    setIdOfchangeDeliveryStatus(id);
    const productData = {
        "is_delivered": status,
        "delivered_at": status ? currentDateInfo : "Not Delivered"
    };
    dispatch(changeDeliveryStatus(id, productData));
  };

  if (deliveryStatusChangeSuccess) {
    alert("Delivery status changed successfully");
    dispatch({
        type: CHANGE_DELIVERY_STATUS_RESET
    });
    dispatch(getAllOrders());
  }

  const handleSearchTerm = (term) => {
    setCloneSearchTerm(term);
  };
  
  return (
    <SectionWrapper>
      <div className="">
            {loadingOrders && (
                <span style={{ display: "flex" }}>
                    <h5>Getting Orders</h5>
                    <span className="ml-2">
                        {/* <Spinner animation="border" /> */}
                    </span>
                </span>
            )}
            {userInfo && userInfo.admin && <SearchBarForOrdersPage handleSearchTerm={handleSearchTerm} placeholderValue={placeholderValue} />}
            {orders.length > 0 ? (
                <table className="w-full text-left trl:text-right bg-gray-700 overflow-hidden shadow rounded-lg">
                    <thead className="bg-gray-700 text-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order Id
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer First Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer Second Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                               Ordered Items
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Paid Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Paid on
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Delivered Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Delivered On
                            </th>
                            {/* Add other table headings here */}
                        </tr>
                    </thead>
                    {orders.filter((item) => (
                        item.first_name.toLowerCase().includes(cloneSearchTerm) ||
                        item.last_name.toLowerCase().includes(cloneSearchTerm) ||
                        item.ordered_item.toLowerCase().includes(cloneSearchTerm)
                    )).map((order, idx) => (
                        <tbody key={idx} className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.first_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.last_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.ordered_item}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.paid_status ? (
                                <input disabled checked id="disabled-checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600  border-gray-700 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 " />
                            ) : (
                                <input disabled checked id="disabled-checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2" />
                            )}</td>

                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.paid_at}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.total_price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.is_delivered ? (
                                <input disabled checked id="disabled-checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600  border-gray-700 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 " />
                            ) : (
                                <input disabled checked id="disabled-checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2" />
                            )}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.delivered_at}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                {order.is_delivered ?
                                            <button
                                                className="bg-red-600 hover:bg-red-700 focus:ring-blue-800 rounded-lg font-medium text-sm px-5 py-2.5 text-center"
                                                onClick={() => changeDeliveryStatusHandler(order.id, false)}
                                            >
                                                {deliveryStatusChangeSpinner
                                                    &&
                                                    idOfchangeDeliveryStatus === order.id
                                                    ?
                                                    <Spinner/>
                                                    :
                                                    "Mark as Undelivered"}
                                            </button>
                                            :
                                            <button
                                                className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 rounded-lg font-medium text-sm px-5 py-2.5 text-center"
                                                onClick={() => changeDeliveryStatusHandler(order.id, true)}
                                            >
                                                {deliveryStatusChangeSpinner
                                                    &&
                                                    idOfchangeDeliveryStatus === order.id
                                                    ?
                                                    <Spinner/>
                                                    :
                                                    "Mark as delivered"}
                                            </button>
                                        }
                                
                                
                                </td>
                                
                                {/* Add other table cells here */}
                            </tr>
                        </tbody>
                    ))}
                </table>
            ) : (
                <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                <p class="font-bold text-3xl">No orders yet !!</p>
                <p>Make Order</p>
              </div>
            )}
        </div>
    </SectionWrapper>
  )
}

export default OrderListPage