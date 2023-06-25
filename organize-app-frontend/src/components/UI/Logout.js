import { useNavigate } from 'react-router-dom';
import classes from './Logout.module.css';
import Button from './Button';

const Logout = (props) => {
   const navigate = useNavigate();
   const logoutHandler = () => {
      navigate('/');
      localStorage.removeItem('user');
   };
   return (
      <div className={classes['logout-popup']}>
         <p className={classes['logout-header']}>Are you sure you want to sign out?</p>
         <div className={classes['logout-actions']}>
            <Button onClick={props.onClose} color="secondary">
               Cancel
            </Button>
            <Button onClick={logoutHandler}>Sign out</Button>
         </div>
      </div>
   );
};

export default Logout;
