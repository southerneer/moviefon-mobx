// @flow

import React from 'react'
import { SearchBar } from 'react-native-elements'
import {observer} from 'mobx-react'

type Props = {
  search: Function,
  changeText: Function,
  store: Object,
}

const SearchBox = observer(({changeText, search, store}: Props) => (
  <SearchBar
    containerStyle={{flex: 1}}
    clearButtonMode="always"
    editable={!store.pending}
    lightTheme
    onChangeText={changeText}
    onEndEditing={search}
    placeholder="Search by title"
    showLoadingIcon={store.pending}
    value={store.searchText}
  />
))

export default SearchBox
