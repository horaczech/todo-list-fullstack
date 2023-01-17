import {Request, Response} from 'express';
import models from '../../models';

export const httpGetAllTasks = async (req: Request, res: Response) => {
  try {
    const allTasks = await models.Task.findAll();
    if (allTasks) {
      res.status(200).json({
        data: allTasks
      });
    }
  } catch (e) {
    throw e;
  }
};

export const httpGetTaskById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const oneTask = await models.Task.findByPk(id);
    if (oneTask) {
      res.status(200).json({
        data: oneTask
      });
    }
  } catch (e) {
    throw e;
  }
};

export const httpAddTask = async (req: Request, res: Response) => {
  const {title} = req.body;
  try {
    const newTask = await models.Task.create({
      title
    });
    res.status(201).json({
      data: newTask
    });
  } catch (e) {
    throw e;
  }
};

export const httpDeleteTaskById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) {
    res.status(400).send('Id not found');
  }
  try {
    await models.Task.destroy({
      where: {
        id
      }
    });
    res.status(200).json('Task deleted');
  } catch (e) {
    throw e;
  }
};

export const httpUpdateTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const {title} = req.body;

  try {
    if (!title) {
      res.status(422).json('Title field is required.');
    }
    const task = await models.Task.findByPk(id);
    const updatedTask = await task.update({title});
    res.status(200).json({
      data: updatedTask
    });
  } catch (e) {
    throw e;
  }
};
