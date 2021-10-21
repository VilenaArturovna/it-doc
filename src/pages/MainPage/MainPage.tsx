import { Cartridge, Main, Prices, Slider, Works } from '../../Components';
import React from 'react';

export function MainPage () {
  return (
    <>
      <Slider/>
      <Main/>
      <Cartridge/>
      <Prices/>
      <Works/>
    </>
  )
}
