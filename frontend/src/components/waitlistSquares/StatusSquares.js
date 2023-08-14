import Paper from "@mui/material/Paper";

const StatusSquares = ({ data }) => {
  const { category, count } = data;

  return (
    <>
      <Paper
        className="status-square"
        sx={{ padding: "1rem" }}
        elevation={count ? count : 1}
      >
        <p><strong>{category}</strong></p>
        <p>{count}</p>
      </Paper>
    </>
  );
};

export default StatusSquares;
