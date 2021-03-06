import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../redux/todos';
import { TodoModal } from '../Modals';
import { TodoList } from './TodoList';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '24px',
  },
  header: {
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  headline: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'white',
  },
  headlineButton: {
    marginLeft: `${theme.spacing(1)} !important`,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  stretched: {
    flexGrow: 100000,
  },
}));

export const TodosPanel = () => {
  const { todos } = useSelector((state) => state.todos);
  const [addOpen, setAddOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const loadData = useCallback(() => dispatch(actionCreators.fetchTodos()), [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddClick = () => {
    setAddOpen(true);
  };

  const handleAddClosed = (cancel) => {
    setAddOpen(false);

    if (!cancel) {
      loadData();
    }
  };

  return (
    <>
      <Box sx={{ p: 2 }} className={clsx(classes.header, classes.wrap, classes.row)}>
        <Box className={clsx(classes.stretched, classes.headline)}>Todos</Box>
        <Box>
          <Button color="primary" variant="outlined" className={classes.headlineButton} onClick={handleAddClick}>
            Add
          </Button>
          <TodoModal mode="add" open={addOpen} onClose={handleAddClosed} />
        </Box>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.stretched}>
          <Grid container spacing={2} className={classes.container}>
            <Grid item xs={12} md={6}>
              <TodoList todos={todos} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
