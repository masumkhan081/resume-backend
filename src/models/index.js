import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = mongoose.model(
  "users",
  Schema({
    userName: {
      type: String,
      min: 4,
      max: 100,
      required: true,
    },
    email: {
      type: String,
      min: 25,
      max: 200,
      required: true,
    },
    role: {
      type: String,
      min: 25,
      max: 200,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    password: {
      type: String,
      min: 6,
      max: 1024,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  })
);
const basicInfoAndSkill = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  name: {
    type: String,
    min: 4,
    max: 100,
    required: true,
  },
  title: {
    type: String,
    min: 4,
    max: 100,
    required: true,
  },
  phone: {
    type: String,
    min: 25,
    max: 200,
    required: true,
  },
  email: {
    type: String,
    min: 25,
    max: 200,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  linkedin: {
    type: String,
    min: 6,
    max: 100,
    required: true,
  },

  github: {
    type: String,
    min: 6,
    max: 100,
    required: true,
  },
  portfolio: {
    type: String,
    min: 6,
    max: 100,
    required: true,
  },
  image: Buffer,
  frontEndSkills: [String],
  backEndSkills: [String],
  dataTierSkills: [String],
  personalSkills: [String],
});
const educationAndExperience = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  educations: [
    {
      degree: String,
      institution: String,
      startAt: Date,
      endAt: Date,
      result: Number,
    },
  ],
  experiences: [
    {
      designation: String,
      employer: String,
      isRunning: Boolean,
      startAt: Date,
      endAt: Date,
    },
  ],

});
const interestAndProject = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  }, 
  hobbies: [String],
  interests: [String],
  projects: [
    {
      title: {
        type: String,
        required: true,
      },
      tech: [String],
      description: { type: Number, required: true },
      link: { type: Number, required: true },
    },
  ],
});

const BasicInfoAndSkill = mongoose.model("basic.info.skills", basicInfoAndSkill);
const EducationAndExperience = mongoose.model("educations.experiences", educationAndExperience);
const InterestAndProject = mongoose.model("interests.projects", interestAndProject);

// resumeSchema.path("linkedin").validate((val) => {
//   urlRegex =
//     /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
//   return urlRegex.test(val);
// }, "Invalid URL.");

//
export default {
  User,
  BasicInfoAndSkill,
  EducationAndExperience,
  InterestAndProject
};
