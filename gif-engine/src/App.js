import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import './gif.css';
class App extends React.Component {

  state = {
      searchTerm: '',
      searching: false,
      searched: false,
      gifs: [],
      url: 'https://api.giphy.com/v1/gifs/search?',
      apiKey: '5BXbUMWZqLHsQWlPcv5DYTtvMyhxLneM'
  }

  handleSearchInput = (target => {
      target.className.includes('gif-search-term') ?
          this.setState({ searchTerm: target.value, searching: true }, this.fetchGifs) :
          this.setState({ searchLimit: target.value <= 200 ? target.value : 200, searching: true }, this.fetchGifs);
  });

  fetchGifs = () => {
      fetch(`${this.state.url}api_key=${this.state.apiKey}&q=${this.state.searchTerm}&limit=${this.state.searchLimit}`)
          .then(res => res.json())
          .then(data => this.setState({ gifs: data.data, searching: false, searched: true }));
  }

  render() {
      return (
          <React.Fragment >
            
              <main>
                  <div className="container">
                      <SearchInput handleSearchInput={ e => this.handleSearchInput(e.target) } />
                      {/* { this.state.searching ? <Loader /> : null } */}
                      { !this.state.searching && this.state.searched ? <SearchOutput gifs={ this.state.gifs } /> : null }
                  </div>
              </main>
             
          </React.Fragment >
      );
  }
}

function SearchInput({ handleSearchInput }) {
  return (
      <div className="gif-search-container" onChange={ handleSearchInput } >
          <div>
              <label htmlFor="search" className="gif-search-label">GIF Search:</label>
              
              <input type="text" id="search" className="gif-search-input gif-search-term" placeholder="What are you looking for?" />
          </div>

          
      </div>
  );
}

function SearchOutput({ gifs }) {
  return (
      <div className="gifs-output">
          { gifs.length > 0 ? gifs.map(gif => <Gif key={ gif.id } gif={ gif } />) : <p></p> }
      </div>
  );
}

function Gif({ gif }) {
  return (
      <div className="gif-container">
          <a href={ gif.images.original.url } target="_blank">
              <img src={ gif.images.fixed_width_downsampled.url } className="gif" />
          </a>
      </div>
  );
}



ReactDOM.render(<App />, document.querySelector('#root'));

     
    

export default App;
