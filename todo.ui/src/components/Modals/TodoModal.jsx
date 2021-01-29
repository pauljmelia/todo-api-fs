import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux/todos';

export const TodoModal = (props) => {
  const { onClose, open, todo, mode, ...rest } = props;
  const [title, setTitle] = useState(todo?.title);
  const [description, setDescription] = useState(todo?.description);
  const [isComplete, setIsComplete] = useState(todo?.isComplete);
  const dispatch = useDispatch();

  const handleTitleChanged = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChanged = (event) => {
    setDescription(event.target.value);
  };

  const handleIsCompleteChanged = (event) => {
    setIsComplete(event.target.checked);
  };

  const handleCancelClick = () => {
    onClose();
  };

  const handleOkayClick = () => {
    if (mode === 'add') {
      dispatch(actionCreators.addTodo(title, description)).then(() => onClose());
    } else {
      dispatch(actionCreators.updateTodo(todo.id, title, description, isComplete)).then(() => onClose());
    }
  };

  return (
    <Dialog
      maxWidth="xs"
      open={open}
      aria-labelledby="todo-dialog-title"
      aria-describedby="todo-dialog-text"
      onBackdropClick={() => {}}
      disableEscapeKeyDown
      {...rest}
    >
      <DialogTitle id="todo-dialog-title">Todos</DialogTitle>
      <DialogContent>
        {mode === 'add' && <DialogContentText id="todo-dialog-text">Add a new todo.</DialogContentText>}
        {mode === 'update' && <DialogContentText id="todo-dialog-text">Update todo.</DialogContentText>}
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          variant="standard"
          value={title}
          onChange={handleTitleChanged}
        />
        <TextField
          margin="dense"
          id="decription"
          label="Description"
          variant="standard"
          value={description}
          onChange={handleDescriptionChanged}
        />
        {mode === 'update' && (
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={isComplete} onChange={handleIsCompleteChanged} />}
              label="Is complete"
            />
          </FormGroup>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleOkayClick}>
          Okay
        </Button>
        <Button onClick={handleCancelClick}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

TodoModal.propTypes = {
  mode: PropTypes.oneOf(['add', 'update']),
  onClose: PropTypes.func,
  open: PropTypes.bool,
  todo: PropTypes.shape({
    id: PropTypes.any,
    description: PropTypes.string,
    title: PropTypes.string,
    isComplete: PropTypes.bool,
  }),
};

TodoModal.defaultProps = {
  mode: 'add',
  onClose: () => {},
  open: false,
  todo: { description: '', title: '', isComplete: false },
};
