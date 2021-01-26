import '@testing-library/jest-dom'
const { StyleSheetTestUtils } = require('aphrodite')

global.beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
