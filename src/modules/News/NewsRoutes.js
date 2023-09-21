const router = require("express").Router();
const { save, findByProject, update, remove } = require("./NewsController");
const {
  validatedUser,
  authorizedUser,
  authorizedLeadership,
  authorizedMemberOnProject,
  isOwnerOfNews,
} = require("@middlewares/auth");

router.post("/news/:project-id", authorizedLeadership || authorizedMemberOnProject, save);
router.get("/news/:project-id", validatedUser, findByProject);
router.patch("/news/:news-id", authorizedUser || isOwnerOfNews, update);
router.delete("/news/:project-id", authorizedLeadership || isOwnerOfNews, remove);

module.exports = router;