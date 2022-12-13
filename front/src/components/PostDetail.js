import { Component } from '../common';

class PostDetail extends Component {
  render() {
    const { post } = this.props;
    const { title, author, tags, date, content } = post; // author.author는 좀 이상한데 ?, post안에 content property 필요, tags는 나중에 해보기로

    return `
      <article class="post">
        <h1 class="post-title">${title}</h1>
        <div class="post-buttons">
          <button>수정하기</button>
          <button>삭제하기</button>
        </div>
        <span class="post-description">${author.author} · ${date}</span>
        <p class="post-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, a soluta maiores amet
          eius beatae debitis qui, ea at ratione exercitationem perferendis corrupti sapiente id
          molestiae distinctio similique, recusandae omnis! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Consectetur, a soluta maiores amet eius beatae debitis qui, ea at ratione
          exercitationem perferendis corrupti sapiente id molestiae distinctio similique, recusandae
          omnis!Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, a soluta maiores
          amet eius beatae debitis qui, ea at ratione exercitationem perferendis corrupti sapiente id
          molestiae distinctio similique, recusandae omnis! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Consectetur, a soluta maiores amet eius beatae debitis qui, ea at ratione
          exercitationem perferendis corrupti sapiente id molestiae distinctio similique, recusandae
          omnis!Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, a soluta maiores
          amet eius beatae debitis qui, ea at ratione exercitationem perferendis corrupti sapiente id
          molestiae distinctio similique, recusandae omnis! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Consectetur, a soluta maiores amet eius beatae debitis qui, ea at ratione
          exercitationem perferendis corrupti sapiente id molestiae distinctio similique, recusandae
          omnis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, a soluta
          maiores amet eius beatae debitis qui, ea at ratione exercitationem perferendis corrupti
        </p>
      </article>
    `;
  }
}

export default PostDetail;
