import { useState } from "react";

const useForm = (formState) => {
  const [form, setForm] = useState(formState);

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

  return {
    form,
    onChangeInput,
    setForm,
    handleProgramChange
  };
};

export default useForm;
