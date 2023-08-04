import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Slider = ({ checked, setIsChecked }) => {
  useEffect(() => {
    setIsChecked(checked);
  }, []);

  let navigate = useNavigate();
  const handleChange = (e) => {
    if (e.target.checked) {
      setIsChecked("true");
      navigate("/dashboard");
    } else {
      setIsChecked("false");
      navigate("/");
    }
  };

  return (
    <Form className="navigation-switch">
      <Form.Check type="switch" id="navigator-switch" onChange={handleChange} />
    </Form>
  );
};

export default Slider;
