import { Resend } from 'resend'
import { siteConfig } from '@/config'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function enviarEmailBoasVindas(email: string, nome: string) {
  return resend.emails.send({
    from: `${siteConfig.name} <noreply@${siteConfig.url.replace('https://', '')}>`,
    to: email,
    subject: `Bem-vindo ao ${siteConfig.name}!`,
    html: `
      <h1>Olá, ${nome}!</h1>
      <p>Bem-vindo ao ${siteConfig.name}. A tua conta foi criada com sucesso.</p>
      <p>Começa agora: <a href="${siteConfig.url}/dashboard">Abrir dashboard</a></p>
    `,
  })
}

export async function enviarEmailResetPassword(email: string, link: string) {
  return resend.emails.send({
    from: `${siteConfig.name} <noreply@${siteConfig.url.replace('https://', '')}>`,
    to: email,
    subject: `Repõe a tua password — ${siteConfig.name}`,
    html: `
      <h1>Repor password</h1>
      <p>Clica no link abaixo para repor a tua password. O link expira em 1 hora.</p>
      <a href="${link}">Repor password</a>
      <p>Se não pediste isto, ignora este email.</p>
    `,
  })
}

export async function enviarEmailConviteOrg(
  email: string,
  orgNome: string,
  convidadoPor: string,
  link: string
) {
  return resend.emails.send({
    from: `${siteConfig.name} <noreply@${siteConfig.url.replace('https://', '')}>`,
    to: email,
    subject: `Foste convidado para ${orgNome}`,
    html: `
      <h1>Convite para ${orgNome}</h1>
      <p>${convidadoPor} convidou-te para se juntar a ${orgNome} no ${siteConfig.name}.</p>
      <a href="${link}">Aceitar convite</a>
    `,
  })
}
