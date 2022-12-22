import { Component } from '../common';

class NotFound extends Component {
  render() {
    return `
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h1>404</h1>
        </div>
        <h2>Oops! Nothing was found</h2>
        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable. <span class="return-main route" data-route="/">Return to homepage</span></p>
      </div>
    </div>
    `;
  }
}
export default NotFound;
