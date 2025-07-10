import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import moment from "moment";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="bg-darkBackground text-lightText min-h-screen pt-8">
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <AdminMenu />
        <div className="md:ml-20 w-full p-3 animate-slideInRight">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">All Orders</h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow-xl border border-gray-700">
              <table className="w-full table-auto">
                <thead className="bg-gray-800">
                  <tr className="text-lightText uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">ITEMS</th>
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">USER</th>
                    <th className="py-3 px-6 text-left">DATE</th>
                    <th className="py-3 px-6 text-left">TOTAL</th>
                    <th className="py-3 px-6 text-left">PAID</th>
                    <th className="py-3 px-6 text-left">DELIVERED</th>
                    <th className="py-3 px-6 text-left"></th>
                  </tr>
                </thead>

                <tbody className="text-lightText text-sm font-light">
                  {orders.map((order, index) => (
                    <tr key={order._id} className="border-b border-gray-700 hover:bg-gray-800 animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <img
                          src={order.orderItems[0].image}
                          alt={order._id}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </td>
                      <td className="py-3 px-6 text-left">
                        <span className="font-semibold">{order._id}</span>
                      </td>

                      <td className="py-3 px-6 text-left">
                        {order.user ? order.user.username : "N/A"}
                      </td>

                      <td className="py-3 px-6 text-left">
                        {order.createdAt ? moment(order.createdAt).format("MMM Do YYYY") : "N/A"}
                      </td>

                      <td className="py-3 px-6 text-left text-primary font-bold">$ {order.totalPrice.toFixed(2)}</td>

                      <td className="py-3 px-6 text-left">
                        {order.isPaid ? (
                          <p className="p-2 text-center text-white bg-green-500 rounded-full text-xs">
                            Completed
                          </p>
                        ) : (
                          <p className="p-2 text-center text-white bg-red-500 rounded-full text-xs">
                            Pending
                          </p>
                        )}
                      </td>

                      <td className="py-3 px-6 text-left">
                        {order.isDelivered ? (
                          <p className="p-2 text-center text-white bg-green-500 rounded-full text-xs">
                            Completed
                          </p>
                        ) : (
                          <p className="p-2 text-center text-white bg-red-500 rounded-full text-xs">
                            Pending
                          </p>
                        )}
                      </td>

                      <td className="py-3 px-6 text-left">
                        <Link to={`/order/${order._id}`}>
                          <button className="bg-secondary text-white py-2 px-4 rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105">
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
