import axios from 'axios';

import { Component } from '../common';

class Edit extends Component {
  // prettier-ignore
  async render() {
    const pathId = window.location.pathname.split('/')[2];
    let setPost = null;

    if (pathId) {
      const { data: { post } } = await axios.get(`/post/${+pathId}`);
      setPost = post;
    }

    return `
      <form class="edit">
        <input type="text" name="title" class="edit-title" placeholder="제목을 입력하세요" required value="${pathId ? setPost.title : ''}" />
        <div class="tag">
          ${pathId ? setPost.tags?.map(tag => `<span class="tag-box">${tag}</span>`).join('') : ''}
          <input
            name="tag"
            type="text"
            class="edit-tag"
            placeholder="태그를 입력하세요"
          />
          <div class="edit-tag-description">
            <span>스페이스바를 입력하여 태그를 등록할 수 있습니다.</span>
            <span>등록된 태그를 클릭하거나 백스페이스를 입력하면 삭제됩니다.</span>
          </div>
        </div>
        <textarea
          name="area"
          class="edit-post"
          cols="30"
          rows="10"
          placeholder="Draw Your Idea"
          required          
        >${pathId ? setPost.content : ''}</textarea>
        <div class="edit-buttons">
          <button type="button" class="edit-return">뒤로가기</button>
          <button class="edit-${pathId ? 'update' : 'add'}">${pathId ? '수정하기' : '작성하기'}</button>
        </div>
      </form>
    `;
  }

  moveFocus(e) {
    const editForm = document.querySelector('.edit');

    if (e.target === editForm.title) editForm.tag.focus();
    else editForm.area.focus();
  }

  createTagBox(e) {
    const div = document.createElement('div');
    div.className = 'tag-box';
    div.textContent = e.target.value;
    e.target.parentNode.insertBefore(div, e.target);
    e.target.value = '';
  }

  keydownHandeler(e) {
    // 한글이 두번 입력되는것을 방지한다.
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === 'Enter' && !e.target.matches('.edit-post')) {
      this.moveFocus(e);
      e.preventDefault();
    }

    if (e.target.matches('.edit-tag') && e.key === 'Backspace' && e.target.value.trim() === '') {
      [...e.target.parentNode.querySelectorAll('.tag-box')].at(-1)?.remove();
    }
  }

  tagInputHandeler(e) {
    if (
      (e.target.matches('.edit-tag') && e.target.value.trim() !== '') ||
      e.target.parentNode.querySelector('.tag-box') !== null
    ) {
      document.querySelector('.edit-tag-description').style.visibility = 'hidden';
    } else {
      document.querySelector('.edit-tag-description').style.visibility = 'visible';
    }

    // 태그인풋에서 스페이스바를 입력하면 tagBox가 만들어진다.
    if (e.target.value.slice(-1) === ' ' && e.target.value.trim() !== '') this.createTagBox(e);
  }

  async submitPost(e) {
    e.preventDefault();

    const pathId = window.location.pathname.split('/')[2];

    const title = e.target.title.value;
    const content = e.target.area.value;
    const tags = [...e.target.querySelectorAll('.tag-box')].map($span => $span.textContent.trim());

    if (pathId) {
      await axios.patch('/post', {
        id: +pathId,
        title,
        tags,
        author: { name: 'user' },
        content,
        date: new Date(),
      });
      window.history.pushState(null, null, `/post/${pathId}`);
    } else {
      await axios.post('/post', {
        title,
        tags,
        author: { name: 'user' },
        content,
        date: new Date(),
      });
      window.history.pushState(null, null, '/');
    }
    this.setState();
  }

  deleteTag(e) {
    if (e.target.matches('.tag')) e.target.querySelector('.edit-tag').focus();
    if (e.target.matches('.tag-box')) e.target.remove();
  }

  showTagDescription(e) {
    if (e.target.parentNode.querySelector('.tag-box') === null) {
      document.querySelector('.edit-tag-description').style.visibility = 'visible';
    }
  }

  hideTagDescription() {
    document.querySelector('.edit-tag-description').style.visibility = 'hidden';
  }

  // 이전페이지로 이동
  moveeBackPage() {
    window.history.back();
  }

  addEventListener() {
    return [
      { type: 'keydown', selector: '.edit', handler: this.keydownHandeler.bind(this) },
      { type: 'input', selector: '.edit-tag', handler: this.tagInputHandeler.bind(this) },
      { type: 'submit', selector: '.edit', handler: this.submitPost.bind(this) },
      { type: 'click', selector: '.tag', handler: this.deleteTag },
      { type: 'click', selector: '.edit-return', handler: this.moveeBackPage },
      { type: 'focusin', selector: '.edit-tag', handler: this.showTagDescription },
      { type: 'focusout', selector: '.edit-tag', handler: this.hideTagDescription },
    ];
  }
}

export default Edit;
