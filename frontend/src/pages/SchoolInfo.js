import { useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import useForm from "../hooks/useForm";
import { fetchData } from "../hooks/useApi";
import "../css/schoolInfo.css";
import UniversalButton from "../components/UniversalButton";

const SchoolInfo = () => {
  const { form, setForm, onChangeInput, handleSubmit, validated } = useForm({
    costCoreProgram: 0,
    costEarlyMorning: 0,
    costExtendedDay: 0,
    costLateDay: 0,
    squareFootageInfants: 0,
    squareFootageCrawlers: 0,
    squareFootageToddlers: 0,
    squareFootageTwos: 0,
    squareFootageCrib: 0,
    squareFootageNoCrib: 0,
    ratioBirthToTwo: 0,
    ratioTwoToThree: 0,
    oneTo3SnackMilk: 0,
    oneTo3SnackGrains: 0,
    oneTo3SnackProtein: 0,
    oneTo3SnackVegFruit: 0,
    kidsPerEmergencyCrib: 0,
  });

  useEffect(() => {
    fetchSchool();
  }, []);

  const fetchSchool = async () => {
    const schoolResponse = await fetchData("/api/school/", "GET");
    setForm(schoolResponse[0]);
  };

  //   const handleAddSchool = async (e) => {
  //     e.preventDefault();
  //     const school = { ...form };
  //     const response = await fetch("/api/school/", {
  //       method: "POST",
  //       body: JSON.stringify(school),
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     const json = await response.json();

  //     if (!response) {
  //       throw Error("Error while adding the school to the database");
  //     }

  //     if (response.ok) {
  //       console.log("school added");
  //       console.log(json);
  //     }
  //   };

  const updateSchool = async (e) => {
    e.preventDefault();
    const school = { ...form };
    const response = await fetchData("/api/school/", "PATCH", school);
    setForm({ ...response });
  };

  return (
    <Form
      noValidate
      onSubmit={(e) => handleSubmit(e, updateSchool)}
      validated={validated}
      className="school-info"
    >
      <section>
        <h3>Revenue</h3>
        <Form.Group>
          <Form.Label>Cost of Core Hours (8:30-3:30)</Form.Label>
          <InputGroup>
          <InputGroup.Text>
            $
          </InputGroup.Text>
          <Form.Control
            type="number"
            name="costCoreProgram"
            value={form.costCoreProgram}
            onChange={onChangeInput}
          />
          </InputGroup>
          <Form.Label>Cost of Early Morning Program (7:30-8:30)</Form.Label>
          <InputGroup>
          <InputGroup.Text>
            $
          </InputGroup.Text>
          <Form.Control
            type="number"
            name="costEarlyMorning"
            value={form.costEarlyMorning}
            onChange={onChangeInput}
          />
          </InputGroup>
          <Form.Label>Cost of Extended Day (3:30-4:30)</Form.Label>
          <InputGroup>
          <InputGroup.Text>
            $
          </InputGroup.Text>
          <Form.Control
            type="number"
            placeholder="Cost"
            name="costExtendedDay"
            value={form.costExtendedDay}
            onChange={onChangeInput}
          />
          </InputGroup>
          <Form.Label>Cost of Late Day (4:30-5:30)</Form.Label>
          <InputGroup>
          <InputGroup.Text>
            $
          </InputGroup.Text>
          <Form.Control
            type="number"
            placeholder="Cost"
            name="costLateDay"
            value={form.costLateDay}
            onChange={onChangeInput}
          />
          </InputGroup>
        </Form.Group>
      </section>
      <section>
        <h3> Square Footage </h3>
        <Form.Group>
          <Form.Label>Infant Room</Form.Label>
          <InputGroup>
          <Form.Control
            type="number"
            name="squareFootageInfants"
            onChange={onChangeInput}
            value={form.squareFootageInfants}
          />
          <InputGroup.Text>
            square feet
          </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Crawlers Room</Form.Label>
          <InputGroup>
          <Form.Control
            type="number"
            name="squareFootageCrawlers"
            onChange={onChangeInput}
            value={form.squareFootageCrawlers}
          />
          <InputGroup.Text>
            square feet
          </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Toddlers Room</Form.Label>
          <InputGroup>
          <Form.Control
            type="number"
            name="squareFootageToddlers"
            onChange={onChangeInput}
            value={form.squareFootageToddlers}
          />
          <InputGroup.Text>
            square feet
          </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Twos</Form.Label>
          <InputGroup>
          <Form.Control
            type="number"
            name="squareFootageTwos"
            onChange={onChangeInput}
            value={form.squareFootageTwos}
          />
          <InputGroup.Text>
            square feet
          </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Child with crib</Form.Label>
          <InputGroup>
          <Form.Control
            type="number"
            name="squareFootageCrib"
            onChange={onChangeInput}
            value={form.squareFootageCrib}
          />
          <InputGroup.Text>
            square feet
          </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Child <strong>without</strong> crib
          </Form.Label>
          <InputGroup>
          <Form.Control
            type="number"
            name="squareFootageNoCrib"
            onChange={onChangeInput}
            value={form.squareFootageNoCrib}
          />
           <InputGroup.Text>
            square feet
          </InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </section>
      <section>
        <h3>Snack Requirements (1-3 years)</h3>
        <Form.Group>
          <Form.Label>Milk</Form.Label>
          <InputGroup>
          <Form.Control
            type="number"
            name="oneTo3SnackMilk"
            onChange={onChangeInput}
            value={form.oneTo3SnackMilk}
          />
           <InputGroup.Text id="basic-addon1">
            ounces
          </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Grains</Form.Label>
          <InputGroup>
          <Form.Control
            type="number"
            name="oneTo3SnackGrains"
            onChange={onChangeInput}
            value={form.oneTo3SnackGrains}
          />
           <InputGroup.Text id="basic-addon1">
            ounces
          </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Protein</Form.Label>
          <InputGroup>
          <Form.Control
            type="number"
            name="oneTo3SnackProtein"
            onChange={onChangeInput}
            value={form.oneTo3SnackProtein}
          />
           <InputGroup.Text>
            ounces
          </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Vegetable OR Fruit</Form.Label>
          <InputGroup>
          <Form.Control
            type="number"
            name="oneTo3SnackVegFruit"
            onChange={onChangeInput}
            value={form.oneTo3SnackVegFruit}
          />
           <InputGroup.Text >
            ounces
          </InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </section>
      <section>
        <h3>Ratio</h3>
        <Form.Group>
          <Form.Label>Ratio 0-2 Years</Form.Label>
          <InputGroup>
          <Form.Control
            type="number"
            name="ratioBirthToTwo"
            onChange={onChangeInput}
            value={form.ratioBirthToTwo}
          />
           <InputGroup.Text id="basic-addon1">
            Children : 1 Adult
          </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Ratio 2+ Years</Form.Label>
          <InputGroup>
          <Form.Control
            type="number"
            name="ratioTwoToThree"
            onChange={onChangeInput}
            value={form.ratioTwoToThree}
          />

          <InputGroup.Text id="basic-addon1">
            Children : 1 Adult
          </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Children Per Emergency Crib</Form.Label>
          <Form.Control
            type="number"
            name="kidsPerEmergencyCrib"
            onChange={onChangeInput}
            value={form.kidsPerEmergencyCrib}
          />
        </Form.Group>
      </section>
      <UniversalButton
        variant="contained"
        eventHandler={updateSchool}
        customStyles={{
          margin: ".7rem",
          backgroundColor: "var(--bright-peach)",
          "&:hover": { backgroundColor: "var(--darkest-peach)" },
        }}
        buttonText="Save changes"
      />
    </Form>
  );
};

export default SchoolInfo;
