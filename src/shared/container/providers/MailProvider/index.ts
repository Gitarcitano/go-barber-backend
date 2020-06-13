import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import SendGridMailProvider from './implementations/SendGridMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  sendgrid: container.resolve(SendGridMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
