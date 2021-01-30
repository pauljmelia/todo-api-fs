import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import CompleteIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IncompleteIcon from '@material-ui/icons/RadioButtonUnchecked';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux/todos';
import { TodoModal } from '../Modals';

export const TodoList = (props) => {
  const { todos } = props;
  const [selected, setSelected] = useState();
  const [updateOpen, setUpdateOpen] = useState(false);
  const dispatch = useDispatch();

  const loadData = useCallback(() => dispatch(actionCreators.fetchTodos()), [dispatch]);
  const hasData = useMemo(() => !!todos.length, [todos]);

  const handleModalClosed = () => {
    setUpdateOpen(false);
    loadData();
  };

  const handleEditTodoClick = (todo) => {
    setSelected(todo);
    setUpdateOpen(true);
  };

  const handleDeleteTodoClick = (id) => {
    dispatch(actionCreators.deleteTodo(id)).then(() => loadData());
  };

  const handleToggleCompleteClick = (todo) => {
    dispatch(actionCreators.toggleTodoIsComplete(todo.id, !todo.isComplete)).then(() => loadData());
  };

  return (
    <>
      {!hasData && <Typography>There are no todos</Typography>}
      {hasData && (
        <>
          <TodoModal mode="update" open={updateOpen} todo={selected} onClose={handleModalClosed} />
          <List>
            {todos.map((todo) => (
              <ListItem alignItems="flex-start" key={todo.id}>
                <ListItemText primary={todo.title} secondary={todo.description} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleToggleCompleteClick(todo)}>
                    {todo.isComplete && <CompleteIcon />}
                    {!todo.isComplete && <IncompleteIcon />}
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleEditTodoClick(todo)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDeleteTodoClick(todo.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array,
};

TodoList.defaultProps = {
  todos: [],
};
