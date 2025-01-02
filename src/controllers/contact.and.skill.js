
const { BasicInfoAndSkill } = require("../model");
const obj = require("../data-tier/settings");
// 

async function getData(req, res, searchObj = { name: "" }) {

   let msg = searchObj.name ? `Searched for '${searchObj.name}'` : "plain--";

   BasicInfoAndSkill.find()
      .then((data) => {
         res.status(200).send({
            data,
            msg, 
         });
      })
      .catch((err) => {
         res.send(obj.msg_err_load + "  err: " + err);
      });
}

async function updateData(req, res) {
   const { userId, name, title, phone, email, dob, linkedin, github, porfolio, frontEndSkills, dataTierSkills, backEndSkills, personalSkills } = req.body;
   (await Formulation.findOneUpdate(userId, {  name, title, phone, email, dob, linkedin, github, porfolio, frontEndSkills, dataTierSkills, backEndSkills, personalSkills }))
      ? res.status(200).send({ message: "Updated successfully" })
      : res.status(400).send({ message: "Error in update" });
}

module.exports = { getData, updateData }