import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import CompleteIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IncompleteIcon from '@material-ui/icons/RadioButtonUnchecked';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../redux/todos';
import { TodoModal } from '../Modals';

export const TodoList = (props) => {
  const { onMount } = props;
  const { todos } = useSelector((state) => state.todos);
  const [selected, setSelected] = useState();
  const [updateOpen, setUpdateOpen] = useState(false);
  const dispatch = useDispatch();

  const loadData = useMemo(() => () => dispatch(actionCreators.fetchTodos()), [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  useEffect(() => {
    onMount(loadData);
  }, [loadData, onMount]);

  return (
    <>
      <TodoModal mode="update" open={updateOpen} todo={selected} onClose={handleModalClosed} />
      <List>
        {todos?.length &&
          todos.map((todo) => (
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
  );
};

TodoList.propTypes = {
  onMount: PropTypes.func,
};

TodoList.defaultProps = {
  onMount: () => {},
};
