import { isBefore } from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';

class MeetupController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['id', 'description', 'location', 'date'],
          required: true,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
        },
      ],
      order: [['meetup', 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const { meetupId: meetup_id } = req.params;
    const meetup = await Meetup.findByPk(meetup_id);
    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    /**
     * Check if user is a owner of meetup
     */
    if (meetup.user_id === req.userId) {
      return res.status(400).json({ error: `User can't be owner of meetup` });
    }

    /**
     * Check if meetup already ocurred
     */
    if (isBefore(meetup.date, new Date())) {
      return res.status(400).json({ error: 'The meetup has already occurred' });
    }

    /**
     * Check if user already subscribed on meetup
     */
    const checkSubscribed = await Subscription.findOne({
      where: {
        user_id: req.userId,
        meetup_id,
      },
    });
    if (checkSubscribed) {
      return res
        .status(400)
        .json({ error: 'User is already subscribed on meetup' });
    }

    const subscription = await Subscription.create({
      meetup_id,
      user_id: req.userId,
    });

    return res.json(subscription);
  }
}

export default new MeetupController();
