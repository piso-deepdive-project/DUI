import { Component } from '../common';

class PostType extends Component {
  render() {
    return `
      <ul class="post-type">
        <li data-type="list">
          <i class="bx bx-list-ul select bx-lg bg-txt text-main"></i>
        </li>
        <li data-type="grid">
          <i class="bx bx-grid-alt bx-lg"></i>
        </li>
      </ul>
    `;
  }

  addEventListener() {
    return [{ type: 'click', selector: '.post-type li', handler: this.props.setPostType }];
  }
}

export default PostType;
