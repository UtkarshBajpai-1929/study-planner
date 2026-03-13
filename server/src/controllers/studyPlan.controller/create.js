import { Goal } from "../../models/goal.model.js";
import { Subject } from "../../models/subject.model.js";
import { apiError } from "../../utils/apiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { main } from "../../utils/gemini.js";
import { StudyPlan } from "../../models/studyPlan.model.js";
import { apiResponse } from "../../utils/apiResponse.js";

const generateStudyPlan = asyncHandler(async (req, res) => {
  const { goalId } = req.params;

  if (!req.user) {
    throw new apiError(401, "Unauthorised request");
  }

  const goal = await Goal.findOne({
    _id: goalId,
    user: req.user._id
  });

  if (!goal) {
    throw new apiError(400, "Goal not found");
  }

  const subjects = await Subject.find({
    _id: { $in: goal.subjects }
  });

  if (!subjects || subjects.length === 0) {
    throw new apiError(400, "Subject not found");
  }

  const subjectInfo = subjects
    .map(s => `${s.name} (difficulty:${s.difficulty}) (time:${s.time})`)
    .join("\n");

  const startDate = new Date().toISOString().split("T")[0];
  const endDate = new Date(goal.deadline).toISOString().split("T")[0];

  const prompt = `
Create a study plan from ${startDate} to ${endDate}.

Description: ${goal.description}
Daily study hours: ${goal.dailystudyhours}

Subjects:
${subjectInfo}

Rules:
- Only use the given subjects.
- Do NOT create subjects like revision, weekly revision, etc.
- Each day must not exceed ${goal.dailystudyhours} hours.
- Return ONLY valid JSON.

Format:

[
 {
  "date": "YYYY-MM-DD",
  "tasks": [
   {"subject":"Math","hours":2},
   {"subject":"Physics","hours":2}
  ]
 }
]
`;

  const aiText = await main(prompt);

  if (!aiText) {
    throw new apiError(500, "No response from AI");
  }

  let schedule;

  try {
    const cleaned = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    schedule = JSON.parse(cleaned);

    if (!Array.isArray(schedule)) {
      throw new Error("Invalid AI structure");
    }
  } catch (error) {
    console.log("AI RAW RESPONSE:", aiText);
    throw new apiError(500, "AI response parsing failed");
  }

  const formattedSchedule = schedule.map(day => {
    return {
      date: day.date,
      tasks: (day.tasks || []).map(task => {

        const subject = subjects.find(
          s => s.name.toLowerCase() === String(task.subject).toLowerCase()
        );

        if (!subject) {
          throw new apiError(400, `Subject not found: ${task.subject}`);
        }

        return {
          subject: subject._id,
          hours: task.hours,
          completed: false
        };
      })
    };
  });

 const existingPlan = await StudyPlan.findOne({
  goal: goalId,
  user: req.user._id
})

if(existingPlan){
  throw new apiError(400,"Study plan already exists for this goal")
}
  const studyPlan = await StudyPlan.create({
    user: req.user._id,
    goal: goal._id,
    startdate: new Date(),
    enddate: goal.deadline,
    schedule: formattedSchedule
  });

  return res.status(201).json(
    new apiResponse(201, studyPlan, "Study plan generated successfully")
  );
});

export { generateStudyPlan };