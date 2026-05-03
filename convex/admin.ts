import { api } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const approveCourse = mutation({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const currentUser = await ctx.runQuery(api.users.getCurrentUser, {});

    if (!currentUser || currentUser.role !== "admin") {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.courseId, {
      isApproved: true,
    });
  },
});

export const getPendingCourses = query({
  handler: async (ctx) => {
    const currentUser = await ctx.auth.getUserIdentity();

    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    const profile = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", currentUser.subject))
      .first();

    if (!profile || profile.role !== "admin") {
      throw new Error("Unauthorized");
    }

    return await ctx.db
      .query("courses")
      .filter((q) => q.eq(q.field("isApproved"), false))
      .collect();
  },
});