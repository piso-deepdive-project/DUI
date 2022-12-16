import { Component } from '../common';

class PostType extends Component {
  render() {
    const { currentPostType } = this.props;

    return `
      <ul class="post-type">
        <li data-type="list">
          <i class="bx bx-list-ul  bx-lg bg-txt text-main ${currentPostType === 'list' ? 'select' : ''}"></i>
        </li>
        <li data-type="grid">
          <i class="bx bx-grid-alt bx-lg ${currentPostType === 'grid' ? 'select' : ''}"></i>
        </li>
      </ul>
    `;
  }

  addEventListener() {
    return [{ type: 'click', selector: '.post-type li', handler: this.props.setPostType }];
  }
}

export default PostType;
