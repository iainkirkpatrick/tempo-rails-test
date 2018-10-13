import React from 'react'
import { connect } from 'redux-bundler-react'
import isEmpty from 'lodash/isEmpty'
import { Flex, Heading, Text } from 'rebass'

const App = ({ people }) => {
  if (isEmpty(people)) {
    return null
  } else {
    return (
      <Flex flexDirection={'column'}>
        <Heading>People</Heading>
        {
          people.map((person, i) => {
            return <Text key={i}>{person.name}</Text>
          })
        }
      </Flex>
    )
  }
}

export default connect (
  'selectPeople',
  App
)
