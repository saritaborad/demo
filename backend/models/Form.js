// models/Form.ts
import mongoose, { Schema } from "mongoose";
const formSchema = new Schema({
 fields: [
  {
   label: { type: String, required: true, trim: true },
   type: { type: String, required: true, enum: ["text", "radio", "checkbox", "dropdown"] },
   options: { type: [String], default: [] },
   required: { type: Boolean, default: false },
  },
 ],
 answers: { type: Schema.Types.Mixed, default: {} },
});

const Form = mongoose.model("Form", formSchema);

export default Form;
