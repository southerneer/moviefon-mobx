// @flow

import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Text } from 'react-native-elements'
import {observer} from 'mobx-react'

type Props = {
  loadSearch: Function,
  store: Object,
}

const TextLink = ({loadSearch, text}) => (
  <TouchableOpacity onPress={() => loadSearch(text)}>
    <Text style={styles.link}>{text}</Text>
  </TouchableOpacity>
)

export default observer((props: Props) => {
  return (
    <View style={styles.container}>
      <Text h3 style={styles.headings}>Favorites</Text>
      {props.store.favorites.slice().map(f => (
        <TextLink loadSearch={props.loadSearch} text={f} key={'k' + f} />
      ))}

      <Text h3 style={[styles.headings, {marginTop: 40}]}>History</Text>
      {props.store.history.slice().map(h => (
        <TextLink loadSearch={props.loadSearch} text={h} key={'h' + h} />
      ))}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEF',
    padding: 10,
    borderColor: '#DCDDDF',
    borderWidth: 1,
  },
  headings: {
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginTop: 5,
  },
  footer: {
    height: 40,
    marginRight: 20,
    alignSelf: 'flex-end',
  },
})
