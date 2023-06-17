import classes from './Header.module.css';

const Header = (props) => {
   return <h1 className={classes.header}>{props.children}</h1>;
};

export default Header;
