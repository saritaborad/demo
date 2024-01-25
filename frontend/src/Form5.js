// components/Form.js
import React, { useState } from "react";
import axios from "axios";

const Form = () => {
 const [formFields, setFormFields] = useState([{ label: "", type: "text", required: false }]);

 const handleAddField = () => {
  setFormFields([...formFields, { label: "", type: "text", required: false }]);
 };

 const handleInputChange = (index, key, value) => {
  const updatedFields = [...formFields];
  updatedFields[index][key] = value;
  setFormFields(updatedFields);
 };

 const handleCreateForm = async () => {
  try {
   const response = await axios.post("http://localhost:5001/createForm", { fields: formFields });
   console.log(response.data);
  } catch (error) {
   console.error(error);
  }
 };

 const handleSubmission = async () => {
  try {
   // For simplicity, use the first form in the state.
   const formId = "replace-with-form-id";
   const answers = formFields.reduce(
    (acc, field) => ({ ...acc, [field.label]: "" }), // Initialize answers with empty strings
    {}
   );

   const response = await axios.post("http://localhost:5001/submitForm", { formId, answers });
   console.log(response.data);
  } catch (error) {
   console.error(error);
  }
 };

 return (
  <div>
   {formFields.map((field, index) => (
    <div key={index}>
     <label>
      Label:
      <input type="text" value={field.label} onChange={(e) => handleInputChange(index, "label", e.target.value)} />
     </label>
     <label>
      Type:
      <select value={field.type} onChange={(e) => handleInputChange(index, "type", e.target.value)}>
       <option value="text">Text</option>
       <option value="radio">Radio</option>
       <option value="checkbox">Checkbox</option>
       <option value="dropdown">Dropdown</option>
      </select>
     </label>
     <label>
      Required:
      <input type="checkbox" checked={field.required} onChange={(e) => handleInputChange(index, "required", e.target.checked)} />
     </label>
    </div>
   ))}
   <button onClick={handleAddField}>Add Field</button>
   <button onClick={handleCreateForm}>Create Form</button>
   <button onClick={handleSubmission}>Submit</button>
  </div>
 );
};

export default Form;
