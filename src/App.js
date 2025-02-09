import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Main from './components/Main';
import Navbar from './components/Navbar';
import AddBlog from './AddBlog';
import ViewBlog from './components/ViewBlog';
import Myprofile from './components/Myprofile';
import Adminlogin from './components/admin/Adminlogin';
import UserBlog from './components/UserBlog';
import UserNavbar from './components/UserNavbar';
import UserMain from './components/UserMain';
import Cart from './components/Cart';
import Menu from './components/Menu';
import Order from './components/Order';
import Myorder from './components/MyOrder';
import AdminOrders from './components/admin/AdminOrders';
import { ToastContainer } from 'react-toastify';
import AdminDashboard from './components/admin/AdminDashboard';



function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/sign' element={<Signup />} />
        <Route path='/add' element={<Main child={<AddBlog />} />} />
        <Route path='/view' element={<Main child={<ViewBlog />} />} />
        <Route path="/viewUserOrders" element={<Main child={<AdminOrders />} />} />
        <Route path="/dashboard" element={<Main child={<AdminDashboard />} />} />
        <Route path='/nav' element={<Navbar />} />

        <Route path='/adminlogin' element={<Adminlogin />} />

        <Route path='/userview' element={<UserMain child={<UserBlog />} />} />
        <Route path='/usernav' element={<UserNavbar />} />
        <Route path='/my' element={<UserMain child={<Myprofile />} />} />
        <Route path='/cart' element={<UserMain child={<Cart />} />} />
        <Route path='/menu' element={<UserMain child={<Menu />} />} />
        <Route path='/order' element={<UserMain child={<Order />} />} />
        <Route path='/myorder' element={<UserMain child={<Myorder />} />} />

      </Routes>
    </div>
  );
}

export default App;
