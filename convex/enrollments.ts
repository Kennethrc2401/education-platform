import { api } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const enrollInCourse = mutation({
  args: {
    userId: v.id("users"),
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    const currentUser = await ctx.runQuery(api.users.getCurrentUser, {});

    if (!currentUser || currentUser._id !== args.userId) {
      throw new Error("Unauthorized");
    }

    // prevent duplicate enrollment
    const existing = await ctx.db
      .query("enrollments")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const already = existing.find(
      (e) => e.courseId === args.courseId
    );

    if (already) {
      throw new Error("Already enrolled");
    }

    return await ctx.db.insert("enrollments", {
      ...args,
      enrolledAt: Date.now(),
    });
  },
});

export const getUserEnrollments = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("enrollments")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});