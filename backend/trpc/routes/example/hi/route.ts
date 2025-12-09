import { publicProcedure } from "@/backend/trpc/create-context";

export default publicProcedure
  .query(() => {
    return {
      hello: "world",
      date: new Date(),
    };
  });
