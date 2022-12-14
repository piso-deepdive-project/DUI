import { Component } from '../common';

class PostType extends Component {
  render() {
    return `
      <ul class="post-type">
        <li>
          <i class="bx bx-list-ul select bx-lg bg-txt text-main"></i>
        </li>
        <li>
          <i class="bx bx-grid-alt bx-lg"></i>
        </li>
      </ul>
    `;
  }
}

export default PostType;
