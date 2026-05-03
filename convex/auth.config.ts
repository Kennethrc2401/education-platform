const authConfig = {
  providers: [
    {
      domain:
        process.env.CLERK_JWT_ISSUER_DOMAIN ??
        "https://adjusted-gazelle-71.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
};

export default authConfig;