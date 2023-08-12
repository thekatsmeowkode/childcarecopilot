import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import useForm from "../hooks/useForm";

const SchoolInfo = () => {
  const [validated, setValidated] = useState(false);
  const { form, setForm, onChangeInput } = useForm({
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
    numberBathrooms: 0,
    oneTo3SnackMilk: 0,
    oneTo3SnackGrains: 0,
    oneTo3SnackProtein: 0,
    oneTo3SnackVegFruit: 0,
    ratioBirthToTwo: 0,
    ratioTwoToThree: 0,
    kidsPerEmergencyCrib: 0,
  });

    useEffect(() => {
      fetchSchool()
    }, [])

    const fetchSchool = async () => {
      try {
        const schoolResponse = await fetch("/api/school/", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const schoolData = await schoolResponse.json()
          //there will only be one school in the database, so 0 index hardcoded here
          setForm(schoolData[0])
      }
      catch (error) {
          console.error('Error fetching data:', error)
      }
    }

  const handleSubmit = (e) => {
    const form = e.target;
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity() === true) {
        updateSchool(e)
    }
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
    e.preventDefault()
    const school = {...form}
    const response = await fetch('/api/school/', {
        method: "PATCH",
        body: JSON.stringify(school),
        headers: { "Content-Type": "application/json" }
    })

    const json = await response.json();

    if (!response) {
      throw Error("Error while updating the school in the database");
    }

    if (response.ok) {
      console.log("school updated");
      console.log(json);
    }
  }

  return (
    <Form noValidate onSubmit={handleSubmit} validated={validated}>
      <Form.Group>
        <Form.Label>Cost of Core Hours (8:30-3:30)</Form.Label>
        <Form.Control
          type="number"
          name="costCoreProgram"
          value={form.costCoreProgram}
          onChange={onChangeInput}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Cost of Early Morning Program (7:30-8:30)</Form.Label>
        <Form.Control
          type="number"
          name="costEarlyMorning"
          value={form.costEarlyMorning}
          onChange={onChangeInput}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Cost of Extended Day (3:30-4:30)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Cost"
          name="costExtendedDay"
          value={form.costExtendedDay}
          onChange={onChangeInput}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Cost of Late Day (4:30-5:30)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Cost"
          name="costLateDay"
          value={form.costLateDay}
          onChange={onChangeInput}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Square Footage Infant Room</Form.Label>
        <Form.Control
          type="number"
          name="squareFootageInfants"
          onChange={onChangeInput}
          value={form.squareFootageInfants}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Square Footage Crawlers Room</Form.Label>
        <Form.Control
          type="number"
          name="squareFootageCrawlers"
          onChange={onChangeInput}
          value={form.squareFootageCrawlers}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Square Footage Toddlers Room</Form.Label>
        <Form.Control
          type="number"
          name="squareFootageToddlers"
          onChange={onChangeInput}
          value={form.squareFootageToddlers}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Square Footage Twos Room</Form.Label>
        <Form.Control
          type="number"
          name="squareFootageTwos"
          onChange={onChangeInput}
          value={form.squareFootageTwos}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Square footage required by child with crib</Form.Label>
        <Form.Control
          type="number"
          name="squareFootageCrib"
          onChange={onChangeInput}
          value={form.squareFootageCrib}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Square footage required by child <strong>without</strong> crib
        </Form.Label>
        <Form.Control
          type="number"
          name="squareFootageNoCrib"
          onChange={onChangeInput}
          value={form.squareFootageNoCrib}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Number of bathrooms</Form.Label>
        <Form.Control
          type="number"
          name="numberBathrooms"
          onChange={onChangeInput}
          value={form.numberBathrooms}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>One To Three Year Old Milk Requirements @ Snack</Form.Label>
        <Form.Control
          type="number"
          name="oneTo3SnackMilk"
          onChange={onChangeInput}
          value={form.oneTo3SnackMilk}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          One To Three Year Old Grain Requirements @ Snack
        </Form.Label>
        <Form.Control
          type="number"
          name="oneTo3SnackGrains"
          onChange={onChangeInput}
          value={form.oneTo3SnackGrains}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          One To Three Year Old Protein Requirements @ Snack
        </Form.Label>
        <Form.Control
          type="number"
          name="oneTo3SnackProtein"
          onChange={onChangeInput}
          value={form.oneTo3SnackProtein}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          One To Three Year Old Vegetable OR Fruit Requirements @ Snack
        </Form.Label>
        <Form.Control
          type="number"
          name="oneTo3SnackVegFruit"
          onChange={onChangeInput}
          value={form.oneTo3SnackVegFruit}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Ratio 0-2 Years</Form.Label>
        <Form.Control
          type="number"
          name="ratioBirthToTwo"
          onChange={onChangeInput}
          value={form.ratioBirthToTwo}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Ratio 2+ Years</Form.Label>
        <Form.Control
          type="number"
          name="ratioTwoToThree"
          onChange={onChangeInput}
          value={form.ratioTwoToThree}
        />
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
      <Button type="submit" variant="primary">
        Save Changes
      </Button>
    </Form>
  );
};

export default SchoolInfo;
