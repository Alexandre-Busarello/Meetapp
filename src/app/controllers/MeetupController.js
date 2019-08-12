import * as Yup from 'yup';
import { isBefore, parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const { date, page } = req.query;
    const startDate = startOfDay(parseISO(date));
    const endDate = endOfDay(parseISO(date));
    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userId,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: ['date'],
      attributes: ['id', 'title', 'description', 'date'],
      limit: 10,
      offset: 10 * (page - 1),
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { banner_id, date } = req.body;

    const bannerExists =
      banner_id && (await File.findOne({ where: { id: banner_id } }));
    if (banner_id && !bannerExists) {
      return res.status(400).json({ error: 'File of banner not found' });
    }

    if (date && isBefore(parseISO(date), new Date())) {
      return res.status(400).json({ error: 'Date in the past is not allowed' });
    }

    const { id } = await Meetup.create({
      ...req.body,
      user_id: req.userId,
    });

    // Busca após incluir para retornar o objeto com as referencias
    const meetup = await Meetup.findByPk(id, {
      attributes: ['id', 'title', 'description', 'location', 'date'],
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

    if (req.meetup.user_id !== req.userId) {
      return res.status(400).json({
        error: 'You need to be the meeting organizer to edit or delete',
      });
    }

    if (isBefore(req.meetup.date, new Date())) {
      return res.status(400).json({ error: 'The meetup has already occurred' });
    }

    const { banner_id, date } = req.body;

    const bannerExists =
      banner_id && (await File.findOne({ where: { id: banner_id } }));
    if (banner_id && !bannerExists) {
      return res.status(400).json({ error: 'File of banner not found' });
    }

    if (date && isBefore(parseISO(date), new Date())) {
      return res.status(400).json({ error: 'Date in the past is not allowed' });
    }

    const {
      id,
      title,
      description,
      location,
      banner,
      user,
    } = await req.meetup.update({
      ...req.body,
    });

    return res.json({
      id,
      title,
      description,
      location,
      banner,
      user,
    });
  }

  async delete(req, res) {
    if (req.meetup.user_id !== req.userId) {
      return res.status(400).json({
        error: 'You need to be the meeting organizer to delete',
      });
    }

    if (isBefore(req.meetup.date, new Date())) {
      return res.status(400).json({ error: 'The meetup has already occurred' });
    }

    const { id, title, description, location, banner, user } = req.meetup;

    await req.meetup.destroy();

    return res.json({
      id,
      title,
      description,
      location,
      banner,
      user,
    });
  }
}

export default new MeetupController();
