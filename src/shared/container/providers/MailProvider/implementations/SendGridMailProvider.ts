// import nodemailer, { Transporter } from 'nodemailer';
// import aws from 'aws-sdk';
import sgMail from '@sendgrid/mail';
import mailConfig from '@config/mail';

import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class SendGridMailProvider implements IMailProvider {
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    if (!process.env.SENDGRID_API_KEY) {
      throw new AppError('You need to set a SendGrid API KEY.');
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { email } = mailConfig.defaults.from;

    const msg = {
      from: from?.email || email,
      to: to.email,
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    };

    sgMail.send(msg);
  }
}
