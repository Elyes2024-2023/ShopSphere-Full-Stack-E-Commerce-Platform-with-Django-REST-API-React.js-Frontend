import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { listUsers } from '../redux/actions/userActions';
import { listOrders } from '../redux/actions/orderActions';
import { listProducts } from '../redux/actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const AdminScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingUsers, error: errorUsers, users } = userList;

  const orderList = useSelector((state) => state.orderList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderList;

  const productList = useSelector((state) => state.productList);
  const { loading: loadingProducts, error: errorProducts, products } = productList;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    } else {
      dispatch(listUsers());
      dispatch(listOrders());
      dispatch(listProducts());
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1>Admin Dashboard</h1>
      <Row>
        <Col md={4}>
          <Card className='my-3 p-3 rounded'>
            <Card.Body>
              <Card.Title as='h2'>Users</Card.Title>
              {loadingUsers ? (
                <Loader />
              ) : errorUsers ? (
                <Message variant='danger'>{errorUsers}</Message>
              ) : (
                <>
                  <Card.Text>Total Users: {users.length}</Card.Text>
                  <Link to='/admin/userlist'>
                    <Button variant='primary'>Manage Users</Button>
                  </Link>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='my-3 p-3 rounded'>
            <Card.Body>
              <Card.Title as='h2'>Products</Card.Title>
              {loadingProducts ? (
                <Loader />
              ) : errorProducts ? (
                <Message variant='danger'>{errorProducts}</Message>
              ) : (
                <>
                  <Card.Text>Total Products: {products.length}</Card.Text>
                  <Link to='/admin/productlist'>
                    <Button variant='primary'>Manage Products</Button>
                  </Link>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='my-3 p-3 rounded'>
            <Card.Body>
              <Card.Title as='h2'>Orders</Card.Title>
              {loadingOrders ? (
                <Loader />
              ) : errorOrders ? (
                <Message variant='danger'>{errorOrders}</Message>
              ) : (
                <>
                  <Card.Text>Total Orders: {orders.length}</Card.Text>
                  <Link to='/admin/orderlist'>
                    <Button variant='primary'>Manage Orders</Button>
                  </Link>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminScreen; 