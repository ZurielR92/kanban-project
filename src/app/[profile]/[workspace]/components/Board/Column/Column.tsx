import React from 'react';
import styles from './Column.module.css';
import { Draggable } from 'react-beautiful-dnd';

export interface ColumnProps {
	title:string
	tasks:any[]
	index:number
}

const Column: React.FC<ColumnProps>  = ({index,tasks,title}) => {
	return (
		<Draggable draggableId={title} index={index}>
			{(provided,snapshot) => (
				<div className={styles.column}>

				</div>
			)}
		</Draggable>
	);
};

export default Column;
