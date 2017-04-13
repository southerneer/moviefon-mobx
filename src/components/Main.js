// @flow

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { compose, withHandlers } from 'recompose'
import _ from 'lodash'
import { SideMenu, Text } from 'react-native-elements'
import {observer} from 'mobx-react'

import MovieList from './MovieList'
import SearchBox from './SearchBox'
import MenuPanel from './MenuPanel'
import FavoriteButton from './FavoriteButton'

type Props = {
  changeText: Function,
  getMore: Function,
  loadSearch: Function,
  search: Function,
  listState: Object,
  store: Object,
}

const App = (props: Props) => {
  const {changeText, getMore, loadSearch, search, store} = props
  return (
    <SideMenu menu={<MenuPanel store={store} loadSearch={loadSearch} />}>
      <View style={styles.container}>
        <Text h2 style={styles.heading}>MovieFōn</Text>
        <View style={styles.topRow}>
          <SearchBox search={search} changeText={changeText} store={store} />
          <FavoriteButton store={store} />
        </View>
        <MovieList getMore={getMore} store={store} />
      </View>
    </SideMenu>
  )
}

const enhance = compose(
  withHandlers({
    changeText: ({store}) => (text) => {
      if (text === '') store.movies = []
      store.searchText = text
    },
    search: ({store}) => async () => {
      if (store.searchText === '') return
      store.pending = true
      store.listState = {hasMore: true, isGettingMore: false, nextPage: 2}
      const results = await searchMovies(store.searchText, 1)
      if (results) {
        store.movies = results
        store.history = _.union(store.history, [store.searchText])
      }
      store.pending = false
    },
    getMore: ({store}) => async () => {
      const {listState, movies, searchText} = store
      const {isGettingMore, hasMore, nextPage} = listState

      if (!movies.length || isGettingMore || !hasMore) return

      store.listState = {...listState, isGettingMore: true}
      const results = await searchMovies(searchText, nextPage)
      if (results && results.length) {
        store.movies = [...movies, ...results]
        store.listState = {hasMore: true, isGettingMore: false, nextPage: nextPage + 1}
      } else {
        store.listState = {hasMore: false, isGettingMore: false}
      }
    },
  }),
  withHandlers({
    loadSearch: ({search, store}) => (text) => {
      store.searchText = text
      // @HACK
      setTimeout(search, 200)
    }
  }),
  observer,
)

const searchMovies = async (text, page) => {
  const params = [
    'type=movie',
    `s=${encodeURIComponent(text.trim())}`,
    `page=${page}`
  ]
  try {
    let result = await fetch(`http://www.omdbapi.com/?${params.join('&')}`, {
      method: 'GET',
    })
    result = await result.json()
    return result.Search
  } catch (err) {
    console.error('error', err)
    return null
  }
}

export default enhance(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  heading: {
    alignSelf: 'center',
    marginVertical: 10,
    color: 'pink',
  },
  topRow: {
    flexDirection: 'row'
  }
})
