import prisma from "../config/prisma.js";

export const ownerDashboard = async (req, res) => {
  try {
    const store = await prisma.store.findUnique({
      where: {
        ownerId: req.user.id,
      },

      include: {
        ratings: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                address: true,
              },
            },
          },
        },
      },
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found.",
      });
    }

    const averageRating =
      store.ratings.length > 0
        ? (
            store.ratings.reduce(
              (sum, item) => sum + item.rating,
              0
            ) / store.ratings.length
          ).toFixed(1)
        : 0;

    res.json({
      success: true,

      store: {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        averageRating,
      },

      ratings: store.ratings.map((item) => ({
        userId: item.user.id,
        name: item.user.name,
        email: item.user.email,
        address: item.user.address,
        rating: item.rating,
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};