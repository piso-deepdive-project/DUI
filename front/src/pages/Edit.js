import axios from 'axios';

import { Component } from '../common';

class Edit extends Component {
  toggleInvisible($tag, bool) {
    $tag.nextElementSibling.classList.toggle('invisible', bool);
  }

  // prettier-ignore
  async render() {
    const postId = window.location.pathname.split('/')[2];
    console.log(postId);

    const { data } = await axios.get(`/api/post/${+postId}`);

    if (!data.accessUser) {
      window.history.pushState(null, null, '/');
      this.setState();
    }

    const initPost = {
      tags: [],
      title: '',
      content: '',
    };

    const post = postId ? data.post : initPost;
    const { tags, title, content } = post;

    // prettier-ignore
    return `
      <form class="edit">
        <input type="text" name="title" class="edit-title" placeholder="제목을 입력하세요" required value="${title}" />
        <div class="tag">
          ${tags?.map(tag => `<span class="tag-box">${tag}</span>`).join('')}
          <input
            name="tag"
            type="text"
            class="edit-tag"
            placeholder="태그를 입력하세요"
          />
          <div class="edit-tag-description invisible">
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
        >${content}</textarea>
        <div class="edit-buttons">
          <button type="button" class="edit-return">뒤로가기</button>
          ${postId
    ? '<button class="edit-update">수정하기</button>'
    : '<button class="edit-add">작성하기</button>'}
        </div>
      </form>`;
  }

  moveFocus(e) {
    const editForm = e.target.closest('form');

    if (e.target === editForm.title) editForm.tag.focus();
    else editForm.area.focus();
  }

  createTagBox($tag) {
    const tags = document.createElement('div');

    tags.className = 'tag-box';
    tags.textContent = $tag.value.trim();

    $tag.parentNode.insertBefore(tags, $tag);
    $tag.value = '';
  }

  keydownHandeler(e) {
    // 한글이 두번 입력되는것을 방지한다.
    if (e.isComposing || e.keyCode === 229) return;

    if (e.key === 'Enter' && !e.target.matches('.edit-post')) {
      this.moveFocus(e);
      e.preventDefault();
    }

    if (e.target.matches('.edit-tag') && e.key === 'Backspace' && e.target.value.trim() === '') {
      e.target.previousElementSibling.remove();
    }
  }

  editingtagHandler(e) {
    const $tag = e.target;

    const isDescriptionVisible = $tag.value.trim() !== '' || $tag.previousElementSibling !== null;
    this.toggleInvisible($tag, isDescriptionVisible);

    // 태그인풋 키다운 이벤트에서 스페이스 키가 입력되면 tag가 만들어진다.
    const newTag = e.target.value;
    if (newTag.slice(-1) === ' ' && newTag.trim() !== '') this.createTagBox(e.target);
  }

  async submitPost(e) {
    e.preventDefault();

    const postId = window.location.pathname.split('/')[2];
    const $editForm = e.target;

    const title = $editForm.title.value;
    const content = $editForm.area.value;
    const tags = [...$editForm.querySelectorAll('.tag-box')].map($span => $span.textContent.trim());

    if (postId) {
      await axios.patch('/api/post', {
        id: +postId,
        title,
        tags,
        content,
        date: new Date(),
      });
    } else {
      await axios.post('/api/post', {
        title,
        tags,
        content,
        comments: [],
        date: new Date(),
      });
    }

    window.history.pushState(null, null, postId ? `/post/${postId}` : '/');
    this.setState();
  }

  deleteTag(e) {
    e.target.querySelector('.edit-tag').focus();
    if (e.target.matches('.tag-box')) e.target.remove();
  }

  tagfocusInHandler(e) {
    this.toggleInvisible(e.target, false);
  }

  tagfocusOutHandler(e) {
    this.toggleInvisible(e.target, true);
  }

  // 이전페이지로 이동
  goPreviousPage() {
    window.history.back();
  }

  addEventListener() {
    return [
      { type: 'keydown', selector: '.edit', handler: this.keydownHandeler.bind(this) },
      { type: 'input', selector: '.edit-tag', handler: this.editingtagHandler.bind(this) },
      { type: 'submit', selector: '.edit', handler: this.submitPost.bind(this) },
      { type: 'click', selector: '.tag', handler: this.deleteTag },
      { type: 'click', selector: '.edit-return', handler: this.goPreviousPage },
      { type: 'focusin', selector: '.edit-tag', handler: this.tagfocusInHandler.bind(this) },
      { type: 'focusout', selector: '.edit-tag', handler: this.tagfocusOutHandler.bind(this) },
    ];
  }
}

export default Edit;
