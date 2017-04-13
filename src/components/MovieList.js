// @flow

import React from 'react'
import { ActivityIndicator, ListView, StyleSheet, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import { compose, withHandlers } from 'recompose'
import {observer} from 'mobx-react'

type Props = {
  getMore: Function,
  store: Object,
  renderFooter: Function,
}

const MovieList = ({getMore, renderFooter, store}: Props) => (
  <ListView
    dataSource={store.movieDataSource}
    renderRow={movie => (
      <ListItem
        key={movie.imdbID}
        title={movie.Title}
        avatar={{uri:movie.Poster}}
        subtitle={`Release Year: ${movie.Year}`}
        hideChevron
      />
    )}
    automaticallyAdjustContentInsets={false} // this is iOS only
    keyboardDismissMode="on-drag"
    keyboardShouldPersistTaps="always"
    showsVerticalScrollIndicator={false}
    initialListSize={20}
    pageSize={10}
    style={styles.list}
    enableEmptySections
    onEndReached={getMore}
    onEndReachedThreshold={500}
    renderFooter={renderFooter}
  />
)

const enhance = compose(
  observer,
  withHandlers({
    renderFooter: ({store}: Props) => () => {
      if (!store.movies.length) {
        return (<Text style={styles.placeholder}>Movies will show here after a search</Text>)
        // return (<ActivityIndicator style={styles.activity} size="large" />)
      } else {
        if (store.isGettingMore) return (<ActivityIndicator size="small" />)
        else return null
      }
    }
  }),
)

export default enhance(MovieList)

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: 0,
  },
  placeholder: {
    marginVertical: 30,
    color: '#DCDDDF',
    alignSelf: 'center'
  },
  activity: {
    marginVertical: 10
  }
})
