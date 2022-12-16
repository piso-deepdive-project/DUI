import axios from 'axios';
import { Component } from '../common';

class Edit extends Component {
  user = 'Uta';

  async render() {
    const pathId = window.location.pathname.split('/')[2];

    if (pathId) {
      const { data: post } = await axios.get(`/post/${+pathId}`);
      const { title, tags, content, id } = post;

      return `
      <form class="edit" data-id="${id}">
        <input type="text" class="edit-title" placeholder="제목을 입력하세요" required value="${title}" />
        <div class="tag">
          <input
            type="text"
            class="edit-tag"
            placeholder="태그를 입력하세요"
          />
          <div class="edit-tag-description">
            <span>스페이스바를 입력하여 태그를 등록할 수 있습니다.</span>
            <span>등록된 태그를 클릭하면 삭제됩니다.</span>
          </div>
        </div>
        <textarea
          class="edit-post"
          cols="30"
          rows="10"
          placeholder="Draw Your Idea"
          required          
        >${content}</textarea>
        <div class="edit-buttons">
          <button class="edit-return">뒤로가기</button>
          <button class="edit-update route" data-route="/post/${id}">수정하기</button>
        </div>
      </form>
    `;
    }

    return `
      <form class="edit">
        <input type="text" class="edit-title" placeholder="제목을 입력하세요" required />
        <div class="tag">
          <input
            type="text"
            class="edit-tag"
            placeholder="태그를 입력하세요"
          />
          <div class="edit-tag-description">
            <span>스페이스바를 입력하여 태그를 등록할 수 있습니다.</span>
            <span>등록된 태그를 클릭하면 삭제됩니다.</span>
          </div>
        </div>
        <textarea
          class="edit-post"
          cols="30"
          rows="10"
          placeholder="Draw Your Idea"
          required
        ></textarea>
        <div class="edit-buttons">
          <button class="edit-return">뒤로가기</button>
          <button class="edit-add route" data-route="/">작성하기</button>
        </div>
      </form>
    `;
  }

  async addPost(e) {
    const [title, tag] = document.querySelectorAll('.edit input');
    const content = document.querySelector('.edit-post').value;
    const tags = tag.value.trim().split(' ');

    if (title.value.trim() === '' || content.trim() === '') {
      e.stopPropagation();
      return;
    }

    await axios.post('post', {
      title: title.value,
      author: { author: this.user },
      tags,
      content,
      date: new Date(),
    });
  }

  async updatePost(e) {
    const [title, tag] = document.querySelectorAll('.edit input');
    const content = document.querySelector('.edit-post').value;
    const tags = tag.value.trim().split(' ');

    if (title.value.trim() === '' || content.trim() === '') {
      e.stopPropagation();
      return;
    }

    const id = +e.target.closest('.edit').dataset.id;

    await axios.patch('/post', {
      id,
      title: title.value,
      author: { author: this.user },
      tags,
      content,
      date: new Date(),
    });
  }

  moveFocus(e) {
    const [title, tag] = document.querySelectorAll('.edit input');
    e.target === title ? tag.focus() : document.querySelector('.edit-post').focus();
  }

  createTagBox(e) {
    const div = document.createElement('div');
    div.className = 'tag-box';
    div.textContent = e.target.value;
    e.target.parentNode.insertBefore(div, e.target);
    e.target.value = '';
  }

  keydownHandeler(e) {
    if (e.key === 'Enter' && !e.target.matches('.edit-post')) {
      e.preventDefault();
      this.moveFocus(e);
    }

    if (e.target.matches('.edit-tag') && e.keyCode === 32 && e.target.value.trim() !== '') {
      this.createTagBox(e);
    }

    if (e.target.matches('.edit-tag') && e.key === 'Backspace' && e.target.value.trim() === '') {
      [...e.target.parentNode.querySelectorAll('.tag-box')].at(-1)?.remove();
    }
  }

  inputDescription(e) {
    if (
      (e.target.matches('.edit-tag') && e.target.value.trim() !== '') ||
      e.target.parentNode.querySelector('.tag-box') !== null
    ) {
      document.querySelector('.edit-tag-description').style.visibility = 'hidden';
    } else {
      document.querySelector('.edit-tag-description').style.visibility = 'visible';
    }
  }

  preventSubmit(e) {
    e.preventDefault();
  }

  clickTag(e) {
    if (e.target.matches('.tag')) e.target.querySelector('.edit-tag').focus();
    if (e.target.matches('.tag-box')) e.target.remove();
  }

  showTagDescription() {
    document.querySelector('.edit-tag-description').style.visibility = 'visible';
  }

  hideTagDescription() {
    document.querySelector('.edit-tag-description').style.visibility = 'hidden';
  }

  // 이전페이지로 이동
  moveeBackPage(e) {
    window.history.back();
  }

  /**
   * keydown: 엔터 -> 포커스 이동, 스페이스바 -> 태그박스 생성, 백스페이스바 -> 태그박스 제거
   * input: description 생성및 제거
   * submit: submit의 기본동작을 막음.
   * click-tag: 카테고리박스 클릭시 제거 , 포커스 edit-category로 이동
   * click-edit-return: 뒤로가기 클릭시 이전페이지로 이동
   * focusin: description 생성
   * focusout: description 제거
   */
  addEventListener() {
    return [
      { type: 'keydown', selector: '.edit', handler: this.keydownHandeler.bind(this) },
      { type: 'input', selector: '.tag', handler: this.inputDescription },
      { type: 'submit', selector: '.edit', handler: this.preventSubmit },
      { type: 'click', selector: '.edit-add', handler: this.addPost.bind(this) },
      { type: 'click', selector: '.edit-update', handler: this.updatePost.bind(this) },
      { type: 'click', selector: '.tag', handler: this.clickTag },
      { type: 'click', selector: '.edit-return', handler: this.moveeBackPage },
      { type: 'focusin', selector: '.edit-tag', handler: this.showTagDescription },
      { type: 'focusout', selector: '.edit-tag', handler: this.hideTagDescription },
    ];
  }
}

export default Edit;
