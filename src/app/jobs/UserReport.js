class UserReport {
  constructor() {
    this.key = 'UserReport';
    this.options = {
      delay: 5000,
      repeat: {
        every: 5000,
        limit: 0,
      },
    };
  }

  async handle({ data }) {
    const { user } = data;

    console.log(user);
  }
}

export default new UserReport();
