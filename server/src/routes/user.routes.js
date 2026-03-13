import { Router } from "express";
import { registerUser } from "../controllers/user.controller/register.js";
import { loginUser } from "../controllers/user.controller/login.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { logoutUser } from "../controllers/user.controller/logout.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadImage } from "../controllers/utilities.controller/profilePic.js";
import { changePassword } from "../controllers/utilities.controller/changePassword.js";
import { createSubject, deleteSubject, getAllSubject, getSingleSubject, updateSubject } from "../controllers/subject.controller.js";
import { createGoal, deleteGoal, getAllGoals, getSingleGoal, updateGoal } from "../controllers/goal.controller.js";
import { generateStudyPlan } from "../controllers/studyPlan.controller/create.js";
import { getStudyPlan } from "../controllers/studyPlan.controller/getPlan.js";
import { markTaskDone } from "../controllers/studyPlan.controller/markTaskDone.js";
import { getTodayTask } from "../controllers/studyPlan.controller/todaysTask.js";
import { getTotalProgress } from "../controllers/utilities.controller/progressTracking.js";
import { getUpcomingTasks } from "../controllers/studyPlan.controller/getUpcomingPlan.js";
import { getStudyStreak } from "../controllers/utilities.controller/studyStreak.js";
import { getCurrentUser } from "../controllers/utilities.controller/getUser.js";
import { getWeeklyStats } from "../controllers/utilities.controller/getWeeklyStats.js";
import { getSubjectDistribution } from "../controllers/utilities.controller/subjectDistribution.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//protected routes
router.route("/get-current-user").get(verifyjwt, getCurrentUser);
router.route("/logout").post(verifyjwt, logoutUser);
router.route("/update-profile-pic").post(verifyjwt, upload.fields([
  {
    name: "profile",
    maxCount: 1,
  }
]),uploadImage);
router.route("/change-password").post(verifyjwt, changePassword);
router.route("/create-subject").post(verifyjwt, createSubject);
router.route("/get-all-subjects").get(verifyjwt, getAllSubject);
router.route("/get-subject/:subjectId").get(verifyjwt, getSingleSubject);
router.route("/update-subject/:subjectId").post(verifyjwt, updateSubject);
router.route("/delete-subject/:subjectId").post(verifyjwt, deleteSubject);
router.route("/create-goal").post(verifyjwt, createGoal);
router.route("/get-all-goals").get(verifyjwt, getAllGoals);
router.route("/get-goal/:goalId").get(verifyjwt, getSingleGoal);
router.route("/update-goal/:goalId").post(verifyjwt, updateGoal);
router.route("/delete-goal/:goalId").post(verifyjwt, deleteGoal);
router.route("/generate-plan/:goalId").get(verifyjwt,generateStudyPlan).post(verifyjwt,generateStudyPlan);
router.route("/get-study-plan/:goalId").get(verifyjwt, getStudyPlan)
router.route("/study-plan/mark-task-done/:taskId").patch(verifyjwt,markTaskDone)
router.route("/study-plan/get-today-task").get(verifyjwt,getTodayTask)
router.route("/track-progress").get(verifyjwt, getTotalProgress)
router.route("/get-upcoming-plan").get(verifyjwt, getUpcomingTasks)
router.route("/get-study-streak").get(verifyjwt, getStudyStreak)
router.route("/get-weekly-stats").get(verifyjwt, getWeeklyStats)
router.route("/get-subject-distribution").get(verifyjwt, getSubjectDistribution)
export default router;