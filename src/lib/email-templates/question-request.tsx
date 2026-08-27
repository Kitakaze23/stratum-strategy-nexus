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
  contact?: string
  question?: string
  productUrl?: string
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

const Email = ({ name, contact, question, productUrl }: Props) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>{`Новый вопрос: ${name || 'без имени'}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>Stratum Consulting</Text>
        <Heading style={heading}>Новый вопрос с сайта</Heading>
        <Text style={{ ...value, color: '#6B7280' }}>
          Отправлено через форму «Задайте вопрос».
        </Text>
        <Hr style={rule} />
        <Section>
          <Text style={label}>Имя</Text>
          <Text style={value}>{name || '—'}</Text>
          <Text style={label}>Контакт для связи</Text>
          <Text style={value}>{contact || '—'}</Text>
          <Text style={label}>Ссылка на продукт</Text>
          <Text style={value}>{productUrl || '—'}</Text>
          <Text style={label}>Вопрос</Text>
          <Text style={{ ...value, whiteSpace: 'pre-line' as const }}>{question || '—'}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `Новый вопрос с сайта${data['name'] ? `: ${data['name']}` : ''}`,
  displayName: 'Вопрос с сайта',
  to: 'inbox@stratum-consulting.ru',
  previewData: {
    name: 'Алексей Иванов',
    contact: 'a.ivanov@example.ru',
    question: 'Сделали приложение с помощью AI. Как понять, нужно ли оно людям?',
    productUrl: 'https://example.ru',
  },
} satisfies TemplateEntry
