import { Page } from "./page";

class HomePage extends Page {
  private get header() {
    return $('<h1>');
  }

  getHeaderText() {
    return this.header.getText();
  }
}

export default new HomePage();
