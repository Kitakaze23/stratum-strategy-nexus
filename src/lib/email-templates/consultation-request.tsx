import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  company?: string
  role?: string
  email?: string
  phone?: string
  message?: string
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  color: '#14213D',
}
const container = { padding: '32px 28px', maxWidth: '620px' }
const heading = { fontSize: '20px', fontWeight: 600, margin: '0 0 4px' }
const eyebrow = {
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: '#0F4C81',
  margin: '0 0 12px',
}
const label = {
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: '#6B7280',
  margin: '16px 0 2px',
}
const value = { fontSize: '15px', lineHeight: '1.6', margin: 0 }
const rule = { borderColor: '#E5E7EB', margin: '24px 0' }

const Email = ({ name, company, role, email, phone, message }: Props) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>{`Новая заявка: ${name || 'без имени'}${company ? ` — ${company}` : ''}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>Stratum Consulting</Text>
        <Heading style={heading}>Новая заявка с сайта</Heading>
        <Text style={{ ...value, color: '#6B7280' }}>
          Заявка отправлена через форму «Обсудим вашу задачу».
        </Text>
        <Hr style={rule} />
        <Section>
          <Text style={label}>Имя</Text>
          <Text style={value}>{name || '—'}</Text>
          <Text style={label}>Компания</Text>
          <Text style={value}>{company || '—'}</Text>
          <Text style={label}>Должность</Text>
          <Text style={value}>{role || '—'}</Text>
          <Text style={label}>E-mail</Text>
          <Text style={value}>{email || '—'}</Text>
          <Text style={label}>Телефон</Text>
          <Text style={value}>{phone || '—'}</Text>
          <Text style={label}>Описание задачи</Text>
          <Text style={{ ...value, whiteSpace: 'pre-line' as const }}>{message || '—'}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `Новая заявка с сайта${data['company'] ? `: ${data['company']}` : ''}`,
  displayName: 'Заявка на консультацию',
  to: 'inbox@stratum-consulting.ru',
  previewData: {
    name: 'Алексей Иванов',
    company: 'ООО «Пример»',
    role: 'CPO',
    email: 'a.ivanov@example.ru',
    phone: '+7 (900) 000-00-00',
    message: 'Запускаем AI-продукт, нужна независимая оценка гипотез и метрик перед масштабированием.',
  },
} satisfies TemplateEntry
