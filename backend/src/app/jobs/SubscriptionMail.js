import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { subscription } = data;

    await Mail.sendMail({
      to: `${subscription.meetup.owner.name} <${subscription.meetup.owner.email}>`,
      subject: `Inscrição no encontro ${subscription.meetup.description}`,
      template: 'subscribe',
      context: {
        owner: subscription.meetup.owner.name,
        meetup: subscription.meetup.description,
        user: subscription.user.name,
      },
    });
  }
}

export default new SubscriptionMail();
