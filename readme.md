![marvel-moving](https://user-images.githubusercontent.com/31970496/201666745-37f4c424-0557-4051-bf27-d40cd0b09780.gif)

![mrvl-desktop.png](https://raw.githubusercontent.com/kkamara/useful/main/mrvl-desktop.png)

![mrvl-desktop2.png](https://raw.githubusercontent.com/kkamara/useful/main/mrvl-desktop2.png)

![mrvl-desktop3.png](https://raw.githubusercontent.com/kkamara/useful/main/mrvl-desktop3.png)

# mrvl-desktop [![Run CI](https://github.com/kkamara/node-react-boilerplate/actions/workflows/node.js.yml/badge.svg)](https://github.com/kkamara/node-react-boilerplate/actions/workflows/node.js.yml)

(15 Jun 23) Browse and manage your favourite Marvel Comics. Reactjs.

## Code snippet

```js
/** 
 * Return searchable paginated characters api response
 * @param {array} ids
 * @return {Promise}
 */
async getFavComics(ids) {
  const promises = []
  let comics = []

  for (const id of ids) {
    promises.push(new Promise(async resolve => {
      const comic = await this.getComic(id)
      resolve(comic.data.data.results[0])
    }))
  }

  await new Promise((resolve, reject) => {
    Promise.all(promises).then(data => 
      comics = data
      resolve()
    })  
    .catch(err => { throw err })
  })  
  return comics
}
```

## Installation

* [Node.js](https://nodejs.org/en/) (arrives with [npmjs](https://www.npmjs.com/))
* [Yarn](https://yarnpkg.com/)

```bash
  npm i -g yarn
  yarn install # and yarn
  cp .env.example .env
```

## Usage

```bash
  yarn start
```

## Building target: your machine

```bash
  yarn build
```

## Building target: cross-platform

```bash
  # --linux --win --mac --x64 --ia32
  yarn run release
```

## Misc

Each Marvel API key ([see environment variables](https://raw.githubusercontent.com/kkamara/mrvl/main/.env.example)) has a request limit of 3000/day.

[See react boilerplate.](https://github.com/kkamara/react-boilerplate)

[See php scraper.](https://github.com/kkamara/php-scraper)

[See node react boilerplate.](https://github.com/kkamara/node-react-boilerplate)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[BSD](https://opensource.org/licenses/BSD-3-Clause)
