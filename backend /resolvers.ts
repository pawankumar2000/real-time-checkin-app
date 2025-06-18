import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const demoId = "demo-user-1";

export const resolvers = {
  Query: {
    getEvents: () => prisma.event.findMany({ include: { attendees: true } }),
    getMe: () => prisma.user.findUnique({ where: { id: demoId } }),
  },
  Mutation: {
    joinEvent: async (_: any, { eventId }: any) => {
      await prisma.user.upsert({
        where: { id: demoId },
        update: {},
        create: { id: demoId, name: "Demo User", email: "demo@example.com" }
      });
      return prisma.event.update({
        where: { id: eventId },
        data: { attendees: { connect: { id: demoId } } },
        include: { attendees: true },
      });
    },
  },
};
