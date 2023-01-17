import React from 'react';
import {Box, Flex, Heading} from '@chakra-ui/react';
import TaskSection from './components/TaskSection';

function App() {
  return (
    <Box minW="320px" maxW="1024px" mx="auto" pos="relative" minH="100vh">
      <Flex as="header" p={3}>
        <Heading size="lg">TODO app using express & React</Heading>
      </Flex>
      <Box as="main" p={3} pt={4}>
        <TaskSection />
      </Box>
    </Box>
  );
}

export default App;
