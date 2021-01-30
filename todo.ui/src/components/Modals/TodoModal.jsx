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
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux/todos';

const defaultTodo = {
  title: '',
  description: '',
  isComplete: false,
};

export const TodoModal = (props) => {
  const { onClose, open, todo, mode, ...rest } = props;
  const [state, setState] = useState(defaultTodo);

  useEffect(() => {
    if (mode === 'update' && todo) {
      setState(todo);
    } else {
      setState(defaultTodo);
    }
  }, [mode, todo]);

  const dispatch = useDispatch();

  const handleTitleChanged = (event) => {
    setState((s) => ({
      ...s,
      title: event.target.value,
    }));
  };

  const handleDescriptionChanged = (event) => {
    setState((s) => ({
      ...s,
      description: event.target.value,
    }));
  };

  const handleIsCompleteChanged = (event) => {
    setState((s) => ({
      ...s,
      isComplete: event.target.checked,
    }));
  };

  const handleCancelClick = () => {
    onClose(true);
  };

  const handleOkayClick = () => {
    if (mode === 'add') {
      dispatch(actionCreators.addTodo(state.title, state.description)).then(() => onClose(false));
    } else {
      dispatch(actionCreators.updateTodo(todo.id, state.title, state.description, state.isComplete)).then(() =>
        onClose(false)
      );
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
          value={state.title}
          fullWidth
          onChange={handleTitleChanged}
        />
        <TextField
          margin="dense"
          id="decription"
          label="Description"
          variant="standard"
          value={state.description}
          fullWidth
          onChange={handleDescriptionChanged}
        />
        {mode === 'update' && (
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={state.isComplete} onChange={handleIsCompleteChanged} />}
              label="Is complete"
            />
          </FormGroup>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleOkayClick} disabled={!(state.title || state.description)}>
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
  todo: defaultTodo,
};
