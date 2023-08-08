const StatusSquares = ({ data }) => {
  const { category, count } = data;

  return (
    <>
      <div className='status-square'>
        <h6>{category}</h6>
        <p>{count}</p>
      </div>
    </>
  );
};

export default StatusSquares;
