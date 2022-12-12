import { Component } from '../common';

class Edit extends Component {
  render() {
    return `
      <form class="edit">
        <input type="text" class="edit-title" placeholder="제목을 입력하세요" />
        <input type="file" accept="image/*" placeholder="제목을 입력하세요" />
        <div class="category">
          <input
            type="text"
            class="edit-category"
            placeholder="카테고리를 입력하세요"
          />
          <div class="edit-category-description">
            <span>쉼표 혹은 엔터를 입력하여 카테고리를 등록할 수 있습니다.</span>
            <span>등록된 카테고리를 클릭하면 삭제됩니다.</span>
          </div>
        </div>
        <textarea
          name="post"
          class="edit-post"
          id=""
          cols="30"
          rows="10"
          placeholder="Draw Your Idea"
        ></textarea>
        <div class="edit-buttons">
          <button class="edit-return">뒤로가기</button>
          <button class="edit-submit">작성하기</button>
        </div>
      </form>
    `;
  }
}

export default Edit;
