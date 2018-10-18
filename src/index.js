import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import search from './search'

/**
 * Geocoder component: connects to Mapbox.com Geocoding API
 * and provides an autocompleting interface for finding locations.
 */

class Geocoder extends PureComponent {
  static propTypes = {
    endpoint: PropTypes.string,
    source: PropTypes.string,
    containerClass: PropTypes.string,
    inputClass: PropTypes.string,
    resultClass: PropTypes.string,
    resultsClass: PropTypes.string,
    inputPosition: PropTypes.string,
    inputPlaceholder: PropTypes.string,
    resultFocusClass: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    onSuggest: PropTypes.func,
    accessToken: PropTypes.string.isRequired,
    proximity: PropTypes.string,
    bbox: PropTypes.string,
    showLoader: PropTypes.bool,
    focusOnMount: PropTypes.bool,
    types: PropTypes.string,
    language: PropTypes.string,
    countries: PropTypes.string,
    fuzzyMatch: PropTypes.bool,
    limit: PropTypes.string,
    routing: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string
  }

  static defaultProps = {
    endpoint: 'https://api.tiles.mapbox.com',
    inputClass: '',
    resultClass: '',
    resultsClass: '',
    resultFocusClass: 'strong',
    inputPosition: 'top',
    inputPlaceholder: 'Search',
    showLoader: false,
    source: 'mapbox.places',
    proximity: '',
    bbox: '',
    types: '',
    countries: '',
    language: '',
    fuzzyMatch: true,
    limit: '5',
    routing: false,
    onSuggest: function () {},
    focusOnMount: true
  }

  state = {
    results: [],
    focus: null,
    loading: false,
    value: '',
    isActive: false
  }

  clickOption = (place, listLocation) => {
    this.props.onSelect(place)
    this.setState({
      focus: listLocation,
      value: place.place_name
    })
    // focus on the input after click to maintain key traversal
    ReactDOM.findDOMNode(this.inputRef).focus()

    return false
  }

  onInput = async e => {
    const value = e.target.value
    this.setState({
      loading: true,
      value
    })
    if (value === '') {
      this.setState({
        results: [],
        focus: null,
        loading: false
      })
    } else {
      const result = await search(
        this.props.endpoint,
        this.props.source,
        this.props.accessToken,
        this.props.proximity,
        this.props.bbox,
        this.props.types,
        this.props.language,
        this.props.countries,
        this.props.fuzzyMatch,
        this.props.limit,
        this.props.routing,
        value
      )
      this.onResult(result)
    }
  }

  onResult = result => {
    if (result) {
      this.setState({
        loading: false,
        results: result.features,
        focus: null
      })
      this.props.onSuggest(this.state.results)
    }
  }

  onKeyDown = e => {
    switch (e.which) {
    // up
    case 38:
      e.preventDefault()
      this.moveFocus(-1)
      break
    // down
    case 40:
      this.moveFocus(1)
      break
    // accept
    case 13:
      if (this.state.results.length > 0 && this.state.focus == null) {
        this.clickOption(this.state.results[0], 0)
      }
      this.acceptFocus()
      break
    default:
    }
  }

  moveFocus = dir => {
    if (this.state.loading) return
    this.setState({
      focus: this.state.focus === null ?
        0 : Math.max(0,
          Math.min(
            this.state.results.length - 1,
            this.state.focus + dir))
    })
  }

  hideDropdown = () => {
    this.setState({ isActive: false })
  }

  showDropdown = () => {
    this.setState({ isActive: true })
  }

  acceptFocus () {
    if (this.state.focus !== null) {
      this.setState({ value: this.state.results[this.state.focus].place_name })
      this.props.onSelect(this.state.results[this.state.focus].place_name)
    }
  }

  clickOption (place, listLocation) {
    this.props.onSelect(place)
    this.setState({ focus: listLocation })
    // focus on the input after click to maintain key traversal
    ReactDOM.findDOMNode(this.inputRef).focus()

    return false
  }

  componentDidMount () {
    if (this.props.focusOnMount) {
      ReactDOM.findDOMNode(this.inputRef).focus()
    }
  }

  render () {
    const input =
      <input
        ref={input => this.inputRef = input}
        className={this.props.inputClass}
        onChange={this.onInput}
        onKeyDown={this.onKeyDown}
        placeholder={this.props.inputPlaceholder}
        type='text'
        value={this.state.value}
        autoComplete='off'
        id={this.props.id}
        name={this.props.name}
      />

    return (
      <div
        onBlur={this.hideDropdown}
        onFocus={this.showDropdown}
        className={this.props.containerClass}
      >
        {this.props.inputPosition === 'top' && input}
        {!!this.state.results.length && this.state.isActive &&
          <ul className={`${this.props.showLoader && this.state.loading ? 'loading' : ''} ${this.props.resultsClass}`}>
            {this.state.results.map((result, i) =>
              <li key={result.id}>
                <a
                  // onMouseDown fires before onBlur
                  onMouseDown={() => this.clickOption(result, i)}
                  onMouseOver={() => this.setState({ focus: i })}
                  className={`${this.props.resultClass} ${i === this.state.focus ? this.props.resultFocusClass : ''}`}
                  key={result.id}
                >{result.place_name}</a>
              </li>
            )}
          </ul>
        }
        {this.props.inputPosition === 'bottom' && input}
      </div>
    )
  }
}

export default Geocoder
