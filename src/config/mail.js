export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe MeetApp <noreply@meetapp.com>',
  },
};
