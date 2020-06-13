interface IMailConfig {
  driver: 'ethereal' | 'sendgrid';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'recovery@gobarber.com.br',
      name: 'GoBarber',
    },
  },
} as IMailConfig;
