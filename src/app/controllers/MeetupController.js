import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';
import Meetup from '../models/Meetup';
import File from '../models/File';

class MeetupController {
  async validations(req, res, next) {
    const { id } = req.params;
    const { banner_id, date } = req.body;

    if (id) {
      req.meetup = await Meetup.findByPk(id);
      if (req.meetup.user_id !== req.userId) {
        return res
          .status(400)
          .json({ error: 'You need to be the meeting organizer to edit' });
      }

      if (!isBefore(req.meetup.date, new Date())) {
        return res
          .status(400)
          .json({ error: 'The meetup has already occurred' });
      }
    }

    const bannerExists =
      banner_id && (await File.findOne({ where: { id: banner_id } }));
    if (banner_id && !bannerExists) {
      return res.status(400).json({ error: 'File of banner not found' });
    }

    if (date && isBefore(parseISO(date), new Date())) {
      return res.status(400).json({ error: 'Past date is not allowed' });
    }

    return next();
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const meetup = await Meetup.create({
      ...req.body,
      user_id: req.userId,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const meetup = await req.meetup.update({
      ...req.body,
    });

    return res.json(meetup);
  }
}

export default new MeetupController();
