import Meetup from '../models/Meetup';

class UserMeetupsController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
      order: ['date'],
      attributes: ['id', 'description', 'date'],
    });

    return res.json(meetups);
  }
}

export default new UserMeetupsController();
