import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

/**
 * Middleware to obtain meetup to routes with :id
 */
export default async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    req.meetup = await Meetup.findByPk(id, {
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path'],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name'],
        },
      ],
    });
    if (!req.meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }
  }

  return next();
};
