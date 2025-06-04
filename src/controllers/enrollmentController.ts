import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Enroll in a course
export const enrollInCourse = async (req: Request, res: Response) => {
  try {
    const studentId = req.user!.userId;
    const { courseId } = req.body;

    // Check if course exists
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) return res.status(404).json({ message: "Course not found" });

    const enrollment = await prisma.enrollment.create({
      data: { studentId, courseId },
    });

    res.status(201).json(enrollment);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }
    res.status(500).json({ message: error.message });
  }
};

// Withdraw from a course
export const withdrawFromCourse = async (req: Request, res: Response) => {
  try {
    const studentId = req.user!.userId;
    const { courseId } = req.body;

    await prisma.enrollment.delete({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });

    res.status(200).json({ message: "Withdrawn from course" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get student’s enrolled courses
export const getMyCourses = async (req: Request, res: Response) => {
  try {
    const studentId = req.user!.userId;

    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: {
        course: true,
      },
    });

    res.status(200).json(enrollments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
