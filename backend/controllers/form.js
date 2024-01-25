// controllers/formController.ts

import Form from "../models/Form";

export const createForm = async (req, res) => {
 try {
  const { fields } = req.body;
  const newForm = new Form({ fields });
  const savedForm = await newForm.save();
  res.status(201).json(savedForm);
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal Server Error" });
 }
};

export const submitForm = async (req, res) => {
 try {
  const { formId, answers } = req.body;
  const form = await Form.findById(formId);

  if (!form) {
   res.status(404).json({ message: "Form not found" });
   return;
  }

  form.answers = answers;
  const savedForm = await form.save();
  res.status(200).json(savedForm);
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal Server Error" });
 }
};
