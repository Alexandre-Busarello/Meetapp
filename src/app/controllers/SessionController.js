import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    // Por uma questão de segurança, para não demonstrar que o usuário existe
    // a mensagem vai ser a mesma para quando o usuário não existir ou quando
    // a senha estiver errada
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Login is not correct' });
    }

    if (!user.checkPassword(password)) {
      return res.status(401).json({ error: 'Login is not correct' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
