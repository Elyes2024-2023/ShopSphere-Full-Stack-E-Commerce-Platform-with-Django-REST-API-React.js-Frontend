import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Table, Alert, Pagination } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listMyOrders } from '../redux/actions/orderActions';

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders, pages } = orderListMy;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(listMyOrders(page));
    }
  }, [dispatch, navigate, userInfo, page]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error Loading Orders</Alert.Heading>
        <p>{error}</p>
        <Button variant="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Alert>
    );
  }

  return (
    <>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <Message>You have no orders yet</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <span className='text-success'>
                        Paid on {formatDate(order.paidAt)}
                      </span>
                    ) : (
                      <span className='text-danger'>Not Paid</span>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <span className='text-success'>
                        Delivered on {formatDate(order.deliveredAt)}
                      </span>
                    ) : (
                      <span className='text-danger'>Not Delivered</span>
                    )}
                  </td>
                  <td>
                    <Button
                      variant='light'
                      className='btn-sm'
                      onClick={() => navigate(`/order/${order._id}`)}
                      aria-label={`View order ${order._id}`}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {pages > 1 && (
            <Pagination className='justify-content-center'>
              <Pagination.Prev
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                aria-label="Previous page"
              />
              {[...Array(pages).keys()].map((x) => (
                <Pagination.Item
                  key={x + 1}
                  active={x + 1 === page}
                  onClick={() => setPage(x + 1)}
                >
                  {x + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={page === pages}
                onClick={() => setPage(page + 1)}
                aria-label="Next page"
              />
            </Pagination>
          )}
        </>
      )}
    </>
  );
};

export default OrderListScreen; 