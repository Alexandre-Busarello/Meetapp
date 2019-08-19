import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { subscription } = data;

    await Mail.sendMail({
      to: `${subscription.meetup.owner.name} <${subscription.meetup.owner.email}>`,
      subject: `Inscrição no encontro ${subscription.meetup.title}`,
      template: 'subscribe',
      context: {
        owner: subscription.meetup.owner.name,
        meetup: subscription.meetup.title,
        user: subscription.user.name,
      },
    });
  }
}

export default new SubscriptionMail();
