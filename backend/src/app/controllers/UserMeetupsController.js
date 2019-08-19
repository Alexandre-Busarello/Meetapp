import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import File from '../models/File';

class UserMeetupsController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userId,
        date: {
          [Op.gt]: new Date(),
        },
      },
      order: ['date'],
      attributes: ['id', 'title', 'description', 'date', 'location'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(meetups);
  }
}

export default new UserMeetupsController();
