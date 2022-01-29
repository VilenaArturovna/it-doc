import { Cartridge, FeedbackForm, Main, Prices, Slider, Works } from '../../Components';
import React from 'react';

export function MainPage () {
  return (
    <>
      <Slider/>
      <Main/>
      <Cartridge/>
      <Prices/>
      <Works/>
      <FeedbackForm />
    </>
  )
}
