import { api } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createCourse = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    teacherId: v.id("users"),
    price: v.number(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const currentUser = await ctx.runQuery(api.users.getCurrentUser, {});

    if (!currentUser || currentUser._id !== args.teacherId) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.insert("courses", {
      ...args,
      isApproved: false,
    });
  },
});

export const getApprovedCourses = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("courses")
      .filter((q) => q.eq(q.field("isApproved"), true))
      .collect();
  },
});

export const getCoursesByTeacher = query({
  args: { teacherId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("courses")
      .withIndex("by_teacher", (q) => q.eq("teacherId", args.teacherId))
      .collect();
  },
});