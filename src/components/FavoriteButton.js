// @flow

import React from 'react'
import { Icon } from 'react-native-elements'
import {observer} from 'mobx-react'

type Props = {
  store: Object,
}

export default observer(({store}: Props) => {
  const iconName = store.isFavorite ? 'heart' : 'heart-o'
  return store.searchText ? (
    <Icon
      name={iconName}
      type="font-awesome"
      color="red"
      onPress={store.toggleFavorite}
      containerStyle={{marginHorizontal: 10}}
    />
  ) : null
})
