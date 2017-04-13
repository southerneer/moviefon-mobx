import React from 'react'
import Main from './src/components/Main'
import {ObservableMovieStore} from './src/stores'

const movieStore = new ObservableMovieStore()

export default () => (<Main store={movieStore} />)
