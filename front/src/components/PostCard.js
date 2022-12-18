import Component from '../common/Component';

class PostCard extends Component {
  render() {
    const { post, currentPostType } = this.props;
    const { id, content, title, author, tags } = post;

    return `
      <div class="post-${currentPostType}-card route" data-route="/post/${id}">
        <h3 class="card-author">${author.author}</h3>
        <span class="card-date">${this.timeForToday()}</span>
        <div class="card-description">
          <h2 class="card-title">${title}</h2>
          <div class="card-tags">${tags.map(tag => `<span class="tag-span">#${tag}</span>`).join(' ')}</div>
          <span class="card-content">${content}</span>
        </div>
        
        <div class="thumbnail">
          <img src="/assets/thumbnail.svg" alt="" />
        </div>
      </div>
    `;
  }

  timeForToday = () => {
    const { post } = this.props;
    const today = new Date();
    const timeValue = new Date(post.date);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 30) {
      return `${betweenTimeDay}일전`;
    }

    const betweenTimeMonth = Math.floor(betweenTimeDay / 30);
    if (betweenTimeMonth < 13) {
      return `${betweenTimeMonth}달전`;
    }
    return `${Math.floor(betweenTimeDay / 365)}년전`;
  };
}

export default PostCard;
