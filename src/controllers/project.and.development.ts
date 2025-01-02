const { InterestAndProject } from "../models");
const obj from "../config/settings");
//

async function getData(req, res, searchObj = { name: "" }) {

   let msg = searchObj.name ? `Searched for '${searchObj.name}'` : "plain--";

   InterestAndProject.find()
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
   const { userId, hobbies, interests, projects } = req.body;
   (await InterestAndProject.findOneUpdate(userId, { hobbies, interests, projects }))
      ? res.status(200).send({ message: "Updated successfully" })
      : res.status(400).send({ message: "Error in update" });
}

export default { getData, updateData }