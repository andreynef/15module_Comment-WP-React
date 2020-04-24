import React from 'react';
import './Comment.css'

const Comment = ({id, name, handleDelete, text, date}) =>{//dumb component
/* 2 варианта привязки контекста
<button onClick={(e) => this.deleteRow(id, e)}>Удалить строку</button> 
<button onClick={this.deleteRow.bind(this, id)}>Удалить строку</button> 
*/
  return (
    <li 
			className='listItem'
			id={id}
		>
			<div className='listHeader'>
				<div className='name'>{name}</div>
				<button 
					type="button"
					className='cross'   
					aria-label="удалить"
					onClick={handleDelete}//типа привязать любой метод приходящий извне к именно этому элементу по id
					>
				</button>
			</div>
			<div className='text'>{text}</div>
			<div className='date'>{date}</div>
		</li>
  );
}
export default Comment