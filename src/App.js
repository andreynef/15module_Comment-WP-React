import React, { Component } from 'react';
import CommentList from './components/CommentList/CommentList.js';
import Form from './components/Form/Form.js';
import './App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {// установка начального пустого состояния
      items: [
      ],
      formName:'',
      formText:''
    };

    this.handleChange = this.handleChange.bind(this);//привязка методов к именно этому компоненту App. Т.к. "Методы класса в JavaScript по умолчанию не привязаны к контексту."
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = ()=>{//заводской метод, срабатывающий после метода render и указывающий что именно сделать после изначальной отрисовки.
    debugger
    let storedItems = JSON.parse(localStorage.getItem('commentItems'));//считать массив в JSON формате('text','text') из localStorage и привести ее обратно в божеский вид путем parse.
    if (!storedItems){//если сторадж undefined то ничего не делать
      alert('локал пустой')
      return
    }
      alert('локал не пустой. Подгрузка...')
    this.setState({// установить состояние 
      items: storedItems
      // items: storedItems && storedItems//Сокращенный синтаксис if/else.  Если storedItems = true, то установить storedItems, если false то ничего не делать. Тут при undefined не работает
    })
  }

  updateLocalStorage(newItemPackage) {
    localStorage.setItem('commentItems', JSON.stringify(newItemPackage))
  }

  handleChange(event) {//при любом изменении полей идет обновление состояния
    const objKey = event.target.name === 'js-textContent' ? 'formText' : 'formName';//условие определяющее какое именно свойство менять
    const targetValue = event.target.value// какую инфу записывать в значение
    this.setState({//обновить состояние с добавлением изменений
			[objKey]: targetValue,
    });
  }

  handleSubmit(event) {
    event.preventDefault();//сброс отправки формы и открытия дефолтной нов страницы
    const itemsArr = this.state.items;//считываем состояние базы
    const {formName, formText} = this.state//считываем данные из базы для отправки
    const newItem = {//создаем объект с этими свежими данными
      name: formName, 
      text: formText, 
      date: new Date().toLocaleString('ru')//устанавливаем текущее время
    };
    // if (itemsArr==null){
    //   itemsArr=[]
    // }
    itemsArr.push(newItem);//засовываем этот новый объект в общее состояние (в конец)
    this.updateLocalStorage(itemsArr); //записываем свежий массив в локал в формате('text','text'), тобишь в формате JSON    
		this.setState({//обновляем состояние формы на пустые поля
      formName:'', //находит сам в куче вложенностей
      formText:'', 
      items: itemsArr
    });
  }
  
  handleDelete = chosenItem => {//атрибут chosenItem приходит с кнопки удалить (index). Хз почему приходит индекс.
    let itemsArr = this.state.items;//считываем состояние 
  
    itemsArr.splice(chosenItem, 1);//удаляем выбранный итем методом массива splice(начиная с chosenItem в количестве 1 шт) 
    this.setState({items: itemsArr});//обновляем состояние
    this.updateLocalStorage(itemsArr); //записываем массив в локал в формате('text','text'), тобишь в формате JSON
  };

  render() {
    const {items, formName, formText} = this.state;
    return (
      <div className='centralContainer'>
        <section className='sectionList'>
					<h1 className='titleList'> Список комментариев </h1>
          <CommentList
            itemsArr={items}//создаем свои атрибуты и передаем их в другой файл (CommentList.js). 
            handleDelete={this.handleDelete} 
          />
        </section>
        <section className="sectionForm">
			    <h2 className="titleForm">Форма</h2>
            <Form 
              textAreaValue={formText} 
              inputValue={formName}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
        </section>
      </div>
    );
  }
}

export default App























//   addToList() {
//     this.setState(prevState => ({
//         list: prevState.list.concat(this.state.text),
//         text: ''
//     }))
// }

// removeItem(item) {
//   const item = getItem(this.state.list, item.id) // Method to get item in list through comparison (IE: find some item with item.id), it has to return ITEM and INDEX in array
//   const newlist = [].concat(list) // Clone array with concat or slice(0)
//   newlist.splice(item.index, 1);
//   this.setState({list: newlist});       
// }
