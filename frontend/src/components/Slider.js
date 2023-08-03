import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  let navigate = useNavigate();
  const handleChange = (e) => {
    e.target.checked ? navigate("/dashboard") : navigate("/");
  };

  return (
    <Form className="navigation-switch">
      <Form.Check type="switch" id="navigator-switch" onChange={handleChange} />
    </Form>
  );
};

export default Slider;
