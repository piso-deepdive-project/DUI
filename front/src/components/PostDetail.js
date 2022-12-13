import { Component } from '../common';

class PostDetail extends Component {
  render() {
    return `
      <article class="post">
        <h1 class="post-title">제목</h1>
        <div class="post-buttons">
          <button>수정하기</button>
          <button>삭제하기</button>
        </div>
        <span class="post-description">작성자 · 날짜</span>
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
