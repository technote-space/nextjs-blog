import type { Settings } from '$/domain/app/settings';
import type { ISlack } from '$/domain/shared/library/slack';
import type { IncomingWebhookSendArguments } from '@slack/webhook';
import { IncomingWebhook } from '@slack/webhook';
import { inject, singleton } from 'tsyringe';

@singleton()
export class Slack implements ISlack {
  public constructor(@inject('Settings') private settings: Settings) {
  }

  private async send(args: IncomingWebhookSendArguments): Promise<void> {
    if (!this.settings.slack?.webhookUrl) {
      return;
    }

    const webhook = new IncomingWebhook(this.settings.slack.webhookUrl);
    await webhook.send(args);
  }

  public async sendOk(text: string, fields?: { title: string; value: string; short?: boolean }[]): Promise<void> {
    return this.send({
      username: 'Slack Bot',
      text,
      attachments: [{
        color: 'good',
        fields,
      }],
    });
  }

  public async sendError(error: Error): Promise<void> {
    return this.send({
      username: 'Slack Bot',
      text: error.message,
      'icon_emoji': 'no_entry',
      attachments: [{
        color: 'danger',
        text: error.stack,
      }],
    });
  }
}
