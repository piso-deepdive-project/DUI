import axios from 'axios';
import { Component } from '../common';

class Edit extends Component {
  user = 'Uta';

  render() {
    return `
      <form class="edit" >
        <input type="text" class="edit-title" placeholder="제목을 입력하세요" required />
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
          class="edit-post"
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

  async postUserEdit() {
    const [title, category] = document.querySelectorAll('.edit input');
    const content = document.querySelector('.edit-post').value;
    const categoryArr = category.value.trim().split(' ');

    await axios.post('post', {
      title: title.value,
      author: this.user,
      categoryArr,
      content,
      date: new Date(),
    });
    console.log('post');
  }

  moveFocus(e) {
    const [title, category] = document.querySelectorAll('.edit input');
    e.target === title ? category.focus() : document.querySelector('.edit-post').focus();
  }

  createCategoryBox(e) {
    const div = document.createElement('div');
    div.className = 'category-box';
    div.textContent = e.target.value;
    e.target.parentNode.insertBefore(div, e.target);
    e.target.value = '';
  }

  keydownHandeler(e) {
    if (e.key === 'Enter' && !e.target.matches('.edit-post')) {
      e.preventDefault();
      this.moveFocus(e);
    }

    if (e.target.matches('.edit-category') && e.keyCode === 32 && e.target.value.trim() !== '') {
      this.createCategoryBox(e);
    }

    if (e.target.matches('.edit-category') && e.key === 'Backspace' && e.target.value.trim() === '') {
      [...e.target.parentNode.querySelectorAll('.category-box')].at(-1)?.remove();
    }
  }

  inputDescription(e) {
    if (
      (e.target.matches('.edit-category') && e.target.value.trim() !== '') ||
      e.target.parentNode.querySelector('.category-box') !== null
    ) {
      document.querySelector('.edit-category-description').style.visibility = 'hidden';
    } else {
      document.querySelector('.edit-category-description').style.visibility = 'visible';
    }
  }

  submitEditDate(e) {
    e.preventDefault();
    this.postUserEdit(e);
  }

  clickCategory(e) {
    if (e.target.matches('.category')) e.target.querySelector('.edit-category').focus();
    if (e.target.matches('.category-box')) e.target.remove();
  }

  focusinCategory(e) {
    if (e.target.value.trim() !== '') return;
    document.querySelector('.edit-category-description').style.visibility = 'visible';
  }

  focusoutCategory() {
    document.querySelector('.edit-category-description').style.visibility = 'hidden';
  }

  // 이전페이지로 이동
  clickMoveBackPage(e) {
    window.history.back();
  }

  /**
   * keydown: 엔터 -> 포커스 이동, 스페이스바 -> 태그박스 생성, 백스페이스바 -> 태그박스 제거
   * input: description 생성및 제거
   * submit: submit의 기본동작을 막고 작성하기 클릭시 서버에 데이터 전송
   * click-cetegory: 카테고리박스 클릭시 제거 , 포커스 edit-category로 이동
   * click-edit-return: 뒤로가기 클릭시 이전페이지로 이동
   * focusin: description 생성
   * focusout: description 제거
   */
  addEventListener() {
    return [
      { type: 'keydown', selector: '.edit', handler: this.keydownHandeler.bind(this) },
      { type: 'input', selector: '.category', handler: this.inputDescription.bind(this) },
      { type: 'submit', selector: '.edit', handler: this.submitEditDate.bind(this) },
      { type: 'click', selector: '.category', handler: this.clickCategory.bind(this) },
      { type: 'click', selector: '.edit-return', handler: this.clickMoveBackPage.bind(this) },
      { type: 'focusin', selector: '.edit-category', handler: this.focusinCategory.bind(this) },
      { type: 'focusout', selector: '.edit-category', handler: this.focusoutCategory.bind(this) },
    ];
  }
}

export default Edit;
