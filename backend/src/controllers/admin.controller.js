import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

export const dashboard = async (req, res) => {
  try {
    const users = await prisma.user.count();
    const stores = await prisma.store.count();
    const ratings = await prisma.rating.count();

    res.json({
      totalUsers: users,
      totalStores: stores,
      totalRatings: ratings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      role,
    } = req.body;

    const exists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (exists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        role,
      },
    });

    res.status(201).json({
      message: "User Created",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createStore = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
    } = req.body;

    const ownerId = Number(req.body.ownerId);

    const owner = await prisma.user.findUnique({
      where: {
        id: ownerId,
      },
    });

    if (!owner) {
      return res.status(404).json({
        message: "Owner not found",
      });
    }

    if (owner.role !== "OWNER") {
      return res.status(400).json({
        message: "User is not a Store Owner",
      });
    }

    const exists = await prisma.store.findFirst({
      where: {
        ownerId,
      },
    });

    if (exists) {
      return res.status(400).json({
        message: "Store already assigned",
      });
    }

    const store = await prisma.store.create({
      data: {
        name,
        email,
        address,
        ownerId,
      },
    });

    res.status(201).json({
      message: "Store Created",
      store,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const {
      search,
      role,
      sort = "asc",
    } = req.query;

    const users = await prisma.user.findMany({
      where: {
        AND: [
          role ? { role } : {},

          search
            ? {
                OR: [
                  {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    email: {
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
        ],
      },

      orderBy: {
        name: sort,
      },

      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

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
              (sum, item) => sum + item.rating,
              0
            ) / store.ratings.length
          ).toFixed(1)
        : 0;

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        rating: average,
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: {
        id,
      },

      include: {
        store: {
          include: {
            ratings: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let averageRating = null;

    if (user.store) {
      const ratings = user.store.ratings;

      averageRating = ratings.length
        ? (
            ratings.reduce(
              (sum, r) => sum + r.rating,
              0
            ) / ratings.length
          ).toFixed(1)
        : 0;
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      averageRating,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};