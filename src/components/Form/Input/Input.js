import React from 'react';
import './Input.css'

const Input = ({inputValue, handleChange}) =>{//dumb component
	return (
		<label className='label'>*Введите свое имя
			<input
				className='input'
				placeholder="имя"
				type="text" 
				onChange={handleChange}//при любом изменении поля используется значение из пропсов
				value={inputValue}//вводимые значения берутся из базы а не у сами себы как было по умолчанию
				autoFocus
				required
			/>
		</label>
	)
}

export default Input;