import { PrismaClient } from "@prisma/client";

class userController extends PrismaClient {
  async getAllusers(req, res) {
    try {
      const response = await this.users.findMany();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
}

export default userController;
