import { EducationAndExperience } from "../models/index";
import obj from "../config/settings";
//

async function getData(req, res, searchObj = { name: "" }) {

   let msg = searchObj.name ? `Searched for '${searchObj.name}'` : "plain--";

   EducationAndExperience.find()
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
   const { userId, educations, experiences } = req.body;
   (await EducationAndExperience.findOneUpdate(userId, { educations, experiences }))
      ? res.status(200).send({ message: "Updated successfully" })
      : res.status(400).send({ message: "Error in update" });
}

export default { getData, updateData }