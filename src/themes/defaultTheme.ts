export const defaultTheme = {
  colors: {
    //text
    textColor: '#FFF', textSecondColor: '#006699', textThirdColor: '#000',

//primary
    primaryColor: '#2678bc',

//background
    bgMainColor: '#697d8c', bgSecondColor: '#006699', bgThirdColor: '#f2f5fb',

//button
    btnColor: '#7fba2f', btnSecondColor: '#2678bc',
  },
  text: `
    font-family: "Rubik", sans-serif;
    font-size: $fontSize;
    font-weight: $fontWeight;
    line-height: $lineHeight;
    color: ${({ theme: { colors } }) => colors.textColor};
    `,
  container: `
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
`
};
