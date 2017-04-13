import {action, autorun, computed, observable} from 'mobx'
import {ListView} from 'react-native'
import _ from 'lodash'

const getNewDataSource = () => (new ListView.DataSource({rowHasChanged: (m1, m2) => m1.imdbID !== m2.imdbID}))

export class ObservableMovieStore {
	@observable pending = false
  @observable searchText = ''
  @observable movies = []
  @observable history = []
  @observable favorites = []
  @observable listState = {hasMore: true, isGettingMore: false, nextPage: 2}
  dataSource = getNewDataSource()

  constructor() {
    // autorun(() => console.log(this.listState))
  }

  @computed get isFavorite() {
    return this.searchText !== '' && this.favorites.includes(this.searchText)
  }

  @computed get movieDataSource() {
    return this.movies.length ? this.dataSource.cloneWithRows(this.movies.slice()) : getNewDataSource()
  }

  @action.bound
  toggleFavorite() {
    if (this.searchText === '') return
    if (this.isFavorite) {
      _.remove(this.favorites, t => t === this.searchText)
    } else {
      this.favorites.push(this.searchText)
    }
  }
}
