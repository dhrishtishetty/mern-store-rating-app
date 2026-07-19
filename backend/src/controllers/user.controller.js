import prisma from "../config/prisma.js";

export const getStores = async (req, res) => {
  try {
    const { search } = req.query;

    const stores = await prisma.store.findMany({
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                address: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},

      include: {
        ratings: true,
      },
    });

    const result = stores.map((store) => {
      const average = store.ratings.length
        ? (
            store.ratings.reduce(
              (sum, r) => sum + r.rating,
              0
            ) / store.ratings.length
          ).toFixed(1)
        : 0;

      const myRating = store.ratings.find(
        (r) => r.userId === req.user.id
      );

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        overallRating: average,
        myRating: myRating ? myRating.rating : null,
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const rateStore = async (req, res) => {
  try {
    const rating = Number(req.body.rating);

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5.",
      });
    }

    const storeId = Number(req.params.storeId);

    const existing = await prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId: req.user.id,
          storeId,
        },
      },
    });

    if (existing) {
      const updated = await prisma.rating.update({
        where: {
          userId_storeId: {
            userId: req.user.id,
            storeId,
          },
        },

        data: {
          rating,
        },
      });

      return res.json({
        message: "Rating updated",
        rating: updated,
      });
    }

    const newRating = await prisma.rating.create({
      data: {
        userId: req.user.id,
        storeId,
        rating,
      },
    });

    res.status(201).json({
      message: "Rating submitted",
      rating: newRating,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },

      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};