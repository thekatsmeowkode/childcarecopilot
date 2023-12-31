import { useState } from "react";

const useForm = (formState) => {
  const [form, setForm] = useState(formState);
  const [validated, setValidated] = useState(false);

  const onChangeInput = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: newValue });
  };

  const handleProgramChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setForm((prevForm) => ({
        ...prevForm,
        programs: [...prevForm.programs, value],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        programs: prevForm.programs.filter((program) => program !== value),
      }));
    }
  };

  const handleSubmit = async (e, callback, ref) => {
    e.preventDefault()
    const isValid = ref.current.checkValidity()

    if (!isValid) {
      e.stopPropagation();
    }

    setValidated(true);

    if (isValid) {
      callback(e);
    }
  };

  return {
    form,
    onChangeInput,
    setForm,
    handleProgramChange,
    handleSubmit,
    validated,
  };
};

export default useForm;
