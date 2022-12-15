import { Component } from '../common';

class NotFound extends Component {
  async render() {
    const pathName = window.location.pathname.replace('/', '');

    return `
      <h1>${pathName} 그런거 없어요</h1>
    `;
  }
}
export default NotFound;
