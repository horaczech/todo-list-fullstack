import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons';
import {Formik} from 'formik';
import {useAddTask, useDeleteTaskById, useGetTaskById, useTasks} from '../api/tasks';
import OneTask from './OneTask';

const TaskSection: React.FC = () => {
  const {data: tasks, refetch: refetchTasks} = useTasks();
  const addTask = useAddTask();
  const deleteTask = useDeleteTaskById();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailId, setDetailId] = useState<number | null>(null);
  const {data: taskDetail, refetch: refetchDetail} = useGetTaskById(detailId || undefined);

  const initialValues = {
    title: ''
  };

  useEffect(() => {
    refetchDetail();
  }, [detailId]);

  const submitHandler = async (values: typeof initialValues) => {
    if (values.title) {
      await addTask.mutateAsync(
        {title: values.title},
        {
          onSuccess: () => {
            setIsAddingTask(false);
            refetchTasks();
          },
          onError: () => alert('Error while adding new task')
        }
      );
    }
  };

  const deleteTaskHandler = async (id: number, closeFnc: () => void) => {
    await deleteTask.mutateAsync(
      {id},
      {
        onSuccess: refetchTasks,
        onError: () => alert('Error while deleting task.'),
        onSettled: () => {
          closeFnc();
          if (detailId) {
            setDetailId(null);
            setModalVisible(false);
          }
        }
      }
    );
  };

  return (
    <>
      <Box as="section">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading size="md">Tasks</Heading>
          <Button ml={2} leftIcon={<AddIcon />} onClick={() => setIsAddingTask(true)}>
            New task
          </Button>
        </Flex>
        <Box mt={4}>
          {tasks && tasks.data.length > 0 ? (
            <>
              {tasks.data.map((task) => (
                <OneTask
                  data={task}
                  key={task.id}
                  onDelete={deleteTaskHandler}
                  isDetail={false}
                  openModal={() => setDetailId(task.id)}
                />
              ))}
              <Button mt={4} mx="auto" leftIcon={<AddIcon />} onClick={() => setIsAddingTask(true)}>
                New task
              </Button>
            </>
          ) : (
            <Flex justifyContent="center">
              <Text>Add your first task</Text>
            </Flex>
          )}
        </Box>
      </Box>
      <Modal isCentered isOpen={isAddingTask} onClose={() => setIsAddingTask(false)}>
        <ModalOverlay />
        <ModalContent pb={2} minW="320px">
          <ModalCloseButton top={1} right={1} w="36px" h="36px" />
          <ModalHeader>
            <Heading size="md">New Task</Heading>
          </ModalHeader>
          <ModalBody>
            <Formik initialValues={initialValues} onSubmit={submitHandler}>
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <Flex w="100%">
                    <Input
                      value={props.values.title}
                      name="title"
                      onChange={props.handleChange}
                      placeholder="Name of task"
                    />
                    <Button ml={3} type="submit">
                      Submit
                    </Button>
                  </Flex>
                </form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isCentered isOpen={detailId !== null} onClose={() => setDetailId(null)}>
        <ModalOverlay />
        <ModalContent pb={2} minW="320px">
          <ModalCloseButton top={1} right={1} w="36px" h="36px" />
          <ModalHeader>
            <Heading size="md">Task Detail</Heading>
          </ModalHeader>
          <ModalBody>
            {taskDetail && detailId ? (
              <OneTask
                data={taskDetail.data}
                onDelete={deleteTaskHandler}
                isDetail
                closeModal={() => {
                  setDetailId(null);
                  setModalVisible(false);
                }}
              />
            ) : null}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskSection;
