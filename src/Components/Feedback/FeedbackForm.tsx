import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import { useState } from 'react';

type Errors = {
  phone?: string; name?: string
}

const TOKEN = '5241071723:AAGpzQ7hH91J4OcWXdlgAzIt9tEpaRivfOg';
const chatId = '-693884354';
const url = 'https://api.telegram.org/bot' + TOKEN + '/sendMessage';

export const FeedbackForm = () => {
  const sendMessageToTelegram = async (name: string, phone: string, time: string) => {
    const text = `<strong>${name}</strong> оставил(а) заявку на сайте. Просит связаться с ним(ней) в <strong>${time ? time + ` часов` : 'любое время'}</strong> по телефону: <strong>${phone}</strong>`
    const body = JSON.stringify({
      chat_id: chatId,
      parse_mode: 'html',
      text,
    });

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body,
    })
    if (res.status === 200) {
      setIsSentMessage(true);
      setTimeout(() => {
        setIsSentMessage(false);
      }, 4000);
    }
  };

  const [isSentMessage, setIsSentMessage] = useState(false);
  return (<Root>
      <Container>
        <Title>Форма обратной связи</Title>
        <InputTitle>Оставьте свои контактные данные, и мы свяжемся с Вами</InputTitle>
        <div>
          <Formik
            initialValues={{ phone: '', name: '', text: '', }}
            validate={values => {
              const errors: Errors = {};
              if (!values.phone) {
                errors.phone = 'Введите номер телефона';
              } else if (!/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i.test(values.phone)) {
                errors.phone = 'Введен некорректный номер телефона';
              }
              if (!values.name) {
                errors.name = 'Введите Ваше имя';
              }
              return errors;
            }}
            onSubmit={async (values) => {
              await sendMessageToTelegram(values.name, values.phone, values.text);
            }}
          >
            {({ isSubmitting }) => (<FormBody>
              <InputTitle>Ваше имя</InputTitle>
              <Input type="text" name="name" placeholder="Имя"/>
              <ErrorMessage name="name" />
              <InputTitle>Ваш номер телефона</InputTitle>
              <Input type="phone" name="phone" placeholder="Номер телефона"/>
              <ErrorMessage name="phone" />
              <InputTitle>В какое время Вам позвонить?</InputTitle>
              <Input type="text" name="text" placeholder="Укажите желаемое время"/>
              <Button type="submit" disabled={isSubmitting}>
                Отправить
              </Button>
              {isSentMessage && <HelperText>Сообщение успешно отправлено</HelperText>}
            </FormBody>)}
          </Formik>
        </div>
      </Container>
    </Root>

  );
};

const Root = styled.div`
  padding-bottom: 40px;
`;
const Title = styled.h2`
  font-family: "Rubik", sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: black;
  margin: 26px 0 10px;
`;
const Container = styled.div`
  ${({ theme: { container } }) => container}
  flex-direction: column;
`;
const FormBody = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: start;
  color: red;
`;
const Input = styled(Field)`
  height: 35px;
  width: 350px;
  font-size: 16px;
  line-height: 28px;
  margin: 10px 0;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 7px;
  border: none;
  padding-left: 10px;
  background-color: white;
  outline: none;

  &::placeholder {
    font-size: 14px;
  }
`;
const Button = styled.button`
  height: 35px;
  width: 140px;
  font-size: 18px;
  line-height: 28px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 7px;
  border: none;
  margin: 10px 0;
  background-color: ${({ theme: { colors } }) => colors.btnColor};
  color: ${({ theme: { colors } }) => colors.textColor};
`;
const InputTitle = styled.div`
  margin: 10px 10px 0;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  color: black;
`;
const HelperText = styled.div`
  margin: 10px 10px 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: black;
`;
