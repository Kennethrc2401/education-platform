import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    role: v.union(
      v.literal("student"),
      v.literal("teacher"),
      v.literal("admin")
    ),
  }).index("by_clerkId", ["clerkId"]),

  courses: defineTable({
    title: v.string(),
    description: v.string(),
    teacherId: v.id("users"),
    price: v.number(),
    category: v.string(),
    isApproved: v.boolean(),
  }).index("by_teacher", ["teacherId"]),

  enrollments: defineTable({
    userId: v.id("users"),
    courseId: v.id("courses"),
    enrolledAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_course", ["courseId"]),
});