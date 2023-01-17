import React, {useState} from 'react';
import {
  Button,
  Flex,
  Heading,
  Input,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from '@chakra-ui/react';
import {DeleteIcon, EditIcon} from '@chakra-ui/icons';
import {Task} from '../types/api';
import {Formik} from 'formik';
import {useEditTask, useTasks} from '../api/tasks';

interface Props {
  data: Task;
  onDelete: (id: number, onClose: () => void) => void;
  isDetail: boolean;
  openModal?: () => void;
  closeModal?: () => void;
}

const OneTask: React.FC<Props> = ({data, onDelete, isDetail, openModal, closeModal}) => {
  const [isEditing, setIsEditing] = useState(false);
  const editTask = useEditTask();
  const {refetch: refetchTasks} = useTasks();

  const initialValues = {
    title: data.title
  };

  const submitHandler = async (values: typeof initialValues) => {
    if (values.title) {
      editTask.mutate(
        {id: data.id, title: values.title},
        {
          onError: () => alert('Error while editing task'),
          onSettled: () => {
            setIsEditing(false);
            refetchTasks();
            if (isDetail && closeModal) {
              closeModal();
            }
          }
        }
      );
    }
  };

  return (
    <Popover placement="left">
      {({onClose}) => (
        <>
          <Flex border="1px solid gray" rounded="md" mt={2} p={2} alignItems="center" justifyContent="space-between">
            {isEditing ? (
              <Formik initialValues={initialValues} onSubmit={submitHandler} enableReinitialize>
                {(props) => (
                  <form style={{width: '100%'}} onSubmit={props.handleSubmit}>
                    <Flex>
                      <Input w="100%" value={props.values.title} name="title" onChange={props.handleChange} />
                      <Button type="submit" ml={2}>
                        Submit
                      </Button>
                    </Flex>
                  </form>
                )}
              </Formik>
            ) : (
              <Heading
                w="100%"
                key={data.id}
                size="sm"
                {...(!isDetail
                  ? {cursor: 'pointer', onClick: openModal, _hover: {color: 'darkblue', textDecoration: 'underline'}}
                  : {})}
              >
                {data.title}
              </Heading>
            )}
            {!isEditing && (
              <>
                <Button ml="auto" mr={2} onClick={() => setIsEditing((current) => !current)}>
                  <EditIcon color="black" />
                </Button>
                <PopoverTrigger>
                  <Button>
                    <DeleteIcon color="red" />
                  </Button>
                </PopoverTrigger>
              </>
            )}
          </Flex>
          <PopoverContent w="auto" minW="260px">
            <PopoverHeader>
              <Heading size="xs">Delete task?</Heading>
              <PopoverCloseButton />
            </PopoverHeader>
            <PopoverBody>
              <Flex justifyContent="space-between">
                <Button color="red" onClick={() => onDelete(data.id, onClose)}>
                  Confirm
                </Button>
                <Button variant="outline" color="gray" onClick={onClose}>
                  Cancel
                </Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export default OneTask;
