'use client'
import React, { useState } from 'react';
import styles from './Board.module.css';
import reorder, { reorderQuoteMap } from '@/utils/reorder';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

export interface BoardProps {
	// types...
}

const Board: React.FC<BoardProps>  = ({
	isCombineEnabled,
	initial,
	useClone,
	containerHeight,
	withScrollableColumns
}:any) => {


	const [columns, setColumns] = useState(initial);

	const [ordered, setOrdered] = useState(Object.keys(initial));





	const onDragEnd = (result:any) => {
		if (result.combine) {
		  if (result.type === "COLUMN") {
			const shallow = [...ordered];
			shallow.splice(result.source.index, 1);
			setOrdered(shallow);
			return;
		  }
	
		  const column = columns[result.source.droppableId];
		  const withQuoteRemoved = [...column];
	
		  withQuoteRemoved.splice(result.source.index, 1);
	
		  const orderedColumns = {
			...columns,
			[result.source.droppableId]: withQuoteRemoved
		  };
		  setColumns(orderedColumns);
		  return;
		}
	
		// dropped nowhere
		if (!result.destination) {
		  return;
		}
	
		const source = result.source;
		const destination = result.destination;
	
		// did not move anywhere - can bail early
		if (
		  source.droppableId === destination.droppableId &&
		  source.index === destination.index
		) {
		  return;
		}
	
		// reordering column
		if (result.type === "COLUMN") {
		  const reorderedorder:any = reorder(ordered, source.index, destination.index);
	
		  setOrdered(reorderedorder);
	
		  return;
		}
	
		const data = reorderQuoteMap({
		  quoteMap: columns,
		  source,
		  destination
		});
	
		setColumns(data.quoteMap);
	  };



	return (
		<>
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable
				droppableId='Board'
				type='COLUMN'
				direction='horizontal'
				ignoreContainerClipping={Boolean(containerHeight)}
				isCombineEnabled={isCombineEnabled}
			>
				{(provided)=>(
					<div ref={provided.innerRef} className={styles.board} {...provided.droppableProps}>
						{ordered.map((key,index)=>(
							<></>
						))}
					</div>
				)}
				
			</Droppable>
		</DragDropContext>
		
		</>
	);
};

export default Board;
