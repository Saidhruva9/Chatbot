const Card = ({ children, className }) => {
    return (
      <div className={`border shadow-md p-4 rounded ${className}`}>
        {children}
      </div>
    );
  };
  
  export default Card;