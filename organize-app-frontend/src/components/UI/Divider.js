import classes from './Divider.module.css';

const Divider = (props) => {
   let className = classes.divider;
   if (props.className && typeof props.className === 'string') className += ` ${props.className}`;

   return <hr className={className} />;
};

export default Divider;
