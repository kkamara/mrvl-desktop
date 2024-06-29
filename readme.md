![marvel-moving](https://user-images.githubusercontent.com/31970496/201666745-37f4c424-0557-4051-bf27-d40cd0b09780.gif)

![mrvl-desktop4.png](https://raw.githubusercontent.com/kkamara/useful/main/mrvl-desktop4.png)

![mrvl-desktop.png](https://raw.githubusercontent.com/kkamara/useful/main/mrvl-desktop.png)

![mrvl-desktop2.png](https://raw.githubusercontent.com/kkamara/useful/main/mrvl-desktop2.png)

![mrvl-desktop3.png](https://raw.githubusercontent.com/kkamara/useful/main/mrvl-desktop3.png)

# mrvl-desktop

(15-Jun-2023) Browse and manage your favourite Marvel Comics. ElectronJS, ReactJS 18.

## Download

* [MacOs](https://github.com/kkamara/mrvl-desktop/releases)

* [Windows](https://github.com/kkamara/mrvl-desktop/releases).

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

* [NodeJS 14](https://nodejs.org/en/blog/release/v14.21.3) (arrives with [npmjs](https://www.npmjs.com/))

```bash
  npm install
  cp .env.example .env
```

## Usage

```bash
  npm start
```

## Building target: your machine

```bash
  npm run build
```

## Building target: cross-platform

```bash
  # --linux --win --mac --x64 --ia32
  npm run release
```

## Misc

[Complete MRVL web app now in desktop (all functionality available) #1](https://github.com/kkamara/mrvl-desktop/issues/1).

Each Marvel API key ([see environment variables](https://raw.githubusercontent.com/kkamara/mrvl/main/.env.example)) has a request limit of 3000/day.

[See MRVL Web](https://www.github.com/kkamara/mrvl-web).

[See ReactJS Boilerplate.](https://github.com/kkamara/reactjs-boilerplate)

[See PHP Scraper.](https://github.com/kkamara/php-scraper)

[See NodeJS ReactJS Boilerplate.](https://github.com/kkamara/nodejs-reactjs-boilerplate)

[See PHP ReactJS Boilerplate.](https://github.com/kkamara/php-reactjs-boilerplate)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[BSD](https://opensource.org/licenses/BSD-3-Clause)
