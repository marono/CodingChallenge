import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  pagerContainer: {
    display: 'flex',
    flexDirection: 'row',
    listStyleType: 'none',
    alignItems: 'center'
  },
  pagerPage: {
    padding: '0.25rem',
    border: 'solid 1px grey',
    margin: '0.1rem',
    ':hover': {
      backgroundColor: 'LightGrey',
      cursor: 'pointer'
    }
  },
  pagerActivePage: {
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold'
  }
})
