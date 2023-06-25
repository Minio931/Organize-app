import classes from './Button.module.css';

const Button = (props) => {
   const type = props.type ? props.type : 'button';
   const color = props.color ? props.color : 'primary';
   const className = props.className
      ? `${classes.button} ${classes[color]} ${props.className}`
      : `${classes.button} ${classes[color]}`;
   const onClick = props.onClick ? props.onClick : () => {};

   return (
      <button className={className} type={type} onClick={onClick}>
         {props.children}
      </button>
   );
};

export default Button;
